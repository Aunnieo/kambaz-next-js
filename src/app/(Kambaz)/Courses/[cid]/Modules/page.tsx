export default function Modules() {
  return (
    <div>
      {/* Action buttons */}
      <div style={{ marginBottom: "10px" }}>
        <button>Collapse All</button>
        <button style={{ marginLeft: "10px" }}>View Progress</button>
        <select style={{ marginLeft: "10px" }}>
          <option value="">Publish All</option>
          <option value="module">Publish Modules</option>
          <option value="lesson">Publish Lessons</option>
        </select>{" "}
        <button style={{ marginLeft: "10px" }}>+ Module</button>
      </div>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>{" "}
          </ul>
        </li>

        {/* Week 2 */}
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LECTURE 2</span>
              <ul className="wd-content">
                <li className="wd-content-item">JavaScript Introduction</li>
                <li className="wd-content-item">Variables and Data Types</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">ASSIGNMENT 1</span>
              <ul className="wd-content">
                <li className="wd-content-item">Build a simple web page</li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Week 3 */}
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LECTURE 3</span>
              <ul className="wd-content">
                <li className="wd-content-item">Functions and Loops</li>
                <li className="wd-content-item">DOM Manipulation</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">QUIZ 1</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Quiz on HTML, CSS, and JS Basics
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
