import { useState } from 'react'
import AddTodoForm from '../../features/todo/ui/AddTodoForm'
import type { Todo, TodoEditContent } from '../../entities/todo/model/types'
import TodoList from '../../features/todo/ui/TodoList'
import TodoDetail from '../../features/todo/ui/TodoDetail'
import { authController } from '../../entities/auth'
import { useQuery } from '@tanstack/react-query'

const auth = new authController()
const token = auth.getToken()

// TODO: tanstack-query defer를 이용하여 <Suspense를 사용해보자.
// export async function todoPageLoader() {
//   const todos = await QueryClient.ensureQueryData({
//     queryKey: ['todo'],
//     queryFn: getTodo
//   })

//   return { todos }
// }

// const fetchTodos = async (): Promise<Todo[]> => {
//   const response = await fetch('http://localhost:8080/todos', {
//     headers: {
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: token } : {})
//     }
//   })

//   if (!response.ok) {
//     throw new Error('Failed to fetch todos')
//   }

//   const result = await response.json()
//   return result.data

// const { fastTOdo, slow} = useLoaderData()
/**
 * <Suspense>
 * <Await>...</Awiat>
 * {/* <AddTodoForm setTodos={setTodos} />
 */

async function fetchTodos() {
  return fetch('http://localhost:8080/todos', {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: token } : {})
    }
  })
    .then((response) => response.json())
    .then((result) => result.data)
}

export default function Todo() {
  const [selectedTodo, setSelectedTodo] = useState<TodoEditContent>({})
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
      <AddTodoForm />
      <section style={{ display: 'flex' }}>
        <section
          style={{ width: '50%', marginLeft: '1rem', borderRight: '1px solid' }}
        >
          <TodoList todos={todos} setSelectedTodo={setSelectedTodo} />
        </section>
        <section style={{ width: '50%', marginLeft: '1rem' }}>
          <TodoDetail
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        </section>
      </section>
    </>
  )
}
