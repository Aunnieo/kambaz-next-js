


import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: { cid: string } }>) {
  const { cid } = await params;

  const sidebarWidth = 110; 

  return (
    <div id="wd-courses" className="d-flex">
      {/* Left sidebar fix */}
      <div className="d-none d-md-block">
        <CourseNavigation />
      </div>

      {/* Main content & right sidebar */}
      <div
        className="flex-fill d-flex"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Main content */}
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
