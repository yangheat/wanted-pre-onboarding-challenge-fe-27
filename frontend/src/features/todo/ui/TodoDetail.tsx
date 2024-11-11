import { Dispatch, SetStateAction, useState } from 'react'
import { TodoEditContent } from '../../../entities/todo/model/types'
import { authController } from '../../../entities/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function TodoDetail({
  selectedTodo,
  setSelectedTodo
}: {
  selectedTodo: TodoEditContent
  setSelectedTodo: Dispatch<SetStateAction<TodoEditContent>>
}) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isEdit, setIsEdit] = useState(false)
  const queryClient = useQueryClient()
  const auth = new authController()
  const token = auth.getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {})
  }

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: (result) => {
      setSelectedTodo(result.data)
      setIsEdit(false)
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      setSelectedTodo({})
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  async function editTodo(params: { title: string; content: string }) {
    return fetch(`http://localhost:8080/todos/${selectedTodo.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((result) => result)
  }

  async function deleteTodo() {
    return fetch(`http://localhost:8080/todos/${selectedTodo.id}`, {
      method: 'DELETE',
      headers
    })
      .then((response) => response.json())
      .then((result) => result)
  }

  function handleSaveButtonClick() {
    editTodoMutation.mutate({ title, content })
  }

  function handleRemoveButtonClick() {
    const id = selectedTodo.id

    if (!id) {
      return
    }

    if (confirm('정말 삭제하시겠습니까?')) {
      deleteTodoMutation.mutate()
    }
  }

  return (
    <>
      <h1>Todo Detail</h1>
      {Object.keys(selectedTodo).length > 0 &&
        (isEdit ? (
          <>
            <button onClick={handleSaveButtonClick}>저장</button>
            <button
              onClick={() => {
                setIsEdit(false)
              }}
            >
              취소
            </button>
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
                setIsEdit(true)
                setTitle(selectedTodo.title || '')
                setContent(selectedTodo.content || '')
              }}
            >
              수정
            </button>
            <button onClick={handleRemoveButtonClick}>삭제</button>
            <p>{selectedTodo.title}</p>
            <p>{selectedTodo.content}</p>
          </>
        ))}
    </>
  )
}
