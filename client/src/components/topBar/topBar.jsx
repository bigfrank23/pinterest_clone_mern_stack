import './topBar.css'
import UserButton from '../userButton/userButton'
import ImageComponent from '../image/ImageComponent'
import { Navigate, useNavigate } from 'react-router'

const TopBar = () => {
  const navigate = useNavigate()
  const handleSubmit =(e)=> {
    e.preventDefault()

    navigate(`/search?search=${e.target[0].value}`)
  }
  return (
    <div className='topBar'>
      {/* Search */}
      <form onSubmit={handleSubmit} className='search'>
        {/* <img src="/general/search.svg" alt="" /> */}
        <ImageComponent path="/general/search.svg" />
        <input type="text" placeholder='Search' />
      </form>
      {/* User */}
      <UserButton/>
    </div>
  )
}

export default TopBar