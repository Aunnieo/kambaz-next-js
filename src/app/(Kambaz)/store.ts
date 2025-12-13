import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Course/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Course/[cid]/Assignments/reducer";
import quizzesReducer from "./Course/[cid]/Quizzes/reducer";

/* ----------------------------------------
   Load persisted quizzes state (if exists)
----------------------------------------- */
const quizzesStateFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("kambaz_quizzes")
    : null;

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    quizzesReducer,
  },
  preloadedState: quizzesStateFromStorage
    ? {
        quizzesReducer: JSON.parse(quizzesStateFromStorage),
      }
    : undefined,
});

/* ----------------------------------------
   Persist quizzes slice only
----------------------------------------- */
store.subscribe(() => {
  localStorage.setItem(
    "kambaz_quizzes",
    JSON.stringify(store.getState().quizzesReducer)
  );
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

const savedUser =
  typeof window !== "undefined"
    ? localStorage.getItem("kambaz_user")
    : null;

    store.subscribe(() => {
  const { currentUser } = store.getState().accountReducer;
  localStorage.setItem("kambaz_user", JSON.stringify(currentUser));
});


