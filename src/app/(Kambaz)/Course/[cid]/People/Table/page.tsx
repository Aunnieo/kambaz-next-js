"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";

export default function PeopleTable() {
  const { cid } = useParams();

  if (!cid) {
    return <div>Loading...</div>;
  }

 
  const courseEnrollments = db.enrollments.filter(
    (e) => e.course.toLowerCase() === String(cid).toLowerCase()
  );


  const people = courseEnrollments
    .map((e) => db.users.find((u) => u._id === e.user))
    .filter(Boolean); 


  return (
    <div id="wd-people-table" className="p-3">
      <h4 className="mb-3">People in {cid}</h4>
      {people.length === 0 ? (
        <p>No people found for this course.</p>
      ) : (
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr key={p!._id}>
                <td className="text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  {p!.name}
                </td>
                <td>{p!.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
