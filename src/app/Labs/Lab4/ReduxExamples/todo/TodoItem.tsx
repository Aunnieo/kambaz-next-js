import React from "react";
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: any) {
  const dispatch = useDispatch();

  if (!todo) return null; // ⭐ Prevents crash

  return (
    <ListGroupItem className="d-flex align-items-center gap-2">
      <Button
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
        size="sm"
      >
        Delete
      </Button>

      <Button
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
        size="sm"
      >
        Edit
      </Button>

      <span>{todo.title}</span>
    </ListGroupItem>
  );
}
