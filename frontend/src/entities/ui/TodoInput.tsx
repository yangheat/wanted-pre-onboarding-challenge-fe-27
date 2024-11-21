import { Dispatch, SetStateAction } from 'react'
import { TodoInputData } from '../todo/model/types'

export default function TodoInput({
  todoInputData,
  setTodoInputData
}: {
  todoInputData: TodoInputData
  setTodoInputData: Dispatch<SetStateAction<TodoInputData>>
}) {
  return (
    <>
      <input
        type="value"
        name="title"
        value={todoInputData.title}
        onChange={(e) =>
          setTodoInputData((prev) => ({ ...prev, title: e.target.value }))
        }
        autoFocus
      />
      <textarea
        name="content"
        value={todoInputData.content}
        onChange={(e) =>
          setTodoInputData((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <section style={{ display: 'flex', padding: '1rem' }}>
        <label htmlFor="urgent">urgent</label>
        <input
          type="radio"
          id="urgent"
          name="priority"
          value="urgent"
          checked={todoInputData.priority === 'urgent'}
          onChange={(e) =>
            setTodoInputData((prev) => ({ ...prev, priority: e.target.value }))
          }
        />
        <label htmlFor="normal">normal</label>
        <input
          type="radio"
          id="normal"
          name="priority"
          value="normal"
          checked={todoInputData.priority === 'normal'}
          onChange={(e) =>
            setTodoInputData((prev) => ({ ...prev, priority: e.target.value }))
          }
        />
        <label htmlFor="low">low</label>
        <input
          type="radio"
          id="low"
          name="priority"
          value="low"
          checked={todoInputData.priority === 'low'}
          onChange={(e) =>
            setTodoInputData((prev) => ({ ...prev, priority: e.target.value }))
          }
        />
      </section>
    </>
  )
}
