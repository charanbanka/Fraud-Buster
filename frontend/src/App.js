import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import { Container } from '@material-ui/core'
import Profile from './Components/Profile/Profile'
import {Country,State,City} from 'country-state-city'
import UserResponse from './Components/UserResponse'

const App = () => {
  
  return (
    <BrowserRouter>
          <Navbar />
          <div style={{marginTop:"5rem"}}>
            <Routes>
              <Route path="/" element={<Home/>} exact />
              <Route path="/user" element={<Profile/>} exact />
              <Route path="/userResponse" element={<UserResponse/>} exact />
            </Routes>
          </div>
      </BrowserRouter>
  )
}

export default App