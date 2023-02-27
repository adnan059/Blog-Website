/* eslint-disable no-unreachable */
import React, { useContext, useReducer } from 'react'
import "./Write.css"
import {FaPlus} from "react-icons/fa"
import { AuthContext } from './../../context/Context';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';

const reducer = (state,action)=>{
  switch (action.type) {
    case "title":
      return {...state, title: action.payload}
      break;
    case "desc":
      return {...state, desc: action.payload}
      break;
    case "file":
      return {...state, file: action.payload}
    default:
      return state;
      break;
  }
}

const Write = () => {

  const {user} = useContext(AuthContext)

  const navigate = useNavigate()

  const [formValues, dispatch] = useReducer(reducer, {title:"", desc:"", file:null})

  const {title, desc, file} = formValues


  const handleSubmit = async(e)=>{
    e.preventDefault()

    const newPost = {
      username: user.username,
      title: title,
      desc: desc
    }

    if(file){
      const data = new FormData();
      const filename = Date.now()+file.name;
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename

      try {
        await axios.post("/upload", data)
      } catch (error) {
        alert("Sorry! There was an server error. Please try again later.")
      }
    }

    try {
     const res = await axios.post("/posts/create", newPost)
     navigate(`/post/${res.data._id}`)

    } catch (error) {
      alert("Sorry! There was an server error. Please try again later.")
      window.location.reload()
    }




  }


  return (
    <div className='write'>

        {file && <img src={URL.createObjectURL(file)} alt="" className="writeImg" />}

        <form className="writeForm" onSubmit={handleSubmit}>

           <div className="writeFormGroup">

           <label htmlFor="fileInput">
                <FaPlus className='writeIcon'/>
            </label>

            <input type="file" id="fileInput" style={{display: "none"}} onChange={e=>dispatch({type: "file", payload: e.target.files[0]})}/>

            <input type="text" required={true} placeholder='Title' className='writeInput' autoFocus={true} value={formValues.title} onChange={e=>dispatch({type:"title", payload: e.target.value})} />

           </div>

           <div className="writeFormGroup">

            <textarea required={true} rows="10"  placeholder='Tell your desc...' type="text" className='writeInput writeText'
            value={formValues.desc} onChange={e=>dispatch({type: "desc", payload: e.target.value})}
            ></textarea>

           </div>

           <button className="writeSubmit">
            Publish
           </button>

        </form>
    </div>
  )
}

export default Write