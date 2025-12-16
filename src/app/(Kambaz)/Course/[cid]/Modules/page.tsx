"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";


import {
  editModule,
  updateModule,
  addLesson,
  setModules,
  ModuleType,
} from "./reducer";

import * as client from "../../client";
import { RootState } from "../../../store";

export default function ModulesPage() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  const [moduleName, setModuleName] = useState("");

  /* ================================
     FETCH MODULES (SERVER)
     ================================ */
  const fetchModules = async () => {
    if (!cid) return;
    const modules = await client.findModulesForCourse(cid);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  /* ================================
     CREATE MODULE (SERVER)
     ================================ */
  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;

    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid, newModule);

    dispatch(setModules([...modules, module]));
    setModuleName("");
  };

  /* ================================
     DELETE MODULE (SERVER)
     ================================ */
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m) => m._id !== moduleId)));
  };

  /* ================================
     UPDATE MODULE (SERVER) 
     ================================ */
  const onUpdateModule = async (module: ModuleType) => {
    await client.updateModule(module);

    const updatedModules = modules.map((m) =>
      m._id === module._id ? module : m
    );

    dispatch(setModules(updatedModules));
  };

  return (
    <div className="wd-modules">
      {canEdit && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: ModuleType, index: number) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* MODULE HEADER */}
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />

                {!module.editing && `Module ${index + 1}: ${module.name}`}

                {module.editing && canEdit && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({
                          ...module,
                          editing: false,
                        });
                      }
                    }}
                  />
                )}
              </div>

              {canEdit && (
                <ModuleControlButtons
                  moduleId={module._id}
                  handleEdit={() => dispatch(editModule(module._id))}
                  handleDelete={() => onRemoveModule(module._id)}
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
            {module.lessons?.length > 0 && (
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
