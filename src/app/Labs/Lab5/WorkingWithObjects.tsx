"use client";

import { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;


export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    title: "NodeJS Assignment",
    score: 0,
    completed: false,
  });

  const [module, setModule] = useState({
    name: "Introduction to Node",
    description: "Learn the basics of Node.js",
  });

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <a
        id="wd-retrieve-assignment"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>

      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-secondary me-2"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Assignment Title
      </a>
    

      <hr />

      <FormControl
        className="mb-2"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <a
        id="wd-update-assignment-title"
        className="btn btn-success"
        href={`${HTTP_SERVER}/lab5/assignment/title/${assignment.title}`}
      >
        Update Assignment Title
      </a>

      <hr />

      <a
        id="wd-get-module"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>

      <a
        id="wd-get-module-name"
        className="btn btn-secondary"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
    </div>
  );
}
