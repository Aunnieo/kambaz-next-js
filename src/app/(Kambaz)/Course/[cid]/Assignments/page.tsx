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
  const params = useParams();
  const cidParam = params.cid;
  const cid = Array.isArray(cidParam) ? cidParam[0] : cidParam ?? "";

  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  // Assignments for current course enrolled in
  const assignments = useSelector((state: RootState) =>
    state.assignmentsReducer.assignments.filter((a) => a.course === cid)
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

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

          {/* Faculty-only:  adding an Assignment */}
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
      <ListGroup className="rounded-0" id="wd-assignments">
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
              <div>
                <BsGripVertical className="me-2 fs-3" />

                {/* Faculty can click into editor, students see plain text */}
                {isFaculty ? (
                  <Link
                    href={`/Course/${cid}/Assignments/${a.id}`}
                    className="text-decoration-none"
                  >
                    <strong>{a.title}</strong>
                  </Link>
                ) : (
                  <strong>{a.title}</strong>
                )}

                <div className="small text-muted mt-1">
                  Available: {a.start}
                  <br />
                  <strong>Due:</strong> {a.due} | {a.pts} pts
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                {/* Faculty-only delete */}
                {isFaculty && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(a.id)}
                    className="p-1"
                    id="wd-delete-assignment-btn"
                  >
                    <FaTrash />
                  </Button>
                )}

                <FaCheckCircle className="text-success fs-5" />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>
    </div>
  );
}
