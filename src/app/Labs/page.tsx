import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <ul>
        <li>
          <Link href="/Labs/Lab1">Lab 1: HTML Examples</Link>
        </li>
        <li>
          <Link href="/Labs/Lab2">Lab 2: CSS Basics</Link>
        </li>
        <li>
          <Link href="/Labs/Lab3">Lab 3: JavaScript Fundamentals</Link>
        </li>
        <li>
          <Link href="/Labs/Lab4">
            Lab 4: Managing State and User Input with Forms
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5">
            Lab 5: Implementing RESTful Web APIs with Express.js
          </Link>
        </li>
      </ul>
    </div>
  );
}
