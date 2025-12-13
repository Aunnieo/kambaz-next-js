"use client";

import { useParams, useRouter } from "next/navigation";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { addQuiz, deleteQuiz, togglePublish } from "./reducer";
import QuizContextMenu from "./QuizContextMenu";
import type { Quiz } from "./reducer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuizzesPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid ?? "";
  const user = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  /* ---------------- SELECTORS ---------------- */
  const quizzes = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.filter((q) => q.course === cid)
  );

  const isFaculty = user?.role === "FACULTY";

  /* ---------------- CREATE QUIZ (FACULTY ONLY) ---------------- */
  function createQuiz() {
    if (!isFaculty) return; // student block

    const newId = Date.now().toString();
    dispatch(addQuiz({ cid }));
    router.push(`/Course/${cid}/Quizzes/${newId}/Edit`);
  }
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------- HELPERS ---------------- */
  function getAvailability(q: any) {
    const now = new Date();
    if (q.availableUntil && now > new Date(q.availableUntil)) return "Closed";
    if (
      q.availableFrom &&
      q.availableUntil &&
      now >= new Date(q.availableFrom) &&
      now <= new Date(q.availableUntil)
    )
      return "Available";
    if (q.availableFrom && now < new Date(q.availableFrom))
      return `Not available until ${new Date(
        q.availableFrom
      ).toLocaleString()}`;
    return "Multiple Dates";
  }

  function handleCopy(quiz: Quiz) {
    if (!isFaculty) return;

    dispatch(
      addQuiz({
        ...quiz,
        id: Date.now().toString(),
        title: quiz.title + " (Copy)",
      })
    );
  }

  if (!mounted) return null; 

  function sortByAvailableDate(a: any, b: any) {
    if (!a.availableFrom && !b.availableFrom) return 0;
    if (!a.availableFrom) return 1;
    if (!b.availableFrom) return -1;

    return (
      new Date(a.availableFrom).getTime() - new Date(b.availableFrom).getTime()
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="container">
      {/* TOP BAR */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <FormControl placeholder="Search for Quiz" className="w-50" />

        {isFaculty && (
          <div className="d-flex align-items-center gap-2">
            <Button variant="danger" onClick={createQuiz}>
              + Quiz
            </Button>
            <IoEllipsisVertical className="fs-3" />
          </div>
        )}
      </div>

      {/* SECTION HEADER */}
      <div className="border p-2 bg-light fw-bold">Assignment Quizzes</div>

      <ListGroup className="border rounded-0">
        {quizzes
          .filter((q) => {
            // students don't see unpublished quizzes
            if (user?.role !== "FACULTY" && !q.published) return false;
            return true;
          })
          .sort(sortByAvailableDate)
          .map((quiz) => (
            <ListGroupItem
              key={quiz.id}
              className="d-flex justify-content-between align-items-start p-3 border-bottom"
            >
              {/* LEFT SIDE */}
              <div>
                {quiz.published ? (
                  <FaCheckCircle className="text-success me-2" />
                ) : (
                  <FaRegCircle className="text-secondary me-2" />
                )}

                <Link
                  href={`/Course/${cid}/Quizzes/${quiz.id}`}
                  className="fw-bold text-decoration-none"
                >
                  {quiz.title}
                </Link>

                <div className="text-muted small mt-1">
                  {getAvailability(quiz)} | Due{" "}
                  {quiz.dueDate ?? "Multiple Dates"} | {quiz.points} pts |{" "}
                  {quiz.questions} Questions
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="d-flex align-items-center gap-3">
                {user?.role === "FACULTY" && (
                  <>
                    <span
                      onClick={() => dispatch(togglePublish(quiz.id))}
                      style={{ cursor: "pointer" }}
                      title="Publish / Unpublish"
                    >
                      {quiz.published ? (
                        <FaCheckCircle className="text-success fs-4" />
                      ) : (
                        <FaRegCircle className="text-secondary fs-4" />
                      )}
                    </span>

                    <QuizContextMenu
                      quizId={quiz.id}
                      cid={cid}
                      onDelete={() => dispatch(deleteQuiz(quiz.id))}
                      onPublishToggle={() => dispatch(togglePublish(quiz.id))}
                      isPublished={quiz.published}
                    />
                  </>
                )}
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
