"use client";

import { useState } from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = db;

  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  if (!currentUser) {
    return (
      <div className="p-5 text-center">
        Please sign in to view your dashboard.
      </div>
    );
  }

  //FILTER: only courses the user is enrolled in
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id && enrollment.course === course.cid
    )
  );

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h2 id="wd-dashboard-published">
        Your Courses ({enrolledCourses.length})
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {enrolledCourses.map((course) => (
          <Col
            key={course.cid}
            className="wd-dashboard-course"
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href={`/Course/${course.cid}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  src={`/images/${course.cid}.jpg`}
                  variant="top"
                  width="100%"
                  height={160}
                  onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
                />

                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    {course.title}
                  </CardTitle>

                  <CardText
                    className="overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.subtitle}
                  </CardText>

                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      <hr />

      {/* New Course Controls */}
      <h5>New Course</h5>

      <button
        className="btn btn-primary float-end"
        onClick={() => dispatch(addNewCourse(course))}
      >
        Add
      </button>

      <button
        className="btn btn-danger float-end me-2"
        onClick={() => dispatch(deleteCourse(course._id))}
      >
        Delete
      </button>

      <button
        className="btn btn-warning float-end me-2"
        onClick={() => dispatch(updateCourse(course))}
      >
        Update
      </button>

      <br />
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />

      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />

      <hr />
    </div>
  );
}
