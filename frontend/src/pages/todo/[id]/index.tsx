import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authController } from '../../../entities/auth'
import { Todo } from '../../../entities/todo/model/types'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const auth = new authController()
const token = auth.getToken()

async function fetchTodo(id: string | undefined): Promise<Todo> {
  return fetch(`http://localhost:8080/todos/${id}`, {
    headers: {
      ...(token ? { Authorization: token } : {})
    }
  })
    .then((response) => response.json())
    .then((result) => result.data)
}

async function editTodo(params: {
  id: string
  title: string
  content: string
}) {
  return fetch(`http://localhost:8080/todos/${params.id}`, {
    method: 'PUT',
    headers: {
      ...(token ? { Authorization: token } : {})
    },
    body: JSON.stringify({ title: params.title, content: params.content })
  })
    .then((response) => response.json())
    .then((result) => result)
}

export default function TodoDetail() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const id = useParams().id || ''
  const queryClient = useQueryClient()

  const {
    data: todo,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: [`todos-${id}`],
    queryFn: () => fetchTodo(id)
  })

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      setIsEdit(false)
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({ queryKey: [`todos-${id}`] })
    }
  })

  function handleSaveButtonClick() {
    editTodoMutation.mutate({ id, title, content })
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>
  }

  return (
    <>
      <h1>Todo Detail</h1>

      {isEdit ? (
        <>
          <button onClick={handleSaveButtonClick}>저장</button>
          <button onClick={() => setIsEdit(false)}>취소</button>
          <section>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </section>
          <section>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </section>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setIsEdit(!isEdit)
              setTitle(todo?.title || '')
              setContent(todo?.content || '')
            }}
          >
            수정
          </button>
          <p>{todo?.title}</p>
          <p>{todo?.content}</p>
        </>
      )}
    </>
  )
}
