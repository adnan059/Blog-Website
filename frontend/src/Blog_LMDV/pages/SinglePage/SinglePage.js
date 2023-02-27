import React from 'react'
import "./SinglePage.css"
import SideBar from './../../components/SideBar/SideBar';
import SinglePost from '../../components/SinglePost/SinglePost';

const SinglePage = () => {
  return (
    <div className='single'>
        <SinglePost/>
        <SideBar/>
        </div>
  )
}

export default SinglePage