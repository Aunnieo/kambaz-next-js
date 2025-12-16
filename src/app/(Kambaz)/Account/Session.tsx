"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await client.profile();
        dispatch(setCurrentUser(currentUser));
      } catch (err) {
        // not logged in is OK
      }
      setPending(false);
    };
    fetchProfile();
  }, [dispatch]);

  if (pending) {
    return null; // ✅ CRITICAL
  }

  return children;
}
