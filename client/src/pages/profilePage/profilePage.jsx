import './profilePage.css'
import ImageComponent from '../../components/image/ImageComponent'
import { useState } from 'react'
import Collections from '../../components/collections/collections'
import Gallery from '../../components/gallery/gallery'

const ProfilePage = () => {
  const [type, setType] = useState("saved")
  return (
    <div className='profilePage'>
      <ImageComponent 
      className={'profileImage'} 
      path={'/general/noAvatar.png'}
      w={100}
      h={100}
       />
      <h1 className="profileName">John Doe</h1>
      <span className="profileUsername">@johndoe</span>
      <div className="followCounts">3 followers . 34 following</div>
      <div className="profileInteractions">
        <ImageComponent path={'/general/share.svg'} />
        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <ImageComponent path={'/general/more.svg'}/>
      </div>
      <div className="profileOptions">
        <span onClick={()=> setType("created")} className={type === "created" ? "active" : ""}>Created</span>
        <span onClick={()=> setType("saved")} className={type === "saved" ? "active" : ""}>Saved</span>
      </div>
      {type === "created" ? <Gallery/> : <Collections/>}
    </div>
  )
}

export default ProfilePage