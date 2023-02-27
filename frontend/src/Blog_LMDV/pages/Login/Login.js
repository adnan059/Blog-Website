/* eslint-disable no-unreachable */
import React, { useContext, useReducer } from 'react'
import "./Login.css"

import {RiArrowGoBackFill} from "react-icons/ri"
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/Context'
import  axios  from 'axios';

const reducer = (state,action)=>{
  switch (action.type) {
    case 'username':
      return {...state, username: action.value}
      break;
    case "password":
      return {...state, password: action.value}
      break;
  
    default:
      return state;
      break;
  }
}

const Login = () => {

  const {authDispatch, isFetching} = useContext(AuthContext)

  const [formValues, formDispatch] = useReducer(reducer,{username: "", password:""})

  const handleSubmit = async(e)=>{
    e.preventDefault()
    authDispatch({type: "LOGIN_START"})
    try {
      const res = await axios.post("/login",{username: formValues.username, password: formValues.password })
      authDispatch({type: "LOGIN_SUCCESS", payload: res.data})
    } catch (error) {
      authDispatch({type: "LOGIN_FAILURE"})
      alert("Login Failed!")
    }
  }



  return (
    <div className='login'>

      <NavLink className='back' to="/"><RiArrowGoBackFill /></NavLink>

        <span className='loginTitle' >Login</span>


        <form onSubmit={handleSubmit} className="loginForm">

            <label>Username</label>
            <input type="text" placeholder='Enter your username...' className='loginInput' value={formValues.username} onChange={e=>formDispatch({type: "username", value: e.target.value})} required={true}/>

            <label>Password</label>
            <input type="password" placeholder='Enter your password...' className='loginInput'
            value={formValues.password} onChange={e=>formDispatch({type: "password", value: e.target.value})} required={true}
            />

            <input type="submit" value="Login" className='loginButton' disabled={isFetching} />
        </form>
        <NavLink to="/register" className='registerButton'>Register</NavLink>
    </div>
  )
}

export default Login