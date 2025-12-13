"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { useState, useEffect } from "react";
import { submitQuizAttempt } from "../../reducer";

export default function TakeQuiz() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  /* ---------------- ALL HOOKS  ---------------- */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- PARAMS ---------------- */
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  /* ---------------- REDUX ---------------- */
  const quizFromStore = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q) => q.id === qid)
  );

  const userFromStore = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  /* ---------------- GUARDS  ---------------- */
  if (!mounted) return <div className="p-4" />;
  if (!quizFromStore) return <div className="p-4">Quiz not found.</div>;
  if (!userFromStore) return <div className="p-4">Please sign in.</div>;
  if (quizFromStore.questionsList.length === 0)
    return <div className="p-4">This quiz has no questions.</div>;

  /* ---------------- NON-NULL ALIASES ---------------- */
  const quiz = quizFromStore;
  const user = userFromStore;

  /* ---------------- ATTEMPTS ---------------- */
  const studentAttempts =
    quiz.attempts?.filter((a) => a.userId === user._id) ?? [];

  const lastAttempt =
    studentAttempts.length > 0
      ? studentAttempts[studentAttempts.length - 1]
      : null;

  const alreadySubmitted = !!lastAttempt || justSubmitted;

  const activeAnswers = lastAttempt?.answers ?? answers;
  const currentQuestion = quiz.questionsList[currentIndex];

  /* ---------------- HELPERS ---------------- */
  function isCorrect(question: any) {
    const userAnswer = activeAnswers[question.id];

    if (userAnswer === undefined) return false;

    if (question.type === "multiple-choice") {
      const correct = question.options?.find((o: any) => o.correct);
      return userAnswer === correct?.id;
    }

    if (question.type === "true-false") {
      return userAnswer === question.answer;
    }

    if (question.type === "fill-blank") {
      if (!Array.isArray(userAnswer)) return false;
      if (userAnswer.some((b: string) => !b || b.trim() === "")) return false;
      return JSON.stringify(userAnswer) === JSON.stringify(question.blanks);
    }

    return false;
  }

  function submitQuiz() {
    if (alreadySubmitted) return;

    const score = quiz.questionsList.reduce(
      (sum, q) => sum + (isCorrect(q) ? q.points : 0),
      0
    );

    dispatch(
      submitQuizAttempt({
        quizId: quiz.id,
        userId: user._id,
        answers,
        score,
      })
    );

    setJustSubmitted(true);
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4">
      <h2 className="fw-bold mb-3">{quiz.title}</h2>

      {alreadySubmitted && (
        <div className="alert alert-info mb-4">
          Final Score:{" "}
          <strong>
            {lastAttempt?.score ??
              quiz.questionsList.reduce(
                (sum, q) => sum + (isCorrect(q) ? q.points : 0),
                0
              )}
          </strong>{" "}
          / {quiz.points}
        </div>
      )}

      <div className="border p-3 mb-3 rounded">
        <h5>
          Question {currentIndex + 1} — {currentQuestion.points} pts
        </h5>

        {currentQuestion.type === "multiple-choice" &&
          currentQuestion.options.map((opt: any) => (
            <div key={opt.id}>
              <input
                type="radio"
                name={currentQuestion.id}
                disabled={alreadySubmitted}
                checked={activeAnswers[currentQuestion.id] === opt.id}
                onChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: opt.id,
                  }))
                }
              />{" "}
              {opt.text}
            </div>
          ))}

        {currentQuestion.type === "true-false" && (
          <>
            <div>
              <input
                type="radio"
                name={currentQuestion.id}
                disabled={alreadySubmitted}
                checked={activeAnswers[currentQuestion.id] === true}
                onChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: true,
                  }))
                }
              />{" "}
              True
            </div>
            <div>
              <input
                type="radio"
                name={currentQuestion.id}
                disabled={alreadySubmitted}
                checked={activeAnswers[currentQuestion.id] === false}
                onChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: false,
                  }))
                }
              />{" "}
              False
            </div>
          </>
        )}

        {currentQuestion.type === "fill-blank" &&
          currentQuestion.blanks.map((_: any, idx: number) => (
            <input
              key={idx}
              className="form-control mb-2"
              disabled={alreadySubmitted}
              placeholder={`Blank ${idx + 1}`}
              value={activeAnswers[currentQuestion.id]?.[idx] ?? ""}
              onChange={(e) => {
                const updated = [...(answers[currentQuestion.id] || [])];
                updated[idx] = e.target.value;
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.id]: updated,
                }));
              }}
            />
          ))}

        {alreadySubmitted && (
          <div
            className={
              isCorrect(currentQuestion)
                ? "text-success mt-2"
                : "text-danger mt-2"
            }
          >
            {isCorrect(currentQuestion) ? "Correct ✓" : "Incorrect ✗"}
          </div>
        )}
      </div>

      {!alreadySubmitted ? (
        currentIndex < quiz.questionsList.length - 1 ? (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentIndex((i) => i + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure? You won’t be able to change your answers."
              );
              if (confirmed) submitQuiz();
            }}
          >
            Submit Quiz
          </button>
        )
      ) : (
        <button
          className="btn btn-outline-secondary"
          onClick={() => router.push(`/Course/${cid}/Quizzes/${qid}`)}
        >
          Back to Quiz Details
        </button>
      )}

      <hr />
      <h6>Questions</h6>
      <ul className="list-unstyled">
        {quiz.questionsList.map((q, idx) => {
          const correct = alreadySubmitted && isCorrect(q);

          return (
            <li
              key={q.id}
              className={`d-flex align-items-center gap-2 ${
                idx === currentIndex ? "fw-bold" : ""
              } ${
                alreadySubmitted
                  ? correct
                    ? "text-success"
                    : "text-danger"
                  : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentIndex(idx)}
            >
              <span>Question {idx + 1}</span>
              {alreadySubmitted && <span>{correct ? "✓" : "✗"}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
