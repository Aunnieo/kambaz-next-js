"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { useState } from "react";

export default function QuizPreview() {
  const params = useParams();
  const router = useRouter();

  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  const quiz = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q) => q.id === qid)
  );

  if (!quiz) return <p className="p-4">Quiz not found.</p>;
  if (!quiz.questionsList || quiz.questionsList.length === 0)
    return <p className="p-4">Quiz has no questions.</p>;

  /* ---------------- STATE ---------------- */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const currentQuestion = quiz.questionsList[currentIndex];

  /* ---------------- HELPERS ---------------- */
  function submitQuiz() {
    setSubmitted(true);
  }

  function isCorrect(question: any) {
    if (question.type === "multiple-choice") {
      const selected = answers[question.id];
      const correct = question.options?.find((o: any) => o.correct);
      return selected === correct?.id;
    }

    if (question.type === "true-false") {
      return answers[question.id] === question.answer;
    }

    if (question.type === "fill-blank") {
      const user = answers[question.id] || [];
      return JSON.stringify(user) === JSON.stringify(question.blanks);
    }

    return false;
  }

  function saveAnswer(questionId: string, value: any) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setLastSavedAt(new Date());
  }

  const score = submitted
    ? quiz.questionsList.reduce(
        (sum, q) => sum + (isCorrect(q) ? q.points : 0),
        0
      )
    : 0;

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4">
      <h1>{quiz.title}</h1>

      <div className="alert alert-warning">
        This is a preview of the published version of the quiz
      </div>

      {submitted && (
        <div className="alert alert-info">
          You scored <strong>{score}</strong> out of{" "}
          <strong>{quiz.points}</strong>
        </div>
      )}

      {/* ---------- CURRENT QUESTION ---------- */}
      <div className="border p-3 mb-3">
        <h5>
          Question {currentIndex + 1} — {currentQuestion.points} pts
        </h5>

        <p>{currentQuestion.text}</p>

        {/* MULTIPLE CHOICE */}
        {currentQuestion.type === "multiple-choice" &&
          currentQuestion.options?.map((opt) => (
            <div key={opt.id}>
              <input
                type="radio"
                name={currentQuestion.id}
                disabled={submitted}
                checked={answers[currentQuestion.id] === opt.id}
                onChange={() => saveAnswer(currentQuestion.id, opt.id)}
              />{" "}
              {opt.text}
            </div>
          ))}

        {/* TRUE / FALSE */}
        {currentQuestion.type === "true-false" && (
          <>
            <div>
              <input
                type="radio"
                name={currentQuestion.id}
                disabled={submitted}
                checked={answers[currentQuestion.id] === true}
                onChange={() => saveAnswer(currentQuestion.id, true)}
              />{" "}
              True
            </div>
            <div>
              <input
                type="radio"
                name={currentQuestion.id}
                disabled={submitted}
                checked={answers[currentQuestion.id] === false}
                onChange={() => saveAnswer(currentQuestion.id, false)}
              />{" "}
              False
            </div>
          </>
        )}

        {/* FILL IN BLANK */}
        {currentQuestion.type === "fill-blank" &&
          currentQuestion.blanks?.map((_, idx) => (
            <input
              key={idx}
              className="form-control mb-2"
              disabled={submitted}
              placeholder={`Blank ${idx + 1}`}
              value={answers[currentQuestion.id]?.[idx] ?? ""}
              onChange={(e) => {
                const updated = [...(answers[currentQuestion.id] || [])];
                updated[idx] = e.target.value;
                saveAnswer(currentQuestion.id, updated);
              }}
            />
          ))}

        {submitted && (
          <div
            className={`mt-2 fw-semibold ${
              isCorrect(currentQuestion) ? "text-success" : "text-danger"
            }`}
          >
            {isCorrect(currentQuestion) ? "Correct ✓" : "Incorrect ✗"}
          </div>
        )}
      </div>

      {/* ---------- NEXT / SUBMIT ---------- */}

      {lastSavedAt && !submitted && (
        <div className="text-muted text-end mb-2">
          Quiz saved at{" "}
          {lastSavedAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}

      <div className="d-flex justify-content-end mb-4">
        {!submitted ? (
          currentIndex < quiz.questionsList.length - 1 ? (
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </button>
          ) : (
            <button className="btn btn-primary" onClick={submitQuiz}>
              Submit Quiz
            </button>
          )
        ) : (
          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              router.push(`/Course/${cid}/Quizzes/${qid}/Edit?tab=questions`)
            }
          >
            Keep Editing This Quiz
          </button>
        )}
      </div>

      {/* ---------- QUESTION LIST ---------- */}
      <hr />
      <h6>Questions</h6>
      <ul className="list-unstyled">
        {quiz.questionsList.map((q, idx) => {
          const correct = submitted && isCorrect(q);

          return (
            <li
              key={q.id}
              className={`d-flex align-items-center gap-2 ${
                idx === currentIndex ? "fw-bold" : ""
              } ${submitted ? (correct ? "text-success" : "text-danger") : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentIndex(idx)}
            >
              <span>Question {idx + 1}</span>

              {submitted && <span>{correct ? "✓" : "✗"}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
