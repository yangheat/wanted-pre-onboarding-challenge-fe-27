import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { todosQuery } from '../../../entities/todo/model/query'
import { deleteTodo } from '../../../entities/todo/api/todos'

export default function TodoList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: todos } = useQuery(todosQuery())

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
