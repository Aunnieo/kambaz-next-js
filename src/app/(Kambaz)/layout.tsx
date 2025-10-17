"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz" className="d-flex">
      {/* Always show Kambaz Navigation */}
      <KambazNavigation />

      {/* leaving space for fixed sidebar */}
      <div className="flex-fill" style={{ marginLeft: 110 }}>
        {children}
      </div>
    </div>
  );
}