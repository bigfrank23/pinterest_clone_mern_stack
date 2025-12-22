import './authPage.css'
import ImageComponent from '../../components/image/ImageComponent'
import { useState } from 'react'

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")
  return (
    <div className='authPage'>
      <div className="authContainer">
        <ImageComponent w={36} h={36} path={'/general/logo.png'} />
        <h1>{isRegister ? "Create an account" : "Login to your account"}</h1>
        {
          isRegister ?
          (
          <form key={"registerForm"}>
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
          <form key={"loginForm"}>
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