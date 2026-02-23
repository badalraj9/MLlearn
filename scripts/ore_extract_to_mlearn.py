import argparse
import json
import os
import sys
from pathlib import Path

ORE_BACKEND = Path(__file__).resolve().parents[1] / "ore" / "ore-backend"
sys.path.append(str(ORE_BACKEND))

try:
    from core.extraction.extractor import ContentExtractor
except Exception as exc:  # pragma: no cover - runtime dependency
    raise SystemExit(
        "Failed to import ORE extractor. Install ore-backend dependencies first."
    ) from exc


def build_placeholder_payload(sections: dict, source_file: str) -> dict:
    """
    Create a MLearn-compatible content payload with empty placeholders,
    while keeping the raw extracted sections for manual filling.
    """
    return {
        "source_file": source_file,
        "intro": [],
        "keyIdeas": [],
        "equations": [],
        "references": [],
        "raw_sections": sections,
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Extract PDF sections using ORE and emit MLearn content JSON."
    )
    parser.add_argument("pdf", help="Path to PDF file")
    parser.add_argument(
        "--out",
        help="Output JSON path",
        default="mlearn_content.json",
    )
    args = parser.parse_args()

    pdf_path = Path(args.pdf).resolve()
    if not pdf_path.exists():
        raise SystemExit(f"PDF not found: {pdf_path}")

    extractor = ContentExtractor()
    raw_text = extractor.extract_text_from_pdf(str(pdf_path))
    sections = extractor.segment_sections(raw_text)

    payload = build_placeholder_payload(sections, str(pdf_path))
    out_path = Path(args.out).resolve()
    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
