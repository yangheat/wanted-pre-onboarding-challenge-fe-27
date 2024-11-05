import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import Todo from './pages/todo/index.tsx'
import Login from './pages/auth/login/index.tsx'
import Signup from './pages/auth/signup/index.tsx'

function authLoader() {
  if (!localStorage.getItem('sessionToken')) {
    return redirect('/auth/login')
  }
  return null
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Todo />,
    loader: authLoader,
    children: [
      {
        path: '*',
        element: <Navigate to="/auth/login" replace />
      }
    ]
  },
  {
    path: '/auth',
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  }
])
