import { QueryClient } from "@tanstack/react-query"
import { todo, todos } from "./query"
import { Todo } from "./types"
import { LoaderFunctionArgs } from "react-router-dom"

const queryClient = new QueryClient()

const loaderQueryData = async <T>(queryKey: string[], options: {
  queryKey: string[];
  queryFn: () => Promise<T>;
}): Promise<{ [key: string]: T }> => {
  const cached = queryClient.getQueryData(queryKey) as T
  if (cached) {
    return {
      [queryKey[0]]: cached
    }
  }

  await queryClient.prefetchQuery(options)
  return {
    [queryKey[0]]: queryClient.getQueryData(queryKey) as T
  }
}

const todosLoader = () => loaderQueryData<Todo[]>(['todos'], todos())

const todoLoader = ({ params }: LoaderFunctionArgs) => {
  const id = params.id as string

  return loaderQueryData<Todo>(['todo', id], todo(id))
}
export { queryClient, todosLoader, todoLoader }