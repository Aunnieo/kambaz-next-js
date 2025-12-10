"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Breadcrumb() {
  const { cid } = useParams();
  const pathname = usePathname();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((c: any) => c.cid === cid || c.id === cid);

  const parts = pathname.split("/").filter(Boolean);

  let section = "Home";
  let page: string | null = null;

  if (parts.length >= 3) {
    section = capitalize(parts[2]);
  }

  if (parts.length >= 4) {
    if (section === "Assignments") page = "Assignment Details";
    if (section === "Modules") page = "Module Details";
  }

  return (
    <div className="text-secondary mb-2" style={{ fontSize: "0.9rem" }}>
      <Link href="/Dashboard" className="text-secondary text-decoration-none">
        Courses
      </Link>

      {" > "}

      <Link
        href={`/Course/${cid}`}
        className="text-secondary text-decoration-none"
      >
        {course?.title || cid}
      </Link>

      {" > "}
      {section}

      {page && (
        <>
          {" > "}
          {page}
        </>
      )}
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
