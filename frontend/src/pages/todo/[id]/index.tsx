import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authController } from '../../../entities/auth'
import { Todo, TodoEditInputData } from '../../../entities/todo/model/types'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTodoInputData } from '../../../features/todo/hooks'
import TodoInput from '../../../features/todo/ui/TodoInput'

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

async function editTodo(params: TodoEditInputData) {
  return fetch(`http://localhost:8080/todos/${params.id}`, {
    method: 'PUT',
    headers: {
      ...(token ? { Authorization: token } : {})
    },
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
    .then((result) => result)
}

export default function TodoDetail() {
  const [isEdit, setIsEdit] = useState(false)
  const id = useParams().id || ''
  const queryClient = useQueryClient()

  const [todoInputData, setTodoInputData] = useTodoInputData()

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
    editTodoMutation.mutate({ id, ...todoInputData })
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>
  }

  if (todo) {
    return (
      <>
        <h1>Todo Detail</h1>

        {isEdit ? (
          <section style={{ display: 'inline-grid' }}>
            <section>
              <button onClick={handleSaveButtonClick}>저장</button>
              <button onClick={() => setIsEdit(false)}>취소</button>
            </section>
            <TodoInput
              todoInputData={todoInputData}
              setTodoInputData={setTodoInputData}
            />
          </section>
        ) : (
          <>
            <button
              onClick={() => {
                setIsEdit(!isEdit)
                setTodoInputData({
                  title: todo.title,
                  content: todo.content,
                  priority: todo.priority
                })
              }}
            >
              수정
            </button>
            <p>{todo.title}</p>
            <p>{todo.content}</p>
            <p>{todo.priority}</p>
          </>
        )}
      </>
    )
  }
}
