import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "", title: "" },
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload.title || "",
      });
      state.todo = { id: "", title: "" };
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      state.todo = { id: "", title: "" };
    },

    setTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
