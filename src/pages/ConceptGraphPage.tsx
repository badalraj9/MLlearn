import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { concepts } from "@/content/concepts";
import type { Stage } from "@/types";

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  slug: string;
  stage: Stage;
  ahaMoment: string;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

const stageColors: Record<Stage, string> = {
  foundations: "#2563EB",
  "core-ml": "#7C3AED",
  "deep-learning": "#DC2626",
  research: "#D97706",
};

export default function ConceptGraphPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    title: string;
    aha: string;
  } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Build nodes and links
    const allConceptIds = new Set(concepts.map((c) => c.id));
    const nodes: GraphNode[] = concepts.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      stage: c.stage,
      ahaMoment: c.ahaMoment,
    }));

    const links: GraphLink[] = [];
    concepts.forEach((concept) => {
      concept.prerequisites.forEach((prereqId) => {
        if (allConceptIds.has(prereqId)) {
          links.push({ source: prereqId, target: concept.id });
        }
      });
    });

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    // Zoom
    const g = svg.append("g");
    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        }) as any,
    );

    // Simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance(120),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    // Links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)");

    // Nodes
    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any,
      );

    // Node circles
    node
      .append("circle")
      .attr("r", 16)
      .attr("fill", (d) => stageColors[d.stage])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("transition", "r 100ms ease");

    // Node labels
    node
      .append("text")
      .text((d) => d.title)
      .attr("dy", 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("font-family", "Inter, system-ui, sans-serif")
      .attr("fill", "#4A4A4A");

    // Hover
    node
      .on("mouseenter", (event, d) => {
        d3.select(event.currentTarget).select("circle").attr("r", 20);
        const rect = container.getBoundingClientRect();
        setTooltip({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top - 60,
          title: d.title,
          aha: d.ahaMoment,
        });
      })
      .on("mouseleave", (event) => {
        d3.select(event.currentTarget).select("circle").attr("r", 16);
        setTooltip(null);
      })
      .on("click", (_, d) => {
        navigate(`/concepts/${d.slug}`);
      });

    // Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [navigate]);

  return (
    <div className="animate-fade-in">
      <h1
        className="text-3xl font-bold mb-2"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-primary)",
        }}
      >
        Concept Graph
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
        Explore how concepts connect. Drag nodes, zoom, and click to navigate.
      </p>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {Object.entries(stageColors).map(([stage, color]) => (
          <div key={stage} className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span
              className="capitalize"
              style={{ color: "var(--text-tertiary)" }}
            >
              {stage.replace("-", " ")}
            </span>
          </div>
        ))}
      </div>

      {/* Graph Container */}
      <div
        ref={containerRef}
        className="relative rounded-lg overflow-hidden"
        style={{
          height: "500px",
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border)",
        }}
      >
        <svg ref={svgRef} className="w-full h-full" />

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute px-3 py-2 rounded-lg text-sm pointer-events-none animate-fade-in"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-md)",
              maxWidth: "250px",
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {tooltip.title}
            </div>
            <div
              className="text-xs italic mt-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              {tooltip.aha}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
