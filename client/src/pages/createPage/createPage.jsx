import './createPage.css'
import ImageComponent from '../../components/image/ImageComponent'

const CreatePage = () => {
  return (
    <div className='createPage'>
      <div className="createTop">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>
      <div className="createBottom">
        <div className="upload">
          <div className="uploadTitle">
            <ImageComponent path={'/general/upload.svg'} />
            <span>Choose a file</span>
          </div>
          <div className="uploadInfo">
            We recommend using high quality .jpg files less than 20mb or mp4 less than 200mb
          </div>
        </div>
        <form className="createForm">
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
    </div>
  )
}

export default CreatePage