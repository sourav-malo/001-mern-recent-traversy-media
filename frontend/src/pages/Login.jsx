import { FaSignInAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isSuccess, isError, dispatch, navigate])

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    const userData = { email, password }
    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Login and start creating goals</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              type='text' 
              name='email'
              id='email'
              placeholder='Enter your email'
              onChange={onChange}
              value={email}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter your password'
              onChange={onChange}
              value={password}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login