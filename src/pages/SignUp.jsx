import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

  const navigate = useNavigate()

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

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredentials.user

      // Updates a user's profile data
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // copy the state, delete password field and add the timestamp
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      // send new user to the database
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      // navigate to the homepage
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong')
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
            type="text"
            value={name}
            id="name"
            placeholder="Name"
            className="nameInput"
            onChange={handleChange}
          />
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

            <div className="signUpBar">
              <p className="signUpText">Sign up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="ffffff" width="34px" height="34px" />
              </button>
            </div>
          </div>
        </form>

        <OAuth />

        <Link to="/sign-in" className="registerLink">
          Sign in instead
        </Link>
      </div>
    </>
  )
}

export default SignUp
