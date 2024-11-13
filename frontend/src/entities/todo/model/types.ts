export interface Todo {
  id: string
  title: string
  content: string
  priority: string
  createAt: string
  updateAt: string
}

export interface TodoInputData {
  title: string
  content: string
  priority: string
}

export interface TodoEditInputData extends TodoInputData {
  id: string
}
