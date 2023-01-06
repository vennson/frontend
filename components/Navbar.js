import { useContext } from 'react'
import Link from 'next/link'
import AuthContext from '../contexts/auth'

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  return (
    <nav>
      <div>
        <h1>App Name</h1>
        <div>
          {user ? (
            <>
              <Link href='/'>Home</Link>
              <Link href='/protected'>Protected Page</Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <Link href='/login'>Login</Link>
              <Link href='/register'>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
