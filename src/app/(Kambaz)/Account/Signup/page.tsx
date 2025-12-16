"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signup = async () => {
    const currentUser = await client.signup(user);
    if (!currentUser) {
      alert("Unable to sign up");
      return;
    }
    dispatch(setCurrentUser(currentUser));
    redirect("/Profile");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow" style={{ width: "350px" }}>
        <h3 className="mb-4 text-center">Sign up</h3>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>

        <Button onClick={signup} className="w-100 mb-3">
          Sign up
        </Button>

        <div className="text-center">
          <Link href="/Account/Signin" className="text-decoration-none">
            Already have an account? Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
