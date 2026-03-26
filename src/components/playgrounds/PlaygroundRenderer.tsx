import type { PlaygroundConfig } from "@/types";
import SliderPlayground from "./SliderPlayground";
import EquationPlayground from "./EquationPlayground";
import AttentionScaleSlider from "@/components/widgets/AttentionScaleSlider";
import BayesMedicalTest from "@/components/widgets/BayesMedicalTest";
import GradientDescentViz from "@/components/widgets/GradientDescentViz";

interface PlaygroundRendererProps {
  config: PlaygroundConfig;
}

export default function PlaygroundRenderer({
  config,
}: PlaygroundRendererProps) {
  switch (config.type) {
    case "slider":
      return (
        <SliderPlayground
          sliders={config.sliders || []}
          graphFn={config.graphFn}
          xRange={config.xRange}
          yRange={config.yRange}
        />
      );

    case "equation":
      return (
        <EquationPlayground
          initialEquation={config.equation || "x^2"}
          xRange={config.xRange}
          yRange={config.yRange}
        />
      );

    case "graph":
      // Graph-only mode uses slider playground with no sliders
      return (
        <SliderPlayground
          sliders={[]}
          graphFn={config.graphFn}
          xRange={config.xRange}
          yRange={config.yRange}
        />
      );

    case "code":
      // Code playground — future implementation
      return (
        <div className="playground-container">
          <div className="playground-header">
            <span className="playground-badge">💻 Code</span>
          </div>
          <pre className="playground-code-preview">
            {config.code || "// Coming soon"}
          </pre>
        </div>
      );

    case "widget":
      switch (config.widgetId) {
        case "attention-scale-slider":
          return <AttentionScaleSlider />;
        case "bayes-medical-test":
          return <BayesMedicalTest />;
        case "gradient-descent-viz":
          return <GradientDescentViz />;
        default:
          return (
            <div className="playground-container">
              <div className="playground-header">
                <span className="playground-badge">🔧 Widget</span>
              </div>
              <p className="text-sm text-gray-500">Unknown widget: {config.widgetId}</p>
            </div>
          );
      }

    default:
      return null;
  }
}
