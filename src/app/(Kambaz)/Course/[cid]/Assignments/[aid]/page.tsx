"use client";

import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

export default function AssignmentEditor() {
  const [submissionType, setSubmissionType] = useState("Online");

  return (
    <div
      id="wd-assignments-editor"
      className="p-3"
      style={{ maxWidth: "700px", position: "relative" }}
    >
      {/* Top Right Buttons */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <Button variant="success">
          <FaCheckCircle className="me-1" /> Publish
        </Button>
        <Button variant="secondary">
          <FaCheckCircle className="me-1" /> Save Draft
        </Button>
      </div>

      <h2>Edit Assignment</h2>

      {/* Assignment Name + Description */}
      <Card className="mb-3 p-3">
        <Form.Group controlId="wd-name" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue="The assignment is available online. Submit a link to the landing page of your project."
          />
        </Form.Group>
      </Card>

      {/* Points */}
      <Card className="mb-3 p-3">
        <Form.Group controlId="wd-points">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            defaultValue={100}
            style={{ maxWidth: "120px" }}
          />
        </Form.Group>
      </Card>

      {/* Assignment Group */}
      <Card className="mb-3 p-3">
        <Form.Group controlId="wd-group">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select defaultValue="Assignments">
            <option>Assignments</option>
            <option>Lab</option>
            <option>Quiz</option>
            <option>Exam</option>
          </Form.Select>
        </Form.Group>
      </Card>

      {/* Display Grade As */}
      <Card className="mb-3 p-3">
        <Form.Group controlId="wd-display-grade-as">
          <Form.Label>Display Grade As</Form.Label>
          <Form.Select defaultValue="Percentage">
            <option>Percentage</option>
            <option>Points</option>
          </Form.Select>
        </Form.Group>
      </Card>

      {/* Submission Type + Online/In-Person Options */}
      <Card className="mb-3 p-3">
        <Form.Group controlId="wd-submission-type" className="mb-3">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select
            value={submissionType}
            onChange={(e) => setSubmissionType(e.target.value)}
          >
            <option>Online</option>
            <option>In Person</option>
          </Form.Select>
        </Form.Group>

        {submissionType === "Online" && (
          <Form.Group controlId="wd-online-options" className="mb-3">
            <Form.Label>Online Entry Options</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
              />
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotations"
              />
              <Form.Check
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
              />
            </div>
          </Form.Group>
        )}

        {submissionType === "In Person" && (
          <Form.Group controlId="wd-inperson-options" className="mb-3">
            <Form.Label>In-Person Submission Instructions</Form.Label>
            <Form.Control
              type="text"
              placeholder="Instructions for in-person submission"
            />
          </Form.Group>
        )}
      </Card>

      {/* Due Date + Availability + Assign To */}
      <Card className="mb-3 p-3">
        <Form.Group controlId="wd-assign-to" className="mb-3">
          <Form.Label>Assign To</Form.Label>
          <Form.Select defaultValue="Everyone">
            <option>Everyone</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="wd-due-date" className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>

        <Form.Group controlId="wd-available-from" className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>

        <Form.Group controlId="wd-available-until" className="mb-3">
          <Form.Label>Until</Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>
      </Card>

      {/* Bottom Buttons */}
      <div className="mt-3">
        <Button variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button variant="primary">Save</Button>
      </div>
    </div>
  );
}