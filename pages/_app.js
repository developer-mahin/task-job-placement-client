import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AuthProvider from '../context/AuthProvider'
import '../styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <div className=''>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar></Navbar>
          <Component {...pageProps} />
          <Footer></Footer>
        </AuthProvider>
        <Toaster></Toaster>
      </QueryClientProvider>
    </div>
  )
}
