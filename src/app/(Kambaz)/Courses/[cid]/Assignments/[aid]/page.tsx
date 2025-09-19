export default function AssignmentEditor() {
  return (
    <div
      id="wd-assignments-editor"
      style={{ padding: "1rem", maxWidth: "200px" }}
    >
      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input
        id="wd-name"
        defaultValue="A1 - ENV + HTML"
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <textarea
        id="wd-description"
        style={{ width: "100%", height: "150px", marginBottom: "1rem" }}
      >
        The assignment is available online. Submit a link to the landing page of
        your project.
      </textarea>

      <br />

      {/* Points */}
      <label htmlFor="wd-points">Points</label>
      <br />
      <input
        id="wd-points"
        type="number"
        defaultValue={100}
        style={{ width: "100px", marginBottom: "1rem" }}
      />
      <br />

      {/* Assignment Group */}
      <label htmlFor="wd-group">Assignment Group</label>
      <br />
      <select id="wd-group" style={{ width: "200px", marginBottom: "1rem" }}>
        <option>Assignments</option>
        <option>Lab</option>
        <option>Quiz</option>
        <option>Exam</option>
      </select>
      <br />

      {/* Display Grade As */}
      <label htmlFor="wd-display-grade-as">Display Grade As</label>
      <br />
      <select
        id="wd-display-grade-as"
        style={{ width: "200px", marginBottom: "1rem" }}
      >
        <option>Percentage</option>
        <option>Points</option>
      </select>
      <br />

      {/* Submission Type */}
      <label htmlFor="wd-submission-type">Submission Type</label>
      <br />
      <select
        id="wd-submission-type"
        style={{ width: "200px", marginBottom: "1rem" }}
      >
        <option>Online</option>
        <option>In Person</option>
      </select>
      <br />

      {/* Online Entry Options */}
      <div
        id="wd-online-options"
        style={{ marginLeft: "1rem", marginBottom: "1rem" }}
      >
        <label>Online Entry Options:</label>
        <br />
        <input type="checkbox" id="wd-text-entry" />{" "}
        <label htmlFor="wd-text-entry">Text Entry</label>
        <br />
        <input type="checkbox" id="wd-website-url" />{" "}
        <label htmlFor="wd-website-url">Website URL</label>
        <br />
        <input type="checkbox" id="wd-media-recordings" />{" "}
        <label htmlFor="wd-media-recordings">Media Recordings</label>
        <br />
        <input type="checkbox" id="wd-student-annotation" />{" "}
        <label htmlFor="wd-student-annotation">Student Annotations</label>
        <br />
        <input type="checkbox" id="wd-file-upload" />{" "}
        <label htmlFor="wd-file-upload">File Uploads</label>
        <br />
      </div>

      {/* Assign To */}
      <label htmlFor="wd-assign-to">Assign To</label>
      <br />
      <select
        id="wd-assign-to"
        style={{ width: "200px", marginBottom: "1rem" }}
      >
        <option>Everyone</option>
      </select>
      <br />

      {/* Due Date */}
      <label htmlFor="wd-due-date">Due</label>
      <br />
      <input
        type="datetime-local"
        id="wd-due-date"
        style={{ marginBottom: "1rem" }}
      />
      <br />

      {/* Availability */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="wd-available-from">Available From</label>
        <input
          type="datetime-local"
          id="wd-available-from"
          style={{ marginLeft: "0.0rem", marginRight: "1rem" }}
        />
        <br />
        <br />
        <label htmlFor="wd-available-until">Until</label>
        <input
          type="datetime-local"
          id="wd-available-until"
          style={{ marginLeft: "0.0rem" }}
        />
      </div>

      {/* Buttons */}
      <div>
        <button style={{ marginRight: "10px" }}>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}
