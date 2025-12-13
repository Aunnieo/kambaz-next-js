"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import Link from "next/link";
import { togglePublish } from "../reducer";
import { useEffect, useState } from "react";

export default function QuizDetails() {
  const params = useParams();
  const dispatch = useDispatch();

  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const quiz = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q) => q.id === qid)
  );

  const user = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );


  if (!mounted) {
    return <div className="p-4" />;
  }

  if (!quiz) {
    return <div className="p-4">Quiz not found.</div>;
  }

  if (!user) {
    return <div className="p-4">Please sign in.</div>;
  }

  const attempts = quiz.attempts?.filter((a) => a.userId === user._id) ?? [];

  const canTakeQuiz =
    quiz.published &&
    (!quiz.multipleAttempts
      ? attempts.length === 0
      : !quiz.attemptLimit || attempts.length < quiz.attemptLimit);

  const isFaculty = user.role === "FACULTY";

  return (
    <div className="p-4">
      {/* ACTION BUTTONS */}
      <div className="mt-4 d-flex gap-3">
        {isFaculty && (
          <>
            <Link
              className="btn btn-outline-secondary"
              href={`/Course/${cid}/Quizzes/${qid}/Preview`}
            >
              Preview
            </Link>

            <Link
              className="btn btn-primary"
              href={`/Course/${cid}/Quizzes/${qid}/Edit`}
            >
              Edit
            </Link>
          </>
        )}

        {!isFaculty && canTakeQuiz && (
          <Link
            className="btn btn-success"
            href={`/Course/${cid}/Quizzes/${qid}/Take`}
          >
            Take Quiz
          </Link>
        )}
      </div>

      {!isFaculty && !canTakeQuiz && (
        <div className="alert alert-warning mt-3">No remaining attempts</div>
      )}

      <h2 className="fw-bold mt-4">{quiz.title}</h2>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          <strong>Points:</strong> {quiz.points}
        </div>

        {isFaculty && (
          <button
            className={`btn ${
              quiz.published ? "btn-success" : "btn-secondary"
            }`}
            onClick={() => dispatch(togglePublish(quiz.id))}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </button>
        )}
      </div>

      <hr className="my-4" />

      <h5 className="fw-semibold mb-3">Quiz Details</h5>

      <div className="ms-2">
        <p>
          <strong>Type:</strong> {quiz.quizType}
        </p>

        <p>
          <strong>Description:</strong> {quiz.description || "No description"}
        </p>

        <p>
          <strong>Assignment Group:</strong> {quiz.assignmentGroup || "None"}
        </p>

        <p>
          <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}
        </p>

        <p>
          <strong>Time Limit:</strong>{" "}
          {quiz.hasTimeLimit ? `${quiz.timeLimit} minutes` : "No time limit"}
        </p>

        <p>
          <strong>Multiple Attempts:</strong>{" "}
          {quiz.multipleAttempts
            ? `Yes (${quiz.attemptLimit ?? "Unlimited"})`
            : "No"}
        </p>

        <p>
          <strong>Show Correct Answers:</strong>{" "}
          {quiz.showCorrectAnswers || "Not set"}
        </p>

        <p>
          <strong>Access Code:</strong> {quiz.accessCode || "None"}
        </p>

        <p>
          <strong>One Question at a Time:</strong>{" "}
          {quiz.oneQuestionAtATime ? "Yes" : "No"}
        </p>

        <p>
          <strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}
        </p>

        <p>
          <strong>Lock After Answering:</strong>{" "}
          {quiz.lockAfterAnswering ? "Yes" : "No"}
        </p>

        <p>
          <strong>Due Date:</strong> {quiz.dueDate || "None"}
        </p>

        <p>
          <strong>Available From:</strong> {quiz.availableFrom || "None"}
        </p>

        <p>
          <strong>Until:</strong> {quiz.availableUntil || "None"}
        </p>
      </div>
    </div>
  );
}
