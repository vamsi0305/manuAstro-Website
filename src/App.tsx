import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { routes } from '@/routes'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
})

function AppRoutes() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="page-wrapper">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
          <CartSidebar />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="light"
          toastStyle={{
            background: '#fffcf5',
            border: '1px solid #e8d5b4',
            color: '#3a1f0d',
            fontFamily: 'DM Sans, sans-serif',
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
