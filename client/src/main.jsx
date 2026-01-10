import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
// import HomePage from './pages/homePage/homePage.jsx'
// import CreatePage from './pages/createPage/createPage.jsx'
// import PostPage from './pages/postPage/postPage.jsx'
// import AuthPage from './pages/authPage/authPage.jsx'
// import ProfilePage from './pages/profilePage/profilePage.jsx'
// import SearchPage from './pages/searchPage/SearchPage.jsx'
import MainLayout from './pages/layouts/mainLayout.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const HomePage = React.lazy(() => import('./pages/homePage/homePage.jsx'))
const CreatePage = React.lazy(() => import('./pages/createPage/createPage.jsx'))
const PostPage = React.lazy(() => import('./pages/postPage/postPage.jsx'))
const AuthPage = React.lazy(() => import('./pages/authPage/authPage.jsx'))
const ProfilePage = React.lazy(() => import('./pages/profilePage/profilePage.jsx'))
const SearchPage = React.lazy(() => import('./pages/searchPage/SearchPage.jsx'))

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route element={ <MainLayout/>}>
        <Route path='/' element={ <HomePage/>} />
        <Route path='/create' element={ <CreatePage/>} />
        <Route path='/pin/:id' element={ <PostPage/>} />
        <Route path='/:username' element={ <ProfilePage/>} />
        <Route path='/search' element={ <SearchPage/>} />
      </Route>
        <Route path='/auth' element={ <AuthPage/>} />
    </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)
