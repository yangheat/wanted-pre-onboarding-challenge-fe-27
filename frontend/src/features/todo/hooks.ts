import { Dispatch, SetStateAction, useState } from 'react'
import { TodoInputData } from '../../entities/todo/model/types'

function useTodoInputData(): [
  TodoInputData,
  Dispatch<SetStateAction<TodoInputData>>
] {
  const [todoInputData, setTodoInputData] = useState<TodoInputData>({
    title: '',
    content: '',
    priority: 'low'
  })

  return [todoInputData, setTodoInputData]
}

export { useTodoInputData }
