import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

const SignIn = () => {
  // toggle type of input from text to password
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  // handleChange was used in both email and password field
  // change the state depended on id of the field
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      // check if user exists with auth getAuth function
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      // log in and navigate to home page
      if (userCredentials.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Invalid user data')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            id="email"
            placeholder="Email"
            className="emailInput"
            onChange={handleChange}
          />
          <div className="passwordInputDiv">
            <input
              className="passwordInput"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              id="password"
              onChange={handleChange}
            />

            <img
              src={visibilityIcon}
              alt="show"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot password
            </Link>

            <div className="signInBar">
              <p className="signInText">Sign in</p>
              <button className="signInButton">
                <ArrowRightIcon fill="ffffff" width="34px" height="34px" />
              </button>
            </div>
          </div>
        </form>

        <OAuth />

        <Link to="/sign-up" className="registerLink">
          Sign up instead
        </Link>
      </div>
    </>
  )
}

export default SignIn
