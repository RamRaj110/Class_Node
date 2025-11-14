import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUserInfo } from "../utils/userSlice";


const Body = () => {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const userData = useSelector((state)=>state.userInfo)
  const fetchUser = async () => {
    if(!userData) return ;
    try {
     const res = await axios.get(BASE_URL+'profile/view',
      {withCredentials:true})
      dispatch(addUserInfo(res.data))
    } catch (error) {
      if(error.response && error.response.status === 401){
        navigate('/login')
      } 
      console.log(error)
    }
  }
  useEffect(() => {
   if(!userData){
    fetchUser()
   }
  }, [])

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
