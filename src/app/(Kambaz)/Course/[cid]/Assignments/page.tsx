"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, InputGroup, FormControl, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BiSearch, BiPlus } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import * as db from "../../../Database";

export default function AssignmentsPage() {
  const { cid } = useParams();

  // Filter assignments for the current course
  const assignments = db.assignments.filter(a => a.course === cid);

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

        {/* Buttons */}
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
        {assignments.length === 0 ? (
          <ListGroupItem className="text-center text-muted">
            No assignments for this course.
          </ListGroupItem>
        ) : (
          assignments.map((a, idx) => (
            <ListGroupItem
              key={a.id || a.id} // unique key
              className="d-flex justify-content-between align-items-start wd-assignment-item"
              style={{
                borderLeft: "4px solid #28a745",
                borderTop: idx === 0 ? "none" : "1px solid #dee2e6",
                padding: "1rem",
              }}
            >
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {/* Link to Assignment Editor */}
                <Link
                  href={`/Course/${cid}/Assignments/${a.id || a.id}`}
                  className="text-decoration-none"
                >
                  <strong>{a.title}</strong>
                </Link>
                <div className="small text-muted mt-1">
                  Not available until {a.start}
                  <br />
                  <strong>Due</strong> {a.due} | {a.pts ?? 100} pts
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <FaCheckCircle className="text-success fs-5" />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}
