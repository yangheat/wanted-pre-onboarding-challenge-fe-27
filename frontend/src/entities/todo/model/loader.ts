import { QueryClient } from "@tanstack/react-query"
import { todosQuery } from "./query"

const queryClient = new QueryClient()

const todosLoader = () => {
    const query = todosQuery()
    return (
        queryClient.getQueryData(query.queryKey) ??
        queryClient.fetchQuery(query)
    )
}

export { todosLoader }