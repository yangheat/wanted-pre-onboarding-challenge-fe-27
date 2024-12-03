import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './entities/todo/model/loader'

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  )
}
