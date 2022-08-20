import { FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset, register } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isSuccess, isError, navigate, dispatch])

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = { name, email, password }
      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser/> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text" 
              className="form-control"
              id="name"  
              name="name"
              placeholder="Enter your name"
              onChange={onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your email'
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter password'
              onChange={onChange}
              value={password}
            />
          </div>
          <div className='form-group'>
            <input 
              type='password' 
              className='form-control'
              id='password2'
              name='password2'
              placeholder='Confirm password'
              onChange={onChange}
              value={password2}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register