import { fetchTodos } from "../api/todos"
import { Todo } from "./types"

const queryOptions = <T>(queryKey: string[], queryFn: () => Promise<T>) => ({queryKey, queryFn})

const todosQuery = () => queryOptions<Todo[]>(['todos'], fetchTodos)

export { todosQuery }