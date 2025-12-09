"use client";

import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useParams, redirect } from "next/navigation";
import Link from "next/link";
import { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const params = useParams();
  const cidParam = params.cid;
  const aid = params.aid;

  const cid = Array.isArray(cidParam) ? cidParam[0] : cidParam ?? "";

  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  // blocks any student from accessing editor
  if (!isFaculty) {
    return redirect(`/Course/${cid}/Assignments`);
  }

  const isNew = aid === "new";

  const existing = assignments.find(
    (a) => a.id.toString() === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState(
    existing || {
      id: Math.floor(Math.random() * 10000000),
      course: cid,
      title: "",
      description: "",
      pts: 100,
      start: "",
      due: "",
      availableUntil: "",
    }
  );

  const save = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment({ id: assignment.id, updated: assignment }));
    }
    redirect(`/Course/${cid}/Assignments`);
  };

  return (
    <div className="p-3" style={{ maxWidth: 700 }}>
      <h2>{isNew ? "Create Assignment" : "Edit Assignment"}</h2>

      <Card className="mb-3 p-3">
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.pts}
            onChange={(e) =>
              setAssignment({ ...assignment, pts: Number(e.target.value) })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            value={assignment.start}
            onChange={(e) =>
              setAssignment({ ...assignment, start: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control
            value={assignment.due}
            onChange={(e) =>
              setAssignment({ ...assignment, due: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            value={assignment.availableUntil}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                availableUntil: e.target.value,
              })
            }
          />
        </Form.Group>
      </Card>

      <div>
        <Link
          href={`/Course/${cid}/Assignments`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>

        <Button onClick={save} className="btn btn-primary">
          Save
        </Button>
      </div>
    </div>
  );
}
