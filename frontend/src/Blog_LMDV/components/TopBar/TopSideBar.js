import React from 'react'
import {FaTimes} from "react-icons/fa"
import {NavLink} from "react-router-dom"

const TopSideBar = ({isClicked, setIsClicked}) => {
  return (
    <div className={isClicked? `topSideBar active`:'topSideBar'}>

        <FaTimes onClick={()=>setIsClicked(!isClicked)} className="times"/>

        <ul className='topSideBarList'>
        <NavLink className="topListItem" to="/" onClick={()=>setIsClicked(false)} >Home</NavLink>



<NavLink className="topListItem" to="/write" onClick={()=>setIsClicked(false)} >Write</NavLink>

        </ul>

    </div>
  )
}

export default TopSideBar