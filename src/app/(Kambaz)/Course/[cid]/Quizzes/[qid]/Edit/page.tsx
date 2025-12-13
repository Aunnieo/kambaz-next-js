"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { updateQuiz, togglePublish, Quiz } from "../../reducer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function EditQuiz() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  const router = useRouter();
  const dispatch = useDispatch();

  const quizFromStore = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q) => q.id === qid)
  );
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"details" | "questions">(
    tabParam === "questions" ? "questions" : "details"
  );

  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (quizFromStore) setQuiz(quizFromStore);
  }, [quizFromStore]);

  if (!quiz) return <p className="p-4">Loading...</p>;

  function updateField<K extends keyof Quiz>(field: K, value: Quiz[K]) {
    setQuiz((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  // Save → go to Details page
  function save() {
    if (!quiz) return;
    dispatch(updateQuiz({ id: quiz.id, updates: { ...quiz } }));
    router.push(`/Course/${cid}/Quizzes/${qid}`);
  }

  // Save & Publish → publish then back to list
  function saveAndPublish() {
    if (!quiz) return;
    dispatch(
      updateQuiz({ id: quiz.id, updates: { ...quiz, published: true } })
    );
    router.push(`/Course/${cid}/Quizzes`);
  }

  // Cancel → back to list, no save
  function cancel() {
    router.push(`/Course/${cid}/Quizzes`);
  }

  return (
    <div className="p-4">
      {/* Header */}
      <h1 className="fw-bold">{quiz.title}</h1>

      {/* Tabs */}
      <div className="d-flex border-bottom mb-3">
        <button
          onClick={() => setActiveTab("details")}
          className={`btn btn-link ${
            activeTab === "details"
              ? "fw-bold border-bottom border-primary"
              : ""
          }`}
        >
          Details
        </button>

        <button
          onClick={() => setActiveTab("questions")}
          className={`btn btn-link ${
            activeTab === "questions"
              ? "fw-bold border-bottom border-primary"
              : ""
          }`}
        >
          Questions
        </button>
      </div>

      {/* -------------------- DETAILS TAB -------------------- */}
      {activeTab === "details" && (
        <div>
          {/* Title */}
          <div className="mb-3">
            <label>Title</label>
            <input
              className="form-control"
              value={quiz.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              value={quiz.description ?? ""}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          {/* Quiz Type */}
          <div className="mb-3">
            <label>Quiz Type</label>
            <select
              className="form-select"
              value={quiz.quizType}
              onChange={(e) =>
                updateField("quizType", e.target.value as Quiz["quizType"])
              }
            >
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survey</option>
              <option>Ungraded Survey</option>
            </select>
          </div>

          {/* Assignment Group */}
          <div className="mb-3">
            <label>Assignment Group</label>
            <select
              className="form-select"
              value={quiz.assignmentGroup}
              onChange={(e) => updateField("assignmentGroup", e.target.value)}
            >
              <option>Quizzes</option>
              <option>Exams</option>
              <option>Assignments</option>
              <option>Project</option>
            </select>
          </div>

          {/* Options */}
          <div className="mb-3">
            <label className="fw-bold">Options</label>

            <div>
              <input
                type="checkbox"
                checked={quiz.shuffleAnswers ?? false}
                onChange={(e) =>
                  updateField("shuffleAnswers", e.target.checked)
                }
              />{" "}
              Shuffle Answers
            </div>

            <div className="mt-2">
              <input
                type="checkbox"
                checked={quiz.hasTimeLimit ?? false}
                onChange={(e) => updateField("hasTimeLimit", e.target.checked)}
              />{" "}
              Time Limit
              {quiz.hasTimeLimit && (
                <input
                  type="number"
                  className="form-control mt-2"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    updateField("timeLimit", Number(e.target.value))
                  }
                />
              )}
            </div>

            <div className="mt-2">
              <input
                type="checkbox"
                checked={quiz.multipleAttempts}
                onChange={(e) =>
                  updateField("multipleAttempts", e.target.checked)
                }
              />{" "}
              Allow Multiple Attempts
              {quiz.multipleAttempts && (
                <input
                  type="number"
                  className="form-control mt-2"
                  value={quiz.attemptLimit ?? 1}
                  onChange={(e) =>
                    updateField("attemptLimit", Number(e.target.value))
                  }
                />
              )}
            </div>

            <div className="mt-2">
              <label>Access Code</label>
              <input
                className="form-control"
                value={quiz.accessCode ?? ""}
                onChange={(e) => updateField("accessCode", e.target.value)}
              />
            </div>

            <div className="mt-2">
              <input
                type="checkbox"
                checked={quiz.oneQuestionAtATime ?? false}
                onChange={(e) =>
                  updateField("oneQuestionAtATime", e.target.checked)
                }
              />{" "}
              One Question at a Time
            </div>

            <div className="mt-2">
              <input
                type="checkbox"
                checked={quiz.webcamRequired ?? false}
                onChange={(e) =>
                  updateField("webcamRequired", e.target.checked)
                }
              />{" "}
              Webcam Required
            </div>

            <div className="mt-2">
              <input
                type="checkbox"
                checked={quiz.lockAfterAnswering ?? false}
                onChange={(e) =>
                  updateField("lockAfterAnswering", e.target.checked)
                }
              />{" "}
              Lock After Answering
            </div>
          </div>

          {/* Dates */}
          <div className="mb-3">
            <label>Due Date</label>
            <input
              type="date"
              className="form-control"
              value={quiz.dueDate ?? ""}
              onChange={(e) => updateField("dueDate", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Available From</label>
            <input
              type="date"
              className="form-control"
              value={quiz.availableFrom ?? ""}
              onChange={(e) => updateField("availableFrom", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Until</label>
            <input
              type="date"
              className="form-control"
              value={quiz.availableUntil ?? ""}
              onChange={(e) => updateField("availableUntil", e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-secondary" onClick={cancel}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={save}>
              Save
            </button>
            <button className="btn btn-danger" onClick={saveAndPublish}>
              Save & Publish
            </button>
          </div>
        </div>
      )}

      {/* -------------------- QUESTIONS TAB -------------------- */}
      {activeTab === "questions" && (
        <div>
          <h4 className="fw-bold mb-3">Questions</h4>

          {/* No questions */}
          {quiz.questionsList?.length === 0 && (
            <p className="text-muted">
              No questions yet. Add some from the Questions screen.
            </p>
          )}

          {/* List questions */}
          {quiz.questionsList?.map((q) => (
            <div key={q.id} className="border p-2 mb-2 rounded">
              <strong>{q.title}</strong>
              <div className="text-muted small">
                Type: {q.type} — {q.points} pts
              </div>
            </div>
          ))}

          {/* Link to full Questions Editor */}
          <Link
            className="btn btn-primary mt-3"
            href={`/Course/${cid}/Quizzes/${qid}/Questions`}
          >
            Edit Questions
          </Link>
        </div>
      )}
    </div>
  );
}
