import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/homePage/homePage.jsx'
import CreatePage from './pages/createPage/createPage.jsx'
import PostPage from './pages/postPage/postPage.jsx'
import AuthPage from './pages/authPage/authPage.jsx'
import ProfilePage from './pages/profilePage/profilePage.jsx'
import SearchPage from './pages/searchPage/SearchPage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={ <HomePage/>} />
    <Route path='/create' element={ <CreatePage/>} />
    <Route path='/pin/:id' element={ <PostPage/>} />
    <Route path='/auth' element={ <AuthPage/>} />
    <Route path='/:username' element={ <ProfilePage/>} />
    <Route path='/search' element={ <SearchPage/>} />
  </Routes>
  </BrowserRouter>
)
