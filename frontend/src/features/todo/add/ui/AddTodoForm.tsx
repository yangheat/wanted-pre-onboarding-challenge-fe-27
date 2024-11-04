import { KeyboardEvent, useState } from 'react'

export default function AddTodoForm({
  handleCreateButtonClick
}: {
  handleCreateButtonClick: (title: string, content: string) => void
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function resetInput() {
    setTitle('')
    setContent('')
  }

  function handleCreate() {
    handleCreateButtonClick(title, content)
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
