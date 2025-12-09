"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const courses = [
  {
    cid: "1234",
    title: "CS1234 React JS",
    subtitle: "Full Stack Software Developer",
  },
  { cid: "3308", title: "SCHM 3308", subtitle: "Supply Chain Analytics" },
  { cid: "3305", title: "SCHM 3305", subtitle: "Sourcing and Negotiation" },
  { cid: "Fundies1", title: "CS Fundies 1", subtitle: "Foundations of CS 1" },
  { cid: "Fundies2", title: "CS Fundies 2", subtitle: "Foundations of CS 2" },
  {
    cid: "DiscreteMaths",
    title: "MATH 2301",
    subtitle: "Discrete Mathematics",
  },
  { cid: "Strategy", title: "MGMT 4100", subtitle: "Strategy in Action" },
  { cid: "OrgB", title: "MGMT 2200", subtitle: "Organizational Behavior" },
];

export default function CoursesPage() {
  return (
    <div className="p-3">
      <h2>My Courses</h2>
      <hr />
      <ListGroup>
        {courses.map((course) => (
          <Link
            key={course.cid}
            href={`/Course/${course.cid}/Home`}
            className="text-decoration-none"
          >
            <ListGroupItem action>
              <strong>{course.title}</strong>
              <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                {course.subtitle}
              </div>
            </ListGroupItem>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
}
