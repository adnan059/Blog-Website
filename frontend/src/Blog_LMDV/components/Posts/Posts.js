import React from 'react'
import Post from '../Post/Post'
import "./Posts.css"

const Posts = ({posts}) => {
  return (
    <div className='posts'>
      {posts.map(post=>{
       return <Post {...post} key={post._id} />
      })}
      </div>
  )
}

export default Posts