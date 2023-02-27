/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import "./SinglePost.css"
import {FaEdit, FaTrashAlt} from "react-icons/fa"
import { NavLink, useLocation, useNavigate  } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './../../context/Context';

const SinglePost = () => {
 const location = useLocation()
 const navigate = useNavigate()
 const id = location.pathname.split("/")[2];

 const {user} = useContext(AuthContext)

  const [state, setState] = useState({})

  const [updateMode, setUpdateMode] = useState(false)


 
  const getAPost = async()=>{
    try {
      const res = await axios.get(`/posts/view/${id}`)
      setState(res.data)
     
    } catch (error) {
      alert(error)
    }
  } 
  
  useEffect(()=>{
      getAPost()
  },[])

  const PF="http://localhost:5000/images/"

  const {title,_id, desc, createdAt, photo, username} = state



  const handleDelete = async()=>{
  if(window.confirm("Do you really want to delete this post?")){
    try {
      await axios.delete(`/posts/delete/${_id}`,{data: {username: user.username}})
      alert("Post deleted successfully")
      navigate("/")
    } catch (error) {
      alert("Sorry! could not delete the post due to an server error.")
    }
  }
  }

  const handleUpdate = async()=>{
    if (title.length>0 && desc.length>0){
    try {
      await axios.put(`/posts/update/${_id}`,
         {title: state.title, desc: state.desc, username: user.username}
      )
      alert("Post updated successfully!")
      setUpdateMode(false)

    } catch (error) {
      alert("Sorry! The post has not been updated due to an server error.")
    }
  }else{
    alert("None of the two fields should be left empty!")
  }
  }
  

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {photo && <img src= {PF+photo} alt="" className="singlePostImg" />}

          {updateMode? <input required={true} value={state.title}  onChange={e=>setState({...state, title: e.target.value})}
          className="singlePostTitleInput" autoFocus={true}/> : (  <h1 className="singlePostTitle">
                {title}
              {user?.username === username?   <div className="singlePostIcons">
                <FaEdit className='singlePostIcon' onClick={()=>setUpdateMode(true)}/>
                <FaTrashAlt className='singlePostIcon' onClick={handleDelete}/>
                </div>: null}
            </h1>)}


          
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author:  <NavLink to={`/?user=${username}`}><b>{username}</b></NavLink> </span>
                <span className="singlePostDate">{new Date(createdAt).toDateString()}</span>
            </div>
            {updateMode? <textarea rows="10" required={true} value={state.desc} 
            onChange={e=>setState({...state, desc: e.target.value})}
            className='singlePostDescInput'></textarea> : (<p className='singlePostDesc'>{desc}
            </p>)}

           {updateMode? ( <button className='singlePostButton' onClick={handleUpdate}>Update</button>): null}
        </div>
    </div>
  )
}

export default SinglePost