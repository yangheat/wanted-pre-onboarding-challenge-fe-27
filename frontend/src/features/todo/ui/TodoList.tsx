import { Fragment } from 'react/jsx-runtime'
import { Todo, TodoEditContent } from '../../../entities/todo/model/types'
import { Dispatch, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authController } from '../../../entities/auth'

const auth = new authController()
const token = auth.getToken()

async function fetchTodos(): Promise<Todo[]> {
  return fetch('http://localhost:8080/todos', {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: token } : {})
    }
  })
    .then((response) => response.json())
    .then((result) => result.data || [])
}

export default function TodoList({
  setSelectedTodo
}: {
  setSelectedTodo: Dispatch<SetStateAction<TodoEditContent>>
}) {
  const {
    data: todos,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>
  }

  return (
    <>
      <h1>Todo List</h1>
      {todos &&
        todos.map((todo) => (
          <Fragment key={todo.id}>
            <li
              onClick={() => setSelectedTodo({ ...todo, isEdit: false })}
              style={{ cursor: 'pointer' }}
            >
              {todo.title}
            </li>
          </Fragment>
        ))}
    </>
  )
}
