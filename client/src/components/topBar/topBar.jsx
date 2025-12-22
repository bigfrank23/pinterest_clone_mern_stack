import './topBar.css'
import UserButton from '../userButton/userButton'
import ImageComponent from '../image/ImageComponent'

const topBar = () => {
  return (
    <div className='topBar'>
      {/* Search */}
      <div className='search'>
        {/* <img src="/general/search.svg" alt="" /> */}
        <ImageComponent path="/general/search.svg" />
        <input type="text" placeholder='Search' />
      </div>
      {/* User */}
      <UserButton/>
    </div>
  )
}

export default topBar