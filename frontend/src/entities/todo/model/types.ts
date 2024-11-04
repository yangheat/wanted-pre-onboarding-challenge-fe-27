export interface Todo {
  id: string
  title: string
  content: string
  createAt: string
  updateAt: string
}

export interface TodoEditContent extends Todo {
  isEdit: boolean
}