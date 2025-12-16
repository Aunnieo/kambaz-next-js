"use client";

import * as client from "../client";
import Link from "next/link";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { redirect } from "next/navigation";
import { useState } from "react";
import { setCurrentUser } from "../reducer";
import * as db from "../../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) {
      alert("Invalid username or password");
      return;
    }

    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow" style={{ width: "350px" }}>
        <h3 className="mb-4 text-center">Sign in</h3>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            placeholder="password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </Form.Group>

        <Button onClick={signin} className="w-100">
          Sign in
        </Button>

        <div className="text-center mt-3">
          <Link href="/Account/Signup">Sign up</Link>
        </div>
      </Card>
    </div>
  );
}
