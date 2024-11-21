import { FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo } from '../../../entities/todo/api/todos'
import TodoInput from '../../../entities/ui/TodoInput'
import { useTodoInputData } from '../hooks'

export default function AddTodoForm() {
  const [todoInputData, setTodoInputData] = useTodoInputData()

  const queryClient = useQueryClient()

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
