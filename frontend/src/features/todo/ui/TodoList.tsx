import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authController } from '../../../entities/auth'
import { useNavigate } from 'react-router-dom'
import { todosQuery } from '../../../entities/todo/routes/todos'

const auth = new authController()
const token = auth.getToken()
const headers = { ...(token ? { Authorization: token } : {}) }

async function deleteTodo(id: string) {
  return fetch(`http://localhost:8080/todos/${id}`, {
    method: 'DELETE',
    headers
  })
    .then((response) => response.json())
    .then((result) => result)
}

export default function TodoList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: todos } = useQuery(todosQuery)

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  function handleRemoveButtonClick(id: string) {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteTodoMutation.mutate(id)
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      {todos &&
        todos.map((todo) => (
          <section key={todo.id} style={{ display: 'flex' }}>
            <li
              onClick={() => navigate(`/todo/${todo.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {todo.title}
            </li>
            <button onClick={() => handleRemoveButtonClick(todo.id)}>
              삭제
            </button>
          </section>
        ))}
    </>
  )
}
