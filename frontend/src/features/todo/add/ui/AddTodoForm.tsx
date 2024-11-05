import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react'
import { Todo } from '../../../../entities/todo/model/types'

export default function AddTodoForm({
  setTodos
}: {
  setTodos: Dispatch<SetStateAction<Todo[]>>
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const token = localStorage.getItem('sessionToken')

  function resetInput() {
    setTitle('')
    setContent('')
  }

  function handleCreate() {
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {})
      },
      body: JSON.stringify({ title, content })
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos((todos) => [...todos, result.data])
      })
    resetInput()
  }

  return (
    <>
      <h1>Todo Create</h1>
      <section style={{ display: 'inline-grid' }}>
        <input
          type="value"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.code !== 'Enter') return
            handleCreate()
          }}
        />
        <section>
          <button onClick={handleCreate}>생성</button>
          <button onClick={resetInput}>초기화</button>
        </section>
      </section>
    </>
  )
}
