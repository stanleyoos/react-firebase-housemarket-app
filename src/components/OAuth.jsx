import { toast } from 'react-toastify'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import googleIcon from '../assets/svg/googleIcon.svg'
import { db } from '../firebase.config'
import { async } from '@firebase/util'

const OAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleAuth = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // if user doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error("Couldn't authorize with Google")
    }
  }
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-in' ? 'in' : 'up'} with </p>
      <button className="socialIconDiv" onClick={onGoogleAuth}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth
