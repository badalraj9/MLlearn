import { useMemo, useRef, useEffect } from "react";
import * as d3 from "d3";
import { modules } from "@/content/modules";
import { useLearningStore } from "@/store";

interface GraphNode {
  id: string;
  title: string;
  moduleId: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

const MODULE_COLORS: Record<string, string> = {
  math: "#A0522D",
  "ml-theory": "#2f5b7c",
  "deep-learning": "#6B3FA0",
  generative: "#C2185B",
  "applied-ml": "#2E7D32",
  "deep-research": "#E65100",
};

export default function ConceptGraphPage() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { isChapterTierCompleted } = useLearningStore();

  const { nodes, links } = useMemo(() => {
    const graphNodes: GraphNode[] = [];
    const graphLinks: GraphLink[] = [];

    for (const mod of modules) {
      for (const topic of mod.topics) {
        for (const chapter of topic.chapters) {
          graphNodes.push({
            id: chapter.id,
            title: chapter.title,
            moduleId: mod.id,
          });
          if (chapter.prerequisites) {
            for (const prereqId of chapter.prerequisites) {
              graphLinks.push({ source: prereqId, target: chapter.id });
            }
          }
        }
      }
    }

    return { nodes: graphNodes, links: graphLinks };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 900;
    const height = 560;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%");

    // Zoom & pan
    const g = svg.append("g");
    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.2, 3])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        }) as any,
    );

    // Arrow marker for directed edges
    g.append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "rgba(94, 68, 45, 0.3)");

    // Create link elements
    const validLinks = links.filter(
      (l) =>
        nodes.some((n) => n.id === l.source) &&
        nodes.some((n) => n.id === l.target),
    );

    const link = g
      .append("g")
      .selectAll("line")
      .data(validLinks)
      .join("line")
      .attr("stroke", "rgba(94, 68, 45, 0.2)")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrow)");

    // Create node groups
    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(
        d3
          .drag<any, GraphNode>()
          .on("start", (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }),
      );

    // Node circles
    node
      .append("circle")
      .attr("r", 8)
      .attr("fill", (d) => MODULE_COLORS[d.moduleId] || "#5a5149")
      .attr("stroke", (d) =>
        isChapterTierCompleted(d.id, 1) ? "#2E7D32" : "rgba(255,255,255,0.7)",
      )
      .attr("stroke-width", (d) => (isChapterTierCompleted(d.id, 1) ? 3 : 1.5))
      .attr("opacity", (d) => (isChapterTierCompleted(d.id, 1) ? 1 : 0.7));

    // Node labels
    node
      .append("text")
      .text((d) => (d.title.length > 20 ? d.title.slice(0, 18) + "…" : d.title))
      .attr("font-size", 9)
      .attr("fill", "#5a5149")
      .attr("text-anchor", "middle")
      .attr("dy", 20)
      .attr("font-family", "'Source Sans 3', sans-serif");

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(validLinks as any)
          .id((d: any) => d.id)
          .distance(80),
      )
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(30));

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links, isChapterTierCompleted]);

  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Concept Graph</h1>
          <p className="page-header-sub">
            Explore how chapters connect. Drag nodes, scroll to zoom. Completed
            chapters show green borders.
          </p>
        </div>
      </div>

      <div className="graph-legend">
        {Object.entries(MODULE_COLORS).map(([id, color]) => (
          <div key={id} className="graph-legend-item">
            <span className="graph-legend-dot" style={{ background: color }} />
            <span>{id}</span>
          </div>
        ))}
      </div>

      <div
        className="card insert-block"
        style={{ height: "580px", padding: 0, overflow: "hidden" }}
      >
        <svg ref={svgRef} />
      </div>
    </div>
  );
}
