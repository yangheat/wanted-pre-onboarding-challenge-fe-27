import { fetchTodo, fetchTodos } from "../api/todos";

function todos() {
  return {
    queryKey: ['todos'],
    queryFn: fetchTodos
  }
}

function todo(id: string) {
  return {
    queryKey: ['todo', id],
    queryFn: () => fetchTodo(id)
  }
}

export { todos, todo }