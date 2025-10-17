import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { use } from "react";

export default function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = use(params);

  const sidebarWidth = 110;

  return (
    <div id="wd-courses" className="d-flex">
      <div className="d-none d-md-block">
        <CourseNavigation />
      </div>

      <div className="flex-fill d-flex" style={{ marginLeft: sidebarWidth }}>
        <div className="flex-fill p-3">
          <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" />
            Course {cid}
          </h2>
          <hr />
          {children}
        </div>
      </div>
    </div>
  );
}