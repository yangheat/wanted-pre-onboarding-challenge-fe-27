import { authController } from "../../auth"
import { Todo, TodoEditInputData, TodoInputData } from "../model/types"

const auth = new authController()

function getHeaders() {
  const headers = {}

  if (auth.getToken()) {
    Object.assign(headers, { Authorization: auth.getToken() })
  }

  return headers
}

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('http://localhost:8080/todos', {
    headers: getHeaders()
  })
  const result = await response.json()

  return result.data || []
}

async function fetchTodo(id: string): Promise<Todo> {
  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    headers: getHeaders()
  })
  const result = await response.json()

  return result.data
}

async function addTodo(params: TodoInputData) {
  return fetch('http://localhost:8080/todos', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((result) => result)
}

async function editTodo(params: TodoEditInputData) {
  return fetch(`http://localhost:8080/todos/${params.id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((result) => result)
}

async function deleteTodo(id: string) {
  return fetch(`http://localhost:8080/todos/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })
    .then((response) => response.json())
    .then((result) => result)
}

export { fetchTodos, fetchTodo, addTodo, editTodo, deleteTodo }