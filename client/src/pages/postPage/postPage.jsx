import { Link } from 'react-router'
import ImageComponent from '../../components/image/ImageComponent' 
import PostInteractions from '../../components/postInteractions/postInteractions'
import Comments from '../../components/comments/comments'
import './postPage.css'

const PostPage = () => {
  return (
    <div className='postPage'>
      &larr;
      <div className="postContainer">
        <div className="postImg">
          <ImageComponent path='/pins/pin1.jpeg' w={736} />
        </div>
        <div className="postDetails">
          <PostInteractions/>
          <Link to="/john">
            <ImageComponent path={"/general/noAvatar.png"} className={"postUser"} />
            <span>John Doe</span>
          </Link>
          <Comments/>
        </div>
      </div>
    </div>
  )
}

export default PostPage