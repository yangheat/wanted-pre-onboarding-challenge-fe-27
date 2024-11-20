import { authController } from "../../auth"
import { Todo } from "../model/types"

const auth = new authController()
const token = auth.getToken()
const headers = { ...(token ? { Authorization: token } : {}) }

async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch('http://localhost:8080/todos', { headers })
    const result = await response.json()

    return result.data || []
}

export { fetchTodos }