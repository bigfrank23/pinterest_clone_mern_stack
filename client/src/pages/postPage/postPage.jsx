import { Link, useParams } from 'react-router'
import ImageComponent from '../../components/image/ImageComponent' 
import PostInteractions from '../../components/postInteractions/postInteractions'
import Comments from '../../components/comments/comments'
import './postPage.css'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'

const PostPage = () => {
  const {id} = useParams()

  const {isPending, error, data} = useQuery({
    queryKey: ["pin", id],
    queryFn: ()=> apiRequest.get(`/pins/${id}`).then((res)=> res.data)
  }
  )

   if (isPending) return "Loading..."
  if (error) return error.message
  if (!data) return "Data not found "

  // console.log(data);
  

  return (
    <div className='postPage'>
      &larr;
      <div className="postContainer">
        <div className="postImg">
          <ImageComponent path={data.media} w={736} />
        </div>
        <div className="postDetails">
          <PostInteractions/>
          <Link to={`/${data.user.username}`} className={"postUser"}>
            <ImageComponent path={data.user.img || "/general/noAvatar.png"} />
            <span>{data.user.displayName}</span>
          </Link>
          <Comments id={data._id}/>
        </div>
      </div>
    </div>
  )
}

export default PostPage 