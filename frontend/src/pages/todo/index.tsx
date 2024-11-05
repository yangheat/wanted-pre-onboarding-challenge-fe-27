import { useEffect, useState } from 'react'
import AddTodoForm from '../../features/todo/add/ui/AddTodoForm'
import type { Todo, TodoEditContent } from '../../entities/todo/model/types'
import TodoList from '../../features/todo/add/ui/TodoList'
import TodoDetail from '../../features/todo/add/ui/TodoDetail'
import { authController } from '../../entities/auth'

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedTodo, setSelectedTodo] = useState<TodoEditContent>({})
  const auth = new authController()
  const token = auth.getToken()

  useEffect(() => {
    fetch('http://localhost:8080/todos', {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: token } : {})
      }
    })
      .then((response) => response.json())
      .then((result) => setTodos(result.data))
    console.log('useEffect')
    // 초기 렌더링 시에만 리스트를 불러오기 때문에 headers에 의존성을 가지지 않음.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AddTodoForm setTodos={setTodos} />
      <hr />
      <section style={{ display: 'flex' }}>
        <section
          style={{ width: '50%', marginLeft: '1rem', borderRight: '1px solid' }}
        >
          <TodoList todos={todos} setSelectedTodo={setSelectedTodo} />
        </section>
        <section style={{ width: '50%', marginLeft: '1rem' }}>
          <TodoDetail
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
            setTodos={setTodos}
          />
        </section>
      </section>
    </>
  )
}
