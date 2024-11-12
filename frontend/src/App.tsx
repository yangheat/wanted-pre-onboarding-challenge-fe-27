import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
