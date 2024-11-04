import { Fragment, useEffect, useState } from 'react'
import AddTodoForm from '../../features/todo/add/ui/AddTodoForm'

interface Todo {
  id: string
  title: string
  content: string
  createAt: string
  updateAt: string
}

interface TodoEditContent extends Todo {
  isEdit: boolean
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [todoDetail, setTodoDetail] = useState<TodoEditContent | null>()
  const token = localStorage.getItem('sessionToken')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {})
  }

  function handleCreateButtonClick(title: string, content: string) {
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, content })
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos([...todos, result.data])
      })
  }

  function handleSaveButtonClick() {
    if (!todoDetail) return

    fetch(`http://localhost:8080/todos/${todoDetail.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ title: editTitle, content: editContent })
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.details) {
          alert(result.details)
          return
        }

        alert('정상적으로 수정하였습니다.')
        setTodoDetail({ ...result.data, isEdit: false })
        setTodos(() => {
          return todos.map((todo) =>
            todo.id === result.data.id ? result.data : todo
          )
        })
      })
  }

  function handleRemoveButtonClick() {
    const id = todoDetail?.id
    if (!id && !confirm('정말 삭제하시겠습니까?')) {
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
        setTodos(todos.filter((todo) => todo.id !== id))
        setTodoDetail(null)
        alert('정상적으로 삭제하였습니다.')
      })
  }

  useEffect(() => {
    fetch('http://localhost:8080/todos', { headers })
      .then((response) => response.json())
      .then((result) => setTodos(result.data))
    console.log('useEffect')
    // 초기 렌더링 시에만 리스트를 불러오기 때문에 headers에 의존성을 가지지 않음.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AddTodoForm handleCreateButtonClick={handleCreateButtonClick} />
      <hr />
      <section style={{ display: 'flex' }}>
        <section
          style={{ width: '50%', marginLeft: '1rem', borderRight: '1px solid' }}
        >
          <h1>Todo List</h1>
          {todos.length > 0 &&
            todos.map((todo) => (
              <Fragment key={todo.id}>
                <li
                  onClick={() => setTodoDetail({ ...todo, isEdit: false })}
                  style={{ cursor: 'pointer' }}
                >
                  {todo.title}
                </li>
              </Fragment>
            ))}
        </section>
        <section style={{ width: '50%', marginLeft: '1rem' }}>
          <h1>Todo Detail</h1>

          {todoDetail && (
            <>
              {todoDetail.isEdit ? (
                <>
                  <button onClick={handleSaveButtonClick}>저장</button>
                  <button
                    onClick={() =>
                      setTodoDetail({ ...todoDetail, isEdit: false })
                    }
                  >
                    취소
                  </button>
                  <section>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    ></input>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    ></textarea>
                  </section>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setTodoDetail({ ...todoDetail, isEdit: true })
                      setEditTitle(todoDetail.title)
                      setEditContent(todoDetail.content)
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => handleRemoveButtonClick()}>
                    삭제
                  </button>
                  <p>{todoDetail.title}</p>
                  <p>{todoDetail.content}</p>
                </>
              )}
            </>
          )}
        </section>
      </section>
    </>
  )
}
