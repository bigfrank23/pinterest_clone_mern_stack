import { useState } from 'react'
import './userButton.css'
import ImageComponent from '../image/ImageComponent'

const UserButton = () => {
    const [open, setOpen] = useState(false)
    // Temp user
  const currentUser = true

  return currentUser ?  (
    <div className="userButton">
        <ImageComponent path="/general/noAvatar.png" alt="" />
        <ImageComponent
        onClick={()=> setOpen((prev)=> !prev)}
         path="/general/arrow.svg" alt="" className="arrow" />
         {open && (
            <div className="userOptions">
                <div className="userOption">Profile</div>
                <div className="userOption">Settings</div>
                <div className="userOption">Logout</div>
            </div>
         )}
    </div>
  ) : (
    <a href="/" className="loginLink">
        Login / Sign up
    </a>
  )
}

export default UserButton