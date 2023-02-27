import React, { useContext, useState } from 'react'
import "./Settings.css"
import SideBar from './../../components/SideBar/SideBar';
import {FaUser} from "react-icons/fa"
import { AuthContext } from '../../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate()
  const {user, authDispatch} = useContext(AuthContext)

  const [state, setState] = useState({username: user.username, email: user.email, password: "", file:null })
  const {username, email, password, file} = state

  const handleSubmit = async(e)=>{
    e.preventDefault();
    authDispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId : user._id,
      username, password, email
    }
    if(file){
      const data = new FormData()
      const fileName = Date.now()+file.name;
      data.append("name", fileName)
      data.append("file", file)
      updatedUser.profilePic = fileName;
      try {
        await axios.post("/upload", data)
      } catch (error) {
        alert(error)
      }
    }

    try {
    const res = await axios.put("/users/update/"+user._id, updatedUser)
      authDispatch({type:"UPDATE_SUCCESS", payload: res.data })
      alert("Your profile is updated.")
      navigate("/")
    } catch (error) {
      authDispatch({type: "UPDATE_FAILURE"})
      alert(error)
    }

     
  }

  const handleDelete = async()=>{
   if(window.confirm("Do you really want to delete your account?")){
    try {
      await axios.delete("/users/delete/"+user._id,
         {data: {userId: user._id}}
      )
      alert("Account deleted")
      authDispatch({type:"LOGOUT"})
      navigate("/")
    } catch (error) {
      alert(error)
    }
   }
  }
const PF = "http://localhost:5000/images/"


  return (
    <div className='settings'>
        <div className="settingsWrapper">

            <div className="settingsTitle">
              <span className="settingsUpdateTitle">Update Your Account</span>
              <span className='settingsDeleteTitle' onClick={handleDelete}>Delete Account</span>
            </div>

            <form className='settingsForm' onSubmit={handleSubmit}>

              <label>Profile Picture</label>

              <div className="settingsPP">

                <img src={file? URL.createObjectURL(file) : PF+user.profilePic} alt="" />

                <label htmlFor="fileInput">
                  <FaUser className='settingsPPIcon'/>
                </label>

                <input type="file" id="fileInput" style={{display: "none"}} onChange={(e)=>setState({...state, file: e.target.files[0]})} />

              </div>

              <label htmlFor="">Username</label>
              <input type="text" value={`${state.username}`} onChange={e=>setState({...state, username:e.target.value})}  />


              <label htmlFor="">Email</label>
              <input type="email" value={`${state.email}`} onChange={e=>setState({...state, email:e.target.value})}  />


              <label htmlFor="">Password</label>
              <input type="password" placeholder={`${state.password}`} onChange={e=>setState({...state, password:e.target.value})} />


            <input type="submit" value="Update" className='settingsSubmit' />

            </form>
        </div>
        <SideBar/>
    </div>
  )
}

export default Settings