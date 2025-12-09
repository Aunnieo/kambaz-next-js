"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ListGroup,
  ListGroupItem,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { BiSearch, BiPlus } from "react-icons/bi";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "./reducer";

export default function AssignmentsPage() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const assignments = useSelector((state: RootState) =>
    state.assignmentsReducer.assignments.filter((a) => a.course === cid)
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

  return (
    <div id="wd-assignments-container" className="p-3">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search */}
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

          {/* Faculty-only create button */}
          {isFaculty && (
            <Link
              href={`/Course/${cid}/Assignments/new`}
              className="btn btn-danger"
            >
              <BiPlus className="me-1" /> Assignment
            </Link>
          )}
        </div>
      </div>

      {/* Assignment List */}
      <ListGroup className="rounded-0">
        {assignments.length === 0 ? (
          <ListGroupItem className="text-center text-muted">
            No assignments for this course.
          </ListGroupItem>
        ) : (
          assignments.map((a, idx) => (
            <ListGroupItem
              key={a.id}
              className="d-flex justify-content-between align-items-start"
              style={{
                borderLeft: "4px solid #28a745",
                borderTop: idx === 0 ? "none" : "1px solid #dee2e6",
                padding: "1rem",
              }}
            >
              {/* LEFT SIDE */}
              <div>
                <BsGripVertical className="me-2 fs-3" />

                <Link
                  href={`/Course/${cid}/Assignments/${a.id}`}
                  className="text-decoration-none"
                >
                  <strong>{a.title}</strong>
                </Link>

                <div className="small text-muted mt-1">
                  Available: {a.start}
                  <br />
                  <strong>Due:</strong> {a.due} | {a.pts} pts
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="d-flex align-items-center gap-2">
                {/* Faculty-only trash button */}
                {isFaculty && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="p-1"
                    onClick={() => handleDelete(a.id)}
                  >
                    <FaTrash />
                  </Button>
                )}

                {/* Checkmark ALWAYS shown */}
                <FaCheckCircle className="text-success fs-5" />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}
