import { useState } from 'react'
import AddTodoForm from '../../features/todo/ui/AddTodoForm'
import type { Todo, TodoEditContent } from '../../entities/todo/model/types'
import TodoList from '../../features/todo/ui/TodoList'
import TodoDetail from '../../features/todo/ui/TodoDetail'

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

export default function Todo() {
  const [selectedTodo, setSelectedTodo] = useState<TodoEditContent>({})

  return (
    <>
      <AddTodoForm />
      <section style={{ display: 'flex' }}>
        <section
          style={{ width: '50%', marginLeft: '1rem', borderRight: '1px solid' }}
        >
          <TodoList setSelectedTodo={setSelectedTodo} />
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
