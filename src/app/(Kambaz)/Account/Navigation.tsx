"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account/Signin", label: "Sign In" },
    { href: "/Account/Signup", label: "Sign Up" },
    { href: "/Account/Profile", label: "Profile" },
  ];

  return (
    <ListGroup
      id="wd-account-navigation"
      style={{ width: 110 }}
      className="rounded-0 position-fixed top-0 bottom-0 bg-white z-2"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <ListGroupItem
            key={link.href}
            className="border-0 text-center py-2"
            style={{ backgroundColor: "white" }}
          >
            <Link
              href={link.href}
              className={`text-decoration-none d-block ${
                isActive ? "text-dark" : "text-danger"
              }`}
            >
              {link.label}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}