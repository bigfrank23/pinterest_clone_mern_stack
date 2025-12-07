import './topBar.css'
import UserButton from '../userButton/userButton'

const topBar = () => {
  return (
    <div className='topBar'>
      {/* Search */}
      <div className='search'>
        <img src="/general/search.svg" alt="" />
        <input type="text" placeholder='Search' />
      </div>
      {/* User */}
      <UserButton/>
    </div>
  )
}

export default topBar