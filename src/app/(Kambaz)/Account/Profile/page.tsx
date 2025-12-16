"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const updateProfile = async () => {
    const updatedProfile = await client.updateProfile(profile);

    dispatch(setCurrentUser(updatedProfile));
  };

  const [profile, setProfile] = useState<any>(null);

  // Load profile OR redirect if not signed in
  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  if (!profile) return null;

  return (
    <div className="wd-profile-screen p-3">
      <h3>Profile</h3>

      {/* Username */}
      <FormControl
        id="wd-username"
        className="mb-2"
        defaultValue={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />

      {/* Password */}
      <FormControl
        id="wd-password"
        className="mb-2"
        defaultValue={profile.password}
        type="password"
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />

      {/* Full Name */}
      <FormControl
        id="wd-name"
        className="mb-2"
        defaultValue={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />

      {/* Role Selector */}
      <select
        className="form-control mb-2"
        id="wd-role"
        defaultValue={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="TA">TA</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
        {" "}
        Update{" "}
      </button>
      {/* Sign Out Button */}
      <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
        Sign out
      </Button>
    </div>
  );
}
