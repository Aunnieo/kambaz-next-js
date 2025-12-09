"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const pathname = usePathname();

  const links = currentUser
    ? [{ href: "/Account/Profile", label: "Profile" }]
    : [
        { href: "/Account/Signin", label: "Sign In" },
        { href: "/Account/Signup", label: "Sign Up" },
      ];

  return (
    <Nav id="wd-account-navigation" variant="pills" className="flex-column">
      {links.map((link) => (
        <NavItem key={link.href}>
          <NavLink
            as={Link}
            href={link.href}
            active={pathname === link.href}
            className="text-center"
          >
            {link.label}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
