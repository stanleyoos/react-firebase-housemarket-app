import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { async } from '@firebase/util'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail((prevState) => e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.info('email was sent')
    } catch (error) {
      toast.error('something went wrong')
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="emailInput"
            value={email}
            onChange={onChange}
            id="email"
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Sign in
          </Link>

          <div className="signInBar">
            <div className="signInText">Send reset link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
