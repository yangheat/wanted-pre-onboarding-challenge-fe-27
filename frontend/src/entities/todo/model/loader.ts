import { QueryClient } from "@tanstack/react-query"
import { queries } from "./query"

const queryClient = new QueryClient()

const todosLoader = async () => {
  await Promise.all(Object.values(queries).map(query => queryClient.prefetchQuery(query)))

  return Object.keys(queries).reduce((result, query) => {
    return { ...result, [query]: queryClient.getQueryData([query]) }
  }, {})

  // return Object.fromEntries(
  //   Object.keys(queries).map(query => [query, queryClient.getQueryData([query])])
  // )
}

export { todosLoader }