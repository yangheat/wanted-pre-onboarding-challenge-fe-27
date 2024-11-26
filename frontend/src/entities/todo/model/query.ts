import { fetchTodos } from "../api/todos";

type Query = {
  queryKey: string[]
  queryFn: () => Promise<any>
}

export const queries: Record<string, Query> = {
  todos: {
    queryKey: ['todos'],
    queryFn: fetchTodos
  }
}