import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../contexts/auth'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}
