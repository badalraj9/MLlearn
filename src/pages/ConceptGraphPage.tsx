import { useMemo, useRef, useEffect } from "react";
import * as d3 from "d3";
import { concepts } from "@/content/concepts";

export default function ConceptGraphPage() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const nodes = useMemo(
    () =>
      concepts.slice(0, 12).map((concept) => ({
        id: concept.id,
        title: concept.title,
        stage: concept.stage,
      })),
    [],
  );

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 820;
    const height = 420;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const simulation = d3
      .forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", "#2f5b7c");

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d: any) => d.title)
      .attr("font-size", 10)
      .attr("fill", "#5a5149")
      .attr("text-anchor", "middle")
      .attr("dy", 24);

    simulation.on("tick", () => {
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes]);

  return (
    <div className="page-content stagger-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Concept Graph</h1>
          <p className="page-header-sub">
            Explore how concepts connect. Drag nodes, zoom, and click to navigate.
          </p>
        </div>
      </div>
      <div className="toc-block">
        <div className="toc-title">On This Page</div>
        <div className="toc-list">
          <span>Graph Overview</span>
          <span>Stage Legend</span>
        </div>
      </div>
      <div className="section-divider" aria-hidden="true" />
      <div className="card insert-block" style={{ height: "440px" }}>
        <svg ref={svgRef} width="100%" height="100%" />
      </div>
    </div>
  );
}
