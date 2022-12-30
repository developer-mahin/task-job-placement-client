import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AuthProvider from '../context/AuthProvider'
import '../styles/globals.css'

const queryClient = new QueryClient()
export const ThemeContext = createContext(null)

export default function App({ Component, pageProps }) {

  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"))
    localStorage.setItem("theme", theme)
  }

  const themeInfo = {
    theme, setTheme, toggleTheme
  }

  return (
    <>
      <ThemeContext.Provider value={themeInfo}>
        <div className={theme} id={theme}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Navbar></Navbar>
              <Component {...pageProps} />
              <Footer></Footer>
            </AuthProvider>
            <Toaster></Toaster>
          </QueryClientProvider>
        </div>
      </ThemeContext.Provider>
    </>
  )
}
