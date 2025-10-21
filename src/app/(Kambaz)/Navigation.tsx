"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { GrCluster } from "react-icons/gr";
import { MdOutlineGroups, MdHelpOutline } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";


export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Dashboard", icon: LiaBookSolid }, // intentionally points to Dashboard
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
    { label: "History", path: "/History", icon: IoTimeOutline },
    { label: "Studio", path: "/Studio", icon: GrCluster },
    { label: "Groups", path: "/Groups", icon: MdOutlineGroups },
    { label: "Help", path: "/Help", icon: MdHelpOutline },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="rounded-0 position-fixed top-0 bottom-0 d-none d-md-block bg-black z-2"
    >
      {/* Northeastern Monogram */}
      <ListGroupItem
        className="bg-black border-0 text-center py-2"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
      >
        <img src="/images/nu.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {/* Account */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link
          href="/Account"
          className={`text-decoration-none d-block ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        >
          <FaRegCircleUser
            className={`fs-4 mb-1 ${
              pathname.includes("Account") ? "text-danger" : "text-white"
            }`}
          />
          <div style={{ fontSize: "0.8rem" }}>Account</div>
        </Link>
      </ListGroupItem>

      {/* Dynamic Links */}
      {links.map((link) => {
        const isActive = pathname.includes(link.label);
        const Icon = link.icon;
        return (
          <ListGroupItem
            key={link.path}
            className={`border-0 text-center py-2 ${
              isActive ? "bg-white text-danger" : "bg-black text-white"
            }`}
            as={Link}
            href={link.path}
          >
            <Icon className={`fs-4 mb-1 ${isActive ? "text-danger" : "text-white"}`} />
            <div style={{ fontSize: "0.8rem" }}>{link.label}</div>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
