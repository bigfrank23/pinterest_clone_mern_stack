import { useState } from 'react'
import './comments.css'
import EmojiPicker from 'emoji-picker-react';
import apiRequest from '../../utils/apiRequest'
import { useQuery } from '@tanstack/react-query'
import Comment from './comment';


const Comments = ({id}) => {
  const [open, setOpen] = useState(false)

  const {isPending, error, data} = useQuery({
      queryKey: ["comment", id],
      queryFn: ()=> apiRequest.get(`/comments/${id}`).then((res)=> res.data)
      }
      )
  
      if (isPending) return "Loading..."
      if (error) return "An error has occurred" + error.message
      if (!data) return "User not found "
  
      console.log(data);

  return (
    <div className='comments'>
      <div className="commentList">
       <span className="commentCount">
          {data.length === 0
            ? "No comments yet"
            : data.length === 1
            ? "1 comment"
            : `${data.length} comments`}
        </span>
        {/* COMMENT */}
        {
          data?.map((comment)=> (
          <Comment key={comment._id} comment={comment}/>
          ))
        }
      </div>
      <form className="commentForm">
        <input type="text" placeholder='Add a comment' />
        <div className="emoji">
          <div onClick={()=> setOpen((prev)=> !prev)}>😊</div>
          { open &&
            <div className="emojiPicker">
              <EmojiPicker/>
            </div>
          }
        </div>
      </form>
    </div>
  )
}

export default Comments