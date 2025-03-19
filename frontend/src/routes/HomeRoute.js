import React from 'react'
import Navbar from '../components/Header/Navbar'
import Home from '../components/Home'
import Right from '../components/Header/Right'

const HomeRoute = () => {
  return (
   <>
    <div className="section">
    <div className="s_left">
        <Navbar></Navbar> 
        <Home></Home>
        
        </div>
        <Right></Right>
        </div>
   </>
  )
}

export default HomeRoute
