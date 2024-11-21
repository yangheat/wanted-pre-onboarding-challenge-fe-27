import { fetchTodo, fetchTodos } from "../api/todos"
import { Todo } from "./types"

const queryOptions = <T>(queryKey: string[], queryFn: () => Promise<T>, options?: {enabled: boolean, suspense: boolean}) => ({
  queryKey, queryFn, ...options
})

const todosQuery = () => queryOptions<Todo[]>(['todos'], fetchTodos)

const todoQuery = (id: string) => queryOptions<Todo>(['todo', id], () => fetchTodo(id), { enabled: !!id, suspense: true })

export { todosQuery, todoQuery }