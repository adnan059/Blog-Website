import React, { useEffect, useState } from 'react'
import "./SideBar.css"
import {FaFacebookSquare, FaTwitterSquare, FaPinterestSquare, FaInstagramSquare} from "react-icons/fa"
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  const [cats, setCats] = useState([])
  const getCats = async()=>{
    const res = await axios.get("/categories/view")
    setCats(res.data)
  }

  useEffect(()=>{
    getCats()
  },[])


  return (
    <div className='sidebar'>

        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img src="https://i.pinimg.com/originals/76/80/4f/76804f67ba38f85e4802d250e5b15504.jpg" alt="" className='sidebarImg'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit, cupiditate assumenda quasi fuga doloremque.</p>
        </div>

         <div className="sidebarItem">
            <span className='sidebarTitle'>CATEGORIES</span>
            <ul className='sidebarList'>
            {cats.map((cat,i)=>(<li key={i}className='sidebarListItem'><NavLink to={`/?categories=${cat.name}`}>{cat.name}</NavLink></li>))}
        
      

            </ul>
         </div>

         <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
            <FaFacebookSquare className="sidebarIcon" />
        <FaTwitterSquare className="sidebarIcon" />
        <FaPinterestSquare className="sidebarIcon" />
        <FaInstagramSquare className="sidebarIcon" />
            </div>

         </div>

    </div>
  )
}

export default SideBar