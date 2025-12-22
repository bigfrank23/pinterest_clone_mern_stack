import ImageComponent from '../image/ImageComponent'
import './postInteractions.css'

const PostInteractions = () => {
  return (
    <div className='postInteractions'>
        <div className="interactionIcons">
            <ImageComponent path={"/general/react.svg"} />
            273
            <ImageComponent path={"/general/share.svg"} />
            <ImageComponent path={"/general/more.svg"} />
        </div>
        <button>Save</button>
    </div>
  )
}

export default PostInteractions