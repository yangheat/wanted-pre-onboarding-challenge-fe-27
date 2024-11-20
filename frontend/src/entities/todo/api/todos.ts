import { authController } from "../../auth"
import { Todo } from "../model/types"

const auth = new authController()

async function fetchTodos(): Promise<Todo[]> {
  const token = auth.getToken();
  const response = await fetch('http://localhost:8080/todos', {
    headers: { ...(token && { Authorization: token }) }
  })
  const result = await response.json()

  return result.data || []
}

export { fetchTodos }