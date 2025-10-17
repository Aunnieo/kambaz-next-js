"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem, InputGroup, FormControl, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BiSearch, BiPlus } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

export default function AssignmentsPage() {
  const assignments = [
    { id: 123, title: "A1 - ENV + HTML", start: "May 6 @ 12:00am", due: "May 13 @ 11:59", pts: 100 },
    { id: 124, title: "A2 - CSS + BOOTSTRAP", start: "May 13 @ 12:00am", due: "May 20 @ 11:59", pts: 100 },
    { id: 125, title: "A3 - JavaScript + REACT", start: "May 20 @ 12:00am", due: "May 27 @ 11:59", pts: 100 },
    { id: 126, title: "A4 - Project Setup", start: "May 27 @ 12:00am", due: "Jun 3 @ 11:59", pts: 100 },
  ];

  return (
    <div id="wd-assignments-container" className="p-3">
      {/* Top Bar: Search + Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search Input */}
        <InputGroup style={{ maxWidth: "400px" }}>
          <InputGroup.Text>
            <BiSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search for Assignments" />
        </InputGroup>

        {/* Group + Assignment Buttons */}
        <div className="d-flex gap-2">
          <Button variant="secondary">
            <BiPlus className="me-1" /> Group
          </Button>
          <Button variant="danger">
            <BiPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      {/* Assignment List */}
      <ListGroup className="rounded-0" id="wd-assignments">
        {assignments.map((a, idx) => (
          <ListGroupItem
            key={a.id}
            className="d-flex justify-content-between align-items-start wd-assignment-item"
            style={{
              borderLeft: "4px solid #28a745", // green left border
              borderTop: idx === 0 ? "none" : "1px solid #dee2e6", // gray line between items
              padding: "1rem",
            }}
          >
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <Link
                href={`/Courses/1234/Assignments/${a.id}`}
                className="text-decoration-none"
              >
                <strong>{a.title}</strong>
              </Link>
              <div className="small text-muted mt-1">
                Multiple Modules: <strong>Not available until</strong> {a.start}
                <br />
                <strong>Due</strong> {a.due} | {a.pts}pts
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FaCheckCircle className="text-success fs-5" /> {/* green checkmark */}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}