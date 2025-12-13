"use client";

import { Dropdown } from "react-bootstrap";
import Link from "next/link";

export default function QuizContextMenu({
  quizId,
  cid,
  onDelete,
  onPublishToggle,
  isPublished,
}: {
  quizId: string;
  cid: string;
  onDelete: () => void;
  onPublishToggle: () => void;
  isPublished: boolean;
}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" className="border-0 p-0">
        <span style={{ fontSize: "22px" }}>⋮</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* Edit */}
        <Dropdown.Item as={Link} href={`/Course/${cid}/Quizzes/${quizId}`}>
          Edit
        </Dropdown.Item>

        {/* Publish / Unpublish */}
        <Dropdown.Item onClick={onPublishToggle}>
          {isPublished ? "Unpublish" : "Publish"}
        </Dropdown.Item>

        <Dropdown.Divider />

        {/* Delete */}
        <Dropdown.Item className="text-danger" onClick={onDelete}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
