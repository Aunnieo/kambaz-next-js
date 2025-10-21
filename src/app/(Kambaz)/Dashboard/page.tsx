"use client";

import Link from "next/link";
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button } from "react-bootstrap";
import * as db from "../Database"; // this will pull from courses.json

export default function Dashboard() {
  const courses = db.courses; // pulls all your classroom data

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course.cid} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Course/${course.cid}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  {/* Optional: Add logic to use different images per course */}
                  <CardImg
                    src={`/images/${course.cid}.jpg`} // you can name your images after course IDs
                    variant="top"
                    width="100%"
                    height={160}
                    onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
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
      </div>
    </div>
  );
}
