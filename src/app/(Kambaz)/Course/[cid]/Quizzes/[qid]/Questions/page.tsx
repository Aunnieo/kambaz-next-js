"use client";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { updateQuiz } from "../../reducer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// -----------------------------
// Strong Question Type
// -----------------------------
export interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  title: string;
  points: number;
  text: string;
  options: { id: string; text: string; correct: boolean }[];
  answer?: boolean; // for true-false
  blanks: string[]; // for fill-blank
}

export default function QuizQuestionsPage() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;
  const router = useRouter();

  const dispatch = useDispatch();

  const quiz = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q) => q.id === qid)
  );

  // Quiz not found safeguard
  if (!quiz) return <p className="p-4">Quiz not found.</p>;

  // Force TypeScript to treat quiz as non-null
  const q = quiz!;

  // Local editable questions
  const [localQuestions, setLocalQuestions] = useState<Question[]>(
    (q.questionsList as Question[]) ?? []
  );

  // -----------------------------
  // Add New Question
  // -----------------------------
  function addQuestion() {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "multiple-choice",
      title: "New Question",
      points: 1,
      text: "",
      options: [
        { id: "a", text: "Option 1", correct: false },
        { id: "b", text: "Option 2", correct: false },
      ],
      blanks: [],
    };

    setLocalQuestions((prev) => [...prev, newQuestion]);
  }

  // -----------------------------
  // Update question fields
  // -----------------------------
  function updateQuestion(id: string, field: keyof Question, value: any) {
    setLocalQuestions((prev) =>
      prev.map((qq) => (qq.id === id ? { ...qq, [field]: value } : qq))
    );
  }

  // -----------------------------
  // Save Questions
  // -----------------------------
  function saveQuestions() {
    dispatch(
      updateQuiz({
        id: q.id,
        updates: {
          questionsList: localQuestions,
          questions: localQuestions.length,
          points: localQuestions.reduce((sum, q) => sum + q.points, 0),
        },
      })
    );

    alert("Questions saved!");

    // Redirect back to Edit Quiz → Questions tab
    router.push(`/Course/${cid}/Quizzes/${qid}/Edit?tab=questions`);
  }

  // -----------------------------
  // Cancel Edits
  // -----------------------------
  function cancel() {
    setLocalQuestions((q.questionsList as Question[]) ?? []);
  }

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="fw-bold mb-3">Questions</h2>

      {/* New Question Button */}
      <button className="btn btn-outline-primary mb-3" onClick={addQuestion}>
        + New Question
      </button>

      {/* No Questions Yet */}
      {localQuestions.length === 0 && (
        <p className="text-muted">No questions yet. Click “New Question”.</p>
      )}

      {/* Question Editor List */}
      {localQuestions.map((qst) => (
        <div key={qst.id} className="border p-3 mb-3 rounded">
          {/* QUESTION TITLE */}
          <input
            className="form-control mb-2"
            value={qst.title}
            onChange={(e) => updateQuestion(qst.id, "title", e.target.value)}
          />

          {/* QUESTION TYPE */}
          <select
            className="form-select mb-2"
            value={qst.type}
            onChange={(e) =>
              updateQuestion(qst.id, "type", e.target.value as Question["type"])
            }
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="fill-blank">Fill in the Blank</option>
          </select>

          {/* POINTS */}
          <div className="mb-2">
            <label>Points</label>
            <input
              type="number"
              className="form-control"
              value={qst.points}
              onChange={(e) =>
                updateQuestion(qst.id, "points", Number(e.target.value))
              }
            />
          </div>

          {/* =============================
              TYPE-SPECIFIC UI
          ============================== */}

          {/* MULTIPLE CHOICE */}
          {qst.type === "multiple-choice" && (
            <div className="mt-3">
              <label>Options</label>
              {qst.options.map((opt, idx) => (
                <div key={opt.id} className="d-flex gap-2 mb-2">
                  <input
                    className="form-control"
                    value={opt.text}
                    onChange={(e) => {
                      const updated = qst.options.map((opt, i) =>
                        i === idx ? { ...opt, text: e.target.value } : opt
                      );
                      updateQuestion(qst.id, "options", updated);
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={opt.correct}
                    onChange={(e) => {
                      const updated = qst.options.map((o, i) =>
                        i === idx ? { ...o, correct: e.target.checked } : o
                      );
                      updateQuestion(qst.id, "options", updated);
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* TRUE/FALSE */}
          {qst.type === "true-false" && (
            <div>
              <label className="fw-bold">Answer</label>
              <div>
                <input
                  type="radio"
                  name={`tf-${qst.id}`}
                  checked={qst.answer === true}
                  onChange={() => updateQuestion(qst.id, "answer", true)}
                />{" "}
                True
              </div>
              <div>
                <input
                  type="radio"
                  name={`tf-${qst.id}`}
                  checked={qst.answer === false}
                  onChange={() => updateQuestion(qst.id, "answer", false)}
                />{" "}
                False
              </div>
            </div>
          )}

          {/* FILL IN THE BLANK */}
          {qst.type === "fill-blank" && (
            <div>
              <label>Correct Answers</label>
              {qst.blanks.map((b, idx) => (
                <input
                  key={idx}
                  className="form-control mb-2"
                  value={b}
                  onChange={(e) => {
                    const updated = [...qst.blanks];
                    updated[idx] = e.target.value;
                    updateQuestion(qst.id, "blanks", updated);
                  }}
                />
              ))}

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() =>
                  updateQuestion(qst.id, "blanks", [...qst.blanks, ""])
                }
              >
                + Add Blank
              </button>
            </div>
          )}
        </div>
      ))}

      {/* FOOTER BUTTONS */}
      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-secondary" onClick={cancel}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={saveQuestions}>
          Save
        </button>
      </div>
    </div>
  );
}
