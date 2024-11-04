import { Fragment } from "react/jsx-runtime";
import { Todo, TodoEditContent } from "../../../../entities/todo/model/types";
import { Dispatch, SetStateAction } from "react";

export default function TodoList({ todos, setTodoDetail }: { todos: Todo[], setTodoDetail: Dispatch<SetStateAction<TodoEditContent | null | undefined>> }) {
  return (
    <>
      <h1>Todo List</h1>
      {todos.length > 0 &&
        todos.map((todo) => (
          <Fragment key={todo.id}>
            <li
              onClick={() => setTodoDetail({ ...todo, isEdit: false })}
              style={{ cursor: 'pointer' }}
            >
              {todo.title}
            </li>
          </Fragment>
        ))}
    </>
  )
}