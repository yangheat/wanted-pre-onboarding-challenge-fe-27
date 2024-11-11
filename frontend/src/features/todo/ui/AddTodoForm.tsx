import { FormEvent, useState } from 'react'
import { authController } from '../../../entities/auth'
import { Todo } from '../../../entities/todo/model/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function AddTodoForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  const auth = new authController()
  const token = auth.getToken()

  function resetInput() {
    setTitle('')
    setContent('')
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addTodoMutation.mutate({ title, content })
  }

  async function addTodo(params: {
    title: string
    content: string
  }): Promise<Todo> {
    return fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
          <input
            type="value"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
