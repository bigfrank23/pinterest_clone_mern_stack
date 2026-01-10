import './editor.css'
import Layers from './Layers'
import Optons from './Optons'
import Workspace from './Workspace'

const Editor = ({previewImg}) => {
  return (
    <div className='editor'>
      <Layers previewImg={previewImg}/>
      <Workspace previewImg={previewImg}/>
      <Optons previewImg={previewImg}/>
    </div>
  )
}

export default Editor