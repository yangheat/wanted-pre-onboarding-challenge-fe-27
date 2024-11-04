import { Dispatch, SetStateAction, useState } from 'react'
import { Todo, TodoEditContent } from '../../../../entities/todo/model/types'

export default function TodoDetail({
  selectedTodo,
  setSelectedTodo,
  setTodos
}: {
  selectedTodo: TodoEditContent
  setSelectedTodo: Dispatch<SetStateAction<TodoEditContent>>
  setTodos: Dispatch<SetStateAction<Todo[]>>
}) {
  const [title, setTitle] = useState<string | undefined>('')
  const [content, setContent] = useState<string | undefined>('')
  const [isEdit, setIsEdit] = useState(false)

  const token = localStorage.getItem('sessionToken')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {})
  }

  function handleSaveButtonClick() {
    fetch(`http://localhost:8080/todos/${selectedTodo.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ title, content })
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.details) {
          alert(result.details)
          return
        }

        alert('정상적으로 수정하였습니다.')
        setSelectedTodo(result.data)
        setIsEdit(false)
        setTodos((todos) => {
          return todos.map((todo) =>
            todo.id === result.data.id ? result.data : todo
          )
        })
      })
  }

  function handleRemoveButtonClick() {
    const id = selectedTodo.id
    if (!confirm('정말 삭제하시겠습니까?')) {
      return
    }

    fetch(`http://localhost:8080/todos/${id}`, {
      method: 'DELETE',
      headers
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.details) {
          alert(result.details)
          return
        }

        setTodos((todos) => todos.filter((todo) => todo.id !== id))
        setSelectedTodo({})
        alert('정상적으로 삭제하였습니다.')
      })
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
                setTitle(selectedTodo.title)
                setContent(selectedTodo.content)
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
