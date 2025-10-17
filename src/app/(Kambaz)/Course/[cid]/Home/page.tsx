import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      {/* Main content */}
      <div className="flex-fill me-3">
        <Modules />
      </div>

      {/* Right-side status panel */}
      <div className="d-none d-lg-block" style={{ width: 200 }}>
        <CourseStatus />
      </div>
    </div>
  );
}