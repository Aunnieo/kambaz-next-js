"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FormControl,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import * as client from "../Course/client";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector(
    (state: RootState) => state.coursesReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  // ✅ SELECTED COURSE (A4 behavior restored)
  const [course, setCourse] = useState<any>({
    cid: "",
    name: "",
    description: "",
    image: "/images/reactjs.jpg",
  });

  /* ================================
     AUTH GUARD
     ================================ */
  if (!currentUser) {
    return (
      <div className="p-5 text-center">
        Please sign in to view your dashboard.
      </div>
    );
  }

  /* ================================
     FETCH COURSES
     ================================ */
  const fetchCourses = async () => {
    const courses = await client.findMyCourses();
    dispatch(setCourses(courses));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ================================
     FACULTY CRUD (SAFE)
     ================================ */
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));

    // reset form after create
    setCourse({
      cid: "",
      name: "",
      description: "",
      image: "/images/reactjs.jpg",
    });
  };

  const onUpdateCourse = async () => {
    if (!course.cid) return; // 🚫 no selection, no update

    const updated = await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) =>
          c.cid === updated.cid ? updated : c
        )
      )
    );
  };

  const onDeleteCourse = async () => {
    if (!course.cid) return; // 🚫 no selection, no delete

    await client.deleteCourse(course.cid);
    dispatch(
      setCourses(courses.filter((c) => c.cid !== course.cid))
    );

    // clear selection after delete
    setCourse({
      cid: "",
      name: "",
      description: "",
      image: "/images/reactjs.jpg",
    });
  };

  /* ================================
     RENDER
     ================================ */
  return (
    <div id="wd-dashboard" className="p-3">
      <h1>Dashboard</h1>
      <hr />

      <h2>Your Courses ({courses.length})</h2>
      <hr />

      {/* COURSES (CLICK TO SELECT — A4 STYLE) */}
      <div className="d-flex flex-wrap gap-4">
        {courses.map((c: any) => (
          <div
            key={c.cid}
            style={{ width: "300px", cursor: "pointer" }}
          >
            <Card onClick={() => setCourse(c)}>
              <Link
                href={`/Course/${c.cid}/Home`}
                className="text-decoration-none text-dark"
                onClick={(e) => e.stopPropagation()}
              >
                <CardImg
                  src={c.image || "/images/default.jpg"}
                  variant="top"
                  height={160}
                />
              </Link>

              <CardBody>
                <CardTitle>{c.name}</CardTitle>
                <CardText style={{ height: "100px" }}>
                  {c.description}
                </CardText>
                <Button variant="primary">Go</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      {/* FACULTY CONTROLS */}
      {isFaculty && (
        <>
          <hr />
          <h5>New / Edit Course</h5>

          <Button
            className="float-end"
            onClick={onAddNewCourse}
          >
            Add
          </Button>

          <Button
            className="float-end me-2"
            variant="warning"
            onClick={onUpdateCourse}
            disabled={!course.cid}
          >
            Update
          </Button>

          <Button
            className="float-end me-2"
            variant="danger"
            onClick={onDeleteCourse}
            disabled={!course.cid}
          >
            Delete
          </Button>

          <br />
          <br />

          <FormControl
            className="mb-2"
            placeholder="Course name"
            value={course.name}
            onChange={(e) =>
              setCourse({ ...course, name: e.target.value })
            }
          />

          <FormControl
            as="textarea"
            rows={3}
            placeholder="Course description"
            value={course.description}
            onChange={(e) =>
              setCourse({
                ...course,
                description: e.target.value,
              })
            }
          />
        </>
      )}
    </div>
  );
}
