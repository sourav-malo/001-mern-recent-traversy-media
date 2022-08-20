import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <button className='btn' onClick={onLogout}>
            Logout 
          </button>
        ) : (
          <>
            <li>
              <Link to='login'>
                <FaSignInAlt/>
                Login
              </Link>
            </li>
            <li>
              <Link to='register'>
                <FaUser/>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Header 