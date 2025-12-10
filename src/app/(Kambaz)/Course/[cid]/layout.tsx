"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CourseLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid ?? "";

  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const course = courses.find((c: any) => c.cid === cid);

  // Sidebar toggle
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div id="wd-course-layout" className="d-flex">
      {/* Sidebar */}
      {sidebarVisible && (
        <div className="d-none d-md-block">
          <CourseNavigation cid={cid} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-fill p-3">
        {/* Header row */}
        <div className="d-flex align-items-center justify-content-between">
          {/* Hamburger + Course Title */}
          <h2 className="text-danger mb-0">
            <FaAlignJustify
              className="me-4 fs-4 mb-1 cursor-pointer"
              onClick={toggleSidebar}
            />
            {course?.title ?? "Course"}
          </h2>
        </div>
        <Breadcrumb />

        <hr />

        {/* Render the actual page */}
        {children}
      </div>
    </div>
  );
}
