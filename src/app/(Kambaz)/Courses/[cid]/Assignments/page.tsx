import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
        style={{ marginRight: "10px" }}
      />
      <button id="wd-add-assignment-group" style={{ marginRight: "5px" }}>
        + Group
      </button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <div>
            Multiple Modules: <strong>Not available until</strong> May 6 @
            12:00am
            <br />
            <strong>Due</strong> May 13 at 11:59 | 100pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>
            Multiple Modules: <strong>Not available until</strong> May 13 @
            12:00am
            <br />
            <strong>Due</strong> May 20 at 11:59 | 100pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 - JavaScript + REACT
          </Link>
          <div>
            Multiple Modules: <strong>Not available until</strong> May 20 @
            12:00am
            <br />
            <strong>Due</strong> May 27 at 11:59 | 100pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/126"
            className="wd-assignment-link"
          >
            A4 - Project Setup
          </Link>
          <div>
            Multiple Modules: <strong>Not available until</strong> May 27 @
            12:00am
            <br />
            <strong>Due</strong> Jun 3 at 11:59 | 100pts
          </div>
        </li>
      </ul>
    </div>
  );
}
