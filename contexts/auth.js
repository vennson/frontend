import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  })
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  })
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const loginUser = async (username, password) => {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    const data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      router.push('/')
    } else {
      alert('Something went wrong!')
    }
  }

  const registerUser = async (username, password, password2) => {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        password2,
      }),
    })
    if (response.status === 201) {
      router.push('/login')
    } else {
      alert('Something went wrong!')
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    router.push('/')
  }

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  }

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access))
    }
    setLoading(false)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
  )
}
