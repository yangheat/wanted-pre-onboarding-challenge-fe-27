import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/index.tsx'
import Signup from './pages/signup/index.tsx'
import Todo from './pages/todo/index.tsx'

const router = createBrowserRouter([{
  path: '/',
  element: <Login />
}, {
  path: '/login',
  element: <Login />
}, {
  path: '/signup',
  element: <Signup />
}, {
  path: '/todo',
  element: <Todo />
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
