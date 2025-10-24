"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CourseNavigationProps {
  cid: string;
}

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CourseNavigation({ cid }: CourseNavigationProps) {
  const pathname = usePathname();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        // Special case for People link
        const path = link === "People" ? `/Course/${cid}/People/Table` : `/Course/${cid}/${link}`;
        const isActive = pathname === path;

        return (
          <Link
            key={link}
            href={path}
            className={`list-group-item border-0 ${isActive ? "active" : ""}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
