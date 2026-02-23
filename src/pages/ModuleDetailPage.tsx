import { useParams, Link } from "react-router-dom";
import { modules } from "@/content/modules";

export default function ModuleDetailPage() {
  const { moduleId } = useParams();
  const module = modules.find((item) => item.id === moduleId);

  if (!module) return <div className="page-content">Module not found.</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">{module.title}</h1>
          <p className="page-header-sub">{module.description}</p>
        </div>
      </div>

      <div className="card-grid">
        {module.levels.map((level) => (
          <Link
            key={level.id}
            to={`/modules/${module.id}/levels/${level.id}`}
            className="card"
          >
            <h3>{level.title}</h3>
            <p>{level.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
