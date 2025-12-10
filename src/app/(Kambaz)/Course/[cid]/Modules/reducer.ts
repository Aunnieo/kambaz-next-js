import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as dbModules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Lesson {
  _id: string;
  name: string;
  description?: string;
}

export interface ModuleType {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean; // used when renaming module
}

interface ModulesState {
  modules: ModuleType[];
}

const initialState: ModulesState = {
  modules: dbModules.map((m: any) => ({
    ...m,
    editing: false,
  })),
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      action: PayloadAction<{ name: string; course: string }>
    ) => {
      state.modules.push({
        _id: uuidv4(),
        name: action.payload.name,
        description: "",
        course: action.payload.course,
        lessons: [],
        editing: false,
      });
    },

    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    updateModule: (state, action: PayloadAction<ModuleType>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },

    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },

    addLesson: (
      state,
      action: PayloadAction<{ moduleId: string; name: string }>
    ) => {
      const { moduleId, name } = action.payload;
      state.modules = state.modules.map((m) =>
        m._id === moduleId
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                {
                  _id: uuidv4(),
                  name,
                  description: "",
                },
              ],
            }
          : m
      );
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  editModule,
  addLesson,
} = modulesSlice.actions;

export default modulesSlice.reducer;
