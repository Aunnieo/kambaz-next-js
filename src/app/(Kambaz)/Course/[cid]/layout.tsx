"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams() as { cid: string };
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  // Find the course by id
  const course = courses.find((course: any) => course.id === cid);

  // Toggle sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div id="wd-courses" className="d-flex">
      {sidebarVisible && (
        <div className="d-none d-md-block">
          <CourseNavigation cid={cid} />
        </div>
      )}

      <div className="flex-fill p-3">
        <h2 className="text-danger">
          <FaAlignJustify
            className="me-4 fs-4 mb-1 cursor-pointer"
            onClick={toggleSidebar}
          />
          {course?.title}
        </h2>
        <hr />
        {children}
      </div>
    </div>
  );
}
