import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { IoTimeOutline } from "react-icons/io5";
import { GrCluster } from "react-icons/gr";
import { MdOutlineGroups } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";

import Link from "next/link";

export default function KambazNavigation() {
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
          className="text-white text-decoration-none d-block"
        >
          <FaRegCircleUser className="fs-4 text-white mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Account</div>
        </Link>
      </ListGroupItem>

      {/* Dashboard */}
      <ListGroupItem className="border-0 bg-black text-center py-2 active">
        <Link
          href="/Dashboard"
          className="text-danger text-decoration-none d-block"
        >
          <AiOutlineDashboard className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Dashboard</div>
        </Link>
      </ListGroupItem>

      {/* Courses */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link
          href="/Courses"
          className="text-danger text-decoration-none d-block"
        >
          <LiaBookSolid className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Courses</div>
        </Link>
      </ListGroupItem>

      {/* Calendar */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link
          href="/Calendar"
          className="text-danger text-decoration-none d-block"
        >
          <IoCalendarOutline className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Calendar</div>
        </Link>
      </ListGroupItem>

      {/* Inbox */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link
          href="/Inbox"
          className="text-danger text-decoration-none d-block"
        >
          <FaInbox className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Inbox</div>
        </Link>
      </ListGroupItem>

      {/* Labs */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link href="/Labs" className="text-danger text-decoration-none d-block">
          <LiaBookSolid className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Labs</div>
        </Link>
      </ListGroupItem>

      {/* History */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link
          href="/History"
          className="text-danger text-decoration-none d-block"
        >
          <IoTimeOutline className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>History</div>
        </Link>
      </ListGroupItem>

      {/* Studio */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link
          href="/Studio"
          className="text-danger text-decoration-none d-block"
        >
          <GrCluster className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Studio</div>
        </Link>
      </ListGroupItem>

      {/* Groups */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link
          href="/Groups"
          className="text-danger text-decoration-none d-block"
        >
          <MdOutlineGroups className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Groups</div>
        </Link>
      </ListGroupItem>

      {/* Help */}
      <ListGroupItem className="border-0 bg-black text-center py-2">
        <Link href="/Help" className="text-danger text-decoration-none d-block">
          <MdHelpOutline className="fs-4 text-danger mb-1" />
          <div style={{ fontSize: "0.8rem" }}>Help</div>
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}