import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AuthProvider from '../context/AuthProvider'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className=''>
      <AuthProvider>
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Footer></Footer>
      </AuthProvider>
    </div>
  )
}
