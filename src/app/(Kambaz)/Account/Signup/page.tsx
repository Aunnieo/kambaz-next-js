"use client";

import Link from "next/link";
import { Form, Button, Card } from "react-bootstrap";

export default function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Centered Card */}
      <Card className="p-4 shadow" style={{ width: "350px" }}>
        <h3 className="mb-4 text-center">Sign up</h3>

        {/* Username */}
        <Form.Group className="mb-3" controlId="wd-username">
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="wd-password">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        {/* Verify Password */}
        <Form.Group className="mb-3" controlId="wd-password-verify">
          <Form.Control type="password" placeholder="Verify Password" />
        </Form.Group>

        {/* Sign Up Button */}
        <Link href="/Account/Profile" className="btn btn-primary w-100 mb-3">
          Sign up
        </Link>

        {/* Sign In Link */}
        <div className="text-center">
          <Link href="/Account/Signin" className="text-decoration-none">
            Already have an account? Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}