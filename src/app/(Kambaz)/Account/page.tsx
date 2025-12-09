"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Account() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  if (currentUser) {
    // Logged in → go to Profile
    redirect("/Account/Profile");
  }

  // Not logged in → go to Sign In
  redirect("/Account/Signin");
}
