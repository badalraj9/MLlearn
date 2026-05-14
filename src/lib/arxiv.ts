export interface ArXivPaper {
  id: string;
  title: string;
  authors: string[];
  published: string;
  updated: string;
  summary: string;
  link: string;
  pdfLink: string;
  categories: string[];
  primaryCategory: string;
  comment?: string;
}

export async function fetchArXivPapers(
  query: string,
  maxResults: number = 20
): Promise<ArXivPaper[]> {
  const url = `/api/arxiv?search_query=${encodeURIComponent(
    query
  )}&sortBy=submittedDate&max_results=${maxResults}`;
  const res = await fetch(url);
  const xml = await res.text();
  return parseArXivXml(xml);
}

function parseArXivXml(xml: string): ArXivPaper[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const entries = doc.querySelectorAll("entry");
  const papers: ArXivPaper[] = [];

  for (const entry of entries) {
    const id = extractId(entry);
    const title = cleanText(entry.querySelector("title")?.textContent || "");
    const summary = cleanText(
      entry.querySelector("summary")?.textContent || ""
    );
    const published =
      entry.querySelector("published")?.textContent || "";
    const updated =
      entry.querySelector("updated")?.textContent || "";
    const link = getLink(entry, "alternate");
    const pdfLink = getLink(entry, "related", "pdf");

    const authors: string[] = [];
    entry.querySelectorAll("author name").forEach((n) => {
      authors.push(n.textContent || "");
    });

    const categories: string[] = [];
    entry.querySelectorAll("category").forEach((c) => {
      const term = c.getAttribute("term");
      if (term) categories.push(term);
    });

    const primaryCategory =
      entry
        .querySelector("arxiv\\:primary_category, primary_category")
        ?.getAttribute("term") || categories[0] || "";

    const commentEl = entry.querySelector("arxiv\\:comment, comment");
    const comment = commentEl?.textContent || undefined;

    papers.push({
      id,
      title,
      authors,
      published,
      updated,
      summary,
      link,
      pdfLink,
      categories,
      primaryCategory,
      comment,
    });
  }

  return papers;
}

function extractId(entry: Element): string {
  const idEl = entry.querySelector("id");
  if (!idEl?.textContent) return "";
  const parts = idEl.textContent.split("/");
  return parts[parts.length - 1] || parts[parts.length - 2] || "";
}

function getLink(
  entry: Element,
  rel: string,
  title?: string
): string {
  const links = entry.querySelectorAll("link");
  for (const link of links) {
    const r = link.getAttribute("rel");
    if (r === rel && (!title || link.getAttribute("title") === title)) {
      return link.getAttribute("href") || "";
    }
  }
  return "";
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}
