/* eslint-disable no-unreachable */
import React, { useReducer } from 'react'
import "./Register.css"

import {RiArrowGoBackFill} from "react-icons/ri"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const initialValues = {username: "", email:"", password: ""}

const reducer = (state,action)=>{
  switch (action.type) {
    case "username":
      return {...state, username: action.payload}
      break;

 case "email":
      return {...state, email: action.payload}
      break;

  case "password":
      return {...state, password: action.payload}
      break;
  
    default:
      return state
      break;
  }
}

const Register = () => {
  const navigate = useNavigate()
  
  const [formValues, dispatch] = useReducer(reducer, initialValues)
  const {username, email, password} = formValues

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("/register",{username, email, password})
      console.log(res.data)
      alert("You have successfully registered!")
      navigate("/login")

    } catch (error) {
      alert("Registration Failed")
    }
  }



  return (
    <div className='register'>

<NavLink className='back' to="/"><RiArrowGoBackFill /></NavLink>

        <span className='registerTitle' >Register</span>


        <form className="registerForm" onSubmit={handleSubmit}>

            <label>Username</label>
            <input type="text" placeholder='Enter your username...' className='registerInput' value={formValues.username} onChange={(e)=>dispatch({type:"username", payload: e.target.value})} required={true}/>

            <label>Email</label>
            <input type="email" placeholder='Enter your email...' className='registerInput' value={formValues.email} onChange={(e)=>dispatch({type:"email", payload: e.target.value})} required={true}/>

            <label>Password</label>
            <input type="password" placeholder='Enter your password...' className='registerInput' value={formValues.password} onChange={(e)=>dispatch({type:"password", payload: e.target.value})} required={true}/>

            <input type="submit" value="Register" className='registerButton' />
        </form>
        < NavLink to= "/login" className='loginButton'>Login</ NavLink>
    </div>
  )
}

export default Register