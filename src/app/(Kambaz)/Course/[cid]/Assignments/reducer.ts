import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";

export interface Assignment {
  id: number;
  title: string;
  start: string;
  due: string;
  pts: number;
  course: string;
  description: string;
  availableUntil: string; // ← FIXED spelling
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: db.assignments.map((a) => ({
    ...a,
    availableUntil: a.availableUntil ?? "",
  })),
};


const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },

    deleteAssignment: (state, action: PayloadAction<number>) => {
      state.assignments = state.assignments.filter(
        (a) => a.id !== action.payload
      );
    },

    updateAssignment: (
      state,
      action: PayloadAction<{ id: number; updated: Partial<Assignment> }>
    ) => {
      const { id, updated } = action.payload;
      state.assignments = state.assignments.map((a) =>
        a.id === id ? { ...a, ...updated } : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
