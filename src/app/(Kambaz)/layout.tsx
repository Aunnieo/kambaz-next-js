"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import Session from "./Account/Session";

export default function KambazLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kambaz" className="d-flex">
          {/* Always show Kambaz Navigation */}
          <KambazNavigation />

          {/* leaving space for fixed sidebar */}
          <div className="flex-fill" style={{ marginLeft: 110 }}>
            {children}
          </div>
        </div>
      </Session>
    </Provider>
  );
}
