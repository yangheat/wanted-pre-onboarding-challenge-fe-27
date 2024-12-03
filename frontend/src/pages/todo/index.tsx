import AddTodoForm from '../../features/todo/ui/AddTodoForm'
import type { Todo } from '../../entities/todo/model/types'
import TodoList from '../../features/todo/ui/TodoList'
import TodoFilter from '../../features/todo/ui/TodoFilter'

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
  return (
    <>
      <AddTodoForm />
      <TodoFilter />
      <TodoList />
    </>
  )
}
