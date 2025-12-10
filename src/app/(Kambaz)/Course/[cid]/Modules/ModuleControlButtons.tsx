"use client";

import { FaTrash, FaPen } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  handleDelete,
  handleEdit,
  handleAddLesson,
}: {
  moduleId: string;
  handleDelete: () => void;
  handleEdit: () => void;
  handleAddLesson: () => void;
}) {
  return (
    <div className="float-end d-flex align-items-center gap-3">
      {/* Edit module name */}
      <FaPen
        className="text-primary fs-5"
        onClick={handleEdit}
        style={{ cursor: "pointer" }}
      />

      {/* Delete module */}
      <FaTrash
        className="text-danger fs-5"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      />

 
      <GreenCheckmark />

      {/* Add Lesson */}
      <BsPlus
        className="fs-4 text-success"
        onClick={handleAddLesson}
        style={{ cursor: "pointer" }}
      />

      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
