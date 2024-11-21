import { FormEvent } from 'react'
import { authController } from '../../../entities/auth'
import { Todo } from '../../../entities/todo/model/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TodoInput from '../../../entities/ui/TodoInput'
import { useTodoInputData } from '../hooks'

export default function AddTodoForm() {
  const [todoInputData, setTodoInputData] = useTodoInputData()

  const queryClient = useQueryClient()
  const auth = new authController()
  const token = auth.getToken()

  function resetInput() {
    setTodoInputData({
      title: '',
      content: '',
      priority: 'low'
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    addTodoMutation.mutate(todoInputData)
  }

  async function addTodo(params: {
    title: string
    content: string
    priority: string
  }): Promise<Todo> {
    return fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        ...(token ? { Authorization: token } : {})
      },
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((result) => result)
  }

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      resetInput()
    }
  })

  return (
    <>
      <h1>Todo Create</h1>
      <form onSubmit={handleSubmit}>
        <section style={{ display: 'inline-grid' }}>
          <TodoInput
            todoInputData={todoInputData}
            setTodoInputData={setTodoInputData}
          />
          <section>
            <button type="submit">생성</button>
            <button type="button" onClick={resetInput}>
              초기화
            </button>
          </section>
        </section>
      </form>
    </>
  )
}
