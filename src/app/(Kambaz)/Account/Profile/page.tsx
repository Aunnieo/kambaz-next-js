"use client";

import Link from "next/link";
import { Form, Button, Card } from "react-bootstrap";

export default function Profile() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h3 className="mb-4 text-center">Profile</h3>

        <Form>
          {/* Username */}
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Control type="text" defaultValue="alice" placeholder="Username" />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Control type="password" defaultValue="123" placeholder="Password" />
          </Form.Group>

          {/* First Name */}
          <Form.Group className="mb-3" controlId="wd-firstname">
            <Form.Control type="text" defaultValue="Alice" placeholder="First Name" />
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-3" controlId="wd-lastname">
            <Form.Control type="text" defaultValue="Wonderland" placeholder="Last Name" />
          </Form.Group>

          {/* Date of Birth */}
          <Form.Group className="mb-3" controlId="wd-dob">
            <Form.Control type="date" defaultValue="2000-01-01" />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="wd-email">
            <Form.Control type="email" defaultValue="alice@wonderland" placeholder="Email" />
          </Form.Group>

          {/* Role */}
          <Form.Group className="mb-3" controlId="wd-role">
            <Form.Select defaultValue="FACULTY">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>

          {/* Sign Out Button */}
          <Link href="/Account/Signin" className="btn btn-danger w-100 mt-3">
            Sign Out
          </Link>
        </Form>
      </Card>
    </div>
  );
}