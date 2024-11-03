import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Login from './pages/login/index.tsx'
import Signup from './pages/signup/index.tsx'
import Todo from './pages/todo/index.tsx'

function authLoader() {
  if (!localStorage.getItem('sessionToken')) {
    return redirect('/login')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Todo />,
    loader: authLoader
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/todo',
    element: <Todo />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
