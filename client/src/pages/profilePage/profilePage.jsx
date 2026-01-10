import './profilePage.css'
import ImageComponent from '../../components/image/ImageComponent'
import { useState } from 'react'
import Boards from '../../components/boards/boards'
import Gallery from '../../components/gallery/gallery'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'
import { useParams } from 'react-router'
import FollowButton from './FollowButton'

const ProfilePage = () => {
  const [type, setType] = useState("saved")

   const {username} = useParams()

  const {isPending, error, data} = useQuery({
    queryKey: ["profile", username],
    queryFn: ()=> apiRequest.get(`/user/${username}`).then((res)=> res.data)
    }
    )

    if (isPending) return "Loading..."
    if (error) return "An error has occurred" + error.message
    if (!data) return "User not found "

    // console.log(data);

  return (
    <div className='profilePage'>
      <ImageComponent 
      className={'profileImage'} 
      path={data.img || '/general/noAvatar.png'}
      w={100}
      h={100}
       />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsername">@{data.username}</span>
      <div className="followCounts">{data.followerCount} {data.followerCount === 0 || data.followerCount === 1 ? "follower" : "followers"} . {data.followingCount} following</div>
      <div className="profileInteractions">
        <ImageComponent path={'/general/share.svg'} />
        <div className="profileButtons">
          <button>Message</button>
          <FollowButton isFollowing={data.isFollowing} username={data.username} />
        </div>
        <ImageComponent path={'/general/more.svg'}/>
      </div>
      <div className="profileOptions">
        <span onClick={()=> setType("created")} className={type === "created" ? "active" : ""}>Created</span>
        <span onClick={()=> setType("saved")} className={type === "saved" ? "active" : ""}>Saved</span>
      </div>
      {type === "created" ? <Gallery userId={data._id} /> : <Boards userId={data._id} />}
    </div>
  )
}

export default ProfilePage