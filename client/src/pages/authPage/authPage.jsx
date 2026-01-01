import './authPage.css'
import ImageComponent from '../../components/image/ImageComponent'
import apiRequest from '../../utils/apiRequest'
import { useState } from 'react'

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const data = Object.fromEntries(formData)

    try {
      const res = await apiRequest.post(`/user/auth/${isRegister ? "register" : "login"}`,data)
      console.log(res.data);
      
    } catch (error) {
      setError(error.response.data.message)
    }
    console.log(data);
    
  }
  return (
    <div className='authPage'>
      <div className="authContainer">
        <ImageComponent w={36} h={36} path={'/general/logo.png'} />
        <h1>{isRegister ? "Create an account" : "Login to your account"}</h1>
        {
          isRegister ?
          (
          <form key={"registerForm"} onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' required placeholder='User Name'/>
          </div>
          <div className="formGroup">
            <label htmlFor="displayName">Name</label>
            <input type="text" name='displayName' id='displayName' required placeholder='Name'/>
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' required placeholder='Email'/>
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' required placeholder='Password'/>
          </div>
          <button>Register</button>
          <p onClick={()=> setIsRegister(false)}>Do you have an account already?</p>
          {error && <p className='error'>{error}</p>}
          </form>
          ) :
          <form key={"loginForm"} onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' required placeholder='Email'/>
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' required placeholder='Password'/>
          </div>
          <button>Login</button>
          <p onClick={()=> setIsRegister(true)}>Don&apos;t have an account?</p>
          {error && <p className='error'>{error}</p>}
        </form>
        }
      </div>
    </div>
  )
}

export default AuthPage