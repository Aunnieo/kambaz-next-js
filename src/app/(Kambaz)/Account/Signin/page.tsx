"use client";

import Link from "next/link";
import { Form, Button, Card } from "react-bootstrap";

export default function Signin() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Centered Card */}
      <Card className="p-4 shadow" style={{ width: "350px" }}>
        <h3 className="mb-4 text-center">Sign in</h3>

        {/* Username */}
        <Form.Group className="mb-3" controlId="wd-username">
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="wd-password">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        {/* Sign In Button */}
        <Link href="/Dashboard" className="btn btn-primary w-100 mb-3">
          Sign in
        </Link>

        {/* Signup Link */}
        <div className="text-center">
          <Link href="/Account/Signup" className="text-decoration-none">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}