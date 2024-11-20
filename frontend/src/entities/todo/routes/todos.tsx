import { QueryClient } from "@tanstack/react-query"
import { fetchTodos } from "../api/todos"

const queryClient = new QueryClient()

export const todosQuery = {
    queryKey: ['todos'],
    queryFn: fetchTodos
}

export const todosLoader = () => {
    const query = todosQuery
    return (
        queryClient.getQueryData(query.queryKey) ??
        queryClient.fetchQuery(query)
    )
}