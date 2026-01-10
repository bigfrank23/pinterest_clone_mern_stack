import './createPage.css'
import ImageComponent from '../../components/image/ImageComponent'
import useAuthStore from '../../utils/authStore'
import {useNavigate} from 'react-router'
import { useEffect, useRef, useState } from 'react'
import Editor from '../../components/editor/Editor'
import useEditorStore from '../../utils/editorStore'
import apiRequest from '../../utils/apiRequest'

const CreatePage = () => {
  const {currentUser} = useAuthStore()
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0
  })
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef()
  const {textOptions, canvasOptions} = useEditorStore()

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth')
    }
  }, [currentUser, navigate])

  useEffect(()=> {
    if (file) {
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => (
        setPreviewImg({
          url: img.src,
          width: img.width,
          height: img.height
        })
      )
    }
  }, [file])

  // const previewImg = file ? URL.createObjectURL(file) : null

  const handleSubmit = async() => {
    if (isEditing) {
      setIsEditing(false)
      return
    }else {
      const formData = new FormData(formRef.current)
      formData.append('media', file)
      formData.append('textOptions', JSON.stringify(textOptions))
      formData.append('canvasOptions', JSON.stringify(canvasOptions))

      try {
        const res = await apiRequest.post('/pins', formData, {
          headers: {'Content-Type': 'multipart/form-data' }
        })
        navigate('/pin/' + res.data._id)
        
      } catch (error) {
        console.log(error);
        
      }
  }
  }

  return (
    <div className='createPage'>
      <div className="createTop">
        <h1>{isEditing ? "Design Your Pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>
      {isEditing ? <Editor previewImg={previewImg}/> : (
        <div className="createBottom">
          {previewImg.url ? (
            <div className="previewImgContainer">
              <img src={previewImg.url} alt="preview" />
              <div className="editIcon" onClick={()=> setIsEditing(true)}>
                <ImageComponent path={'/general/edit.svg'} />
              </div>
            </div>
          ) : ( 
            <label className="upload" htmlFor="file">
            <div className="uploadTitle">
              <ImageComponent path={'/general/upload.svg'} />
              <span>Choose a file</span>
            </div>
            <div className="uploadInfo">
              We recommend using high quality .jpg files less than 20mb or mp4 less than 200mb
            </div>
          </label>
          )}

          <input type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} hidden />
          <form className="createForm" ref={formRef}>
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input type="text" name='title' id='title' placeholder='Add a title' />
            </div>
            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea rows={6} name='description' id='description' placeholder='Add a detail description' />
            </div>
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input type="text" name='link' id='link' placeholder='Add a Link' />
            </div>
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select name="board" id="board">
                <option value="">Choose a board</option>
                <option value="1">Board 1</option>
                <option value="2">Board 2</option>
                <option value="3">Board 3</option>
              </select>
            </div>
            <div className="createFormItem">
              <label htmlFor="tags">Tagged Topics</label>
              <input type="text" name='tags' id='tags' placeholder='Add tag' />
              <small>Don&apos;t worry people won&apos;t see your tags</small>
            </div>
          </form>
        </div>

      )}
    </div>
  )
}

export default CreatePage