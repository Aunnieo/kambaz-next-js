import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Course/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Course/[cid]/Assignments/reducer";

const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
