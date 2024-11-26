import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { deleteTodo } from '../../../entities/todo/api/todos'
import { Todo } from '../../../entities/todo/model/types'

export default function TodoList() {
  const navigate = useNavigate()
  const { todos } = useLoaderData()
  console.log('todos:', todos)
  const queryClient = useQueryClient()

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
        todos.map((todo: Todo) => (
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
