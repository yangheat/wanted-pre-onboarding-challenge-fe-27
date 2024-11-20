import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import Todo from './pages/todo/index.tsx'
import Login from './pages/auth/login/index.tsx'
import Signup from './pages/auth/signup/index.tsx'
import { authController } from './entities/auth/index.ts'
import TodoDetail from './pages/todo/[id]/index.tsx'
import { todosLoader } from './entities/todo/model/loader.ts'


function authLoader() {
  const auth = new authController()
  if (!auth.getToken()) {
    return redirect('/auth/login')
  }
  return null
}

export const router = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/todo" replace />,
        loader: todosLoader
      },
      {
        path: '/todo',
        children: [
          {
            index: true,
            element: <Todo />
          },
          {
            path: ':id',
            element: <TodoDetail />
          }
        ]
      },
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
