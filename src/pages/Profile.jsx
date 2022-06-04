import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const logOut = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      toast.error('Error with updating profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My profile</p>
        <button className="logOut" type="button" onClick={logOut}>
          Log out
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal details</p>
          <p
            className="changePersonalDetails"
            // if changeDetails is true, execute onSubmit function as well
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={changeDetails ? 'profileNameActive' : 'profileName'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={changeDetails ? 'profileEmailActive' : 'profileEmail'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile
