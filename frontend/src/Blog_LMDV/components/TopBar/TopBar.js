import React, { useContext, useEffect, useState } from "react";
import {NavLink} from "react-router-dom"
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterestSquare,
  FaTwitterSquare,
  FaSignInAlt,
  FaBars
} from "react-icons/fa";
import "./TopBar.css";
import TopSideBar from "./TopSideBar";
import { AuthContext } from "../../context/Context";


const TopBar = () => {
  const {user, authDispatch} = useContext(AuthContext)

  const [isSmall, setIsSmall] = useState(false) 

  const [isClicked, setIsClicked] = useState(false)

  const checkScreenSize = ()=>{
    if(window.innerWidth<=600){
      setIsSmall(true)
    }else{
      setIsSmall(false)
      setIsClicked(false)
    }
  }

  useEffect(()=>{
    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)
    return ()=>window.removeEventListener("resize", checkScreenSize)

  })

  const handleLogout = ()=>{
    authDispatch({type:"LOGOUT"})
  }

  const PF = "http://localhost:5000/images/"


  return (
    <div className="top">
      <div className="topLeft">
        <FaFacebookSquare className="topIcon" />
        <FaTwitterSquare className="topIcon" />
        <FaPinterestSquare className="topIcon" />
        <FaInstagramSquare className="topIcon" />
      </div>
      <div className="topCenter">
      {isSmall? <h2 className="topTitle">My Blogs</h2>:   <ul className="topList">
      <NavLink className="topListItem" to="/" >Home</NavLink>

 

      <NavLink className="topListItem" to="/write" >Write</NavLink>
        
        </ul>}
      </div>
      <div className="topRight">

        {user?   (<NavLink to="/settings"><img
          src={PF+user.profilePic}
          alt=""
          className="topImg"
        /></NavLink>)
        :
        (<NavLink to="/login" title="Log In"><FaSignInAlt className="topRightIcon"/></NavLink>
        )}

        {user? (<NavLink onClick={handleLogout} title="Log Out"><FaSignInAlt className="topRightIcon"/></NavLink>) : null }

       
      
        {isSmall? <FaBars onClick={()=>setIsClicked(!isClicked)} className="topRightIcon"/>: null}
        <TopSideBar isClicked={isClicked} setIsClicked={setIsClicked}/>
      </div>
    </div>
  );
};

export default TopBar;
