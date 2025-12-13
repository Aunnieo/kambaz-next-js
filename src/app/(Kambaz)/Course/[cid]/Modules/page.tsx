"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import Breadcrumb from "../Breadcrumb";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  addLesson,
  ModuleType,
} from "./reducer";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function ModulesPage() {

  const params = useParams();
  const rawCid = params.cid;
  const cid = Array.isArray(rawCid) ? rawCid[0] : rawCid ?? "";

  
  const dispatch = useDispatch();

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // Only FACULTY or TA can edit
  const canEdit =
    currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  const [moduleName, setModuleName] = useState("");

  // Only modules for this course
  const filteredModules = modules.filter(
    (m: ModuleType) => m.course === cid
  );

  return (
    <div className="wd-modules">
      {/* Top Controls: only for Faculty/TA */}
      {canEdit && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={() => {
            if (!moduleName.trim()) return;
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }}
        />
      )}

      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {filteredModules.map((module: ModuleType) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* MODULE HEADER */}
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />

                {/* Module Name or Edit Field */}
               {!module.editing && `Module ${filteredModules.indexOf(module) + 1}: ${module.name}`}


                {module.editing && canEdit && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(
                          updateModule({ ...module, editing: false })
                        );
                      }
                    }}
                  />
                )}
              </div>

              {/* Control buttons: only Faculty/TA */}
              {canEdit && (
                <ModuleControlButtons
                  moduleId={module._id}
                  handleEdit={() => dispatch(editModule(module._id))}
                  handleDelete={() => dispatch(deleteModule(module._id))}
                  handleAddLesson={() => {
                    const name = prompt("Lesson Name:");
                    if (name?.trim()) {
                      dispatch(addLesson({ moduleId: module._id, name }));
                    }
                  }}
                />
              )}
            </div>

            {/* LESSONS */}
            {module.lessons && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </div>

                    {/* Only show lesson controls to Faculty/TA */}
                    {canEdit && <LessonControlButtons />}
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
