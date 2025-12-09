import React from "react";
import { FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  const safeTodo = todo || { id: "", title: "" }; // ⭐ prevents crashes

  return (
    <div className="mb-3">
      <div className="d-flex gap-2 mb-2">
        <Button onClick={() => dispatch(addTodo(safeTodo))} id="wd-add-todo-click">
          Add
        </Button>

        <Button onClick={() => dispatch(updateTodo(safeTodo))} id="wd-update-todo-click">
          Update
        </Button>
      </div>

      <FormControl
        value={safeTodo.title}
        onChange={(e) =>
          dispatch(setTodo({ ...safeTodo, title: e.target.value }))
        }
      />
    </div>
  );
}
