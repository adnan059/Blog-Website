import React from 'react'
import {NavLink} from "react-router-dom"
import "./Post.css"

const Post = ({...post})=> {
  const PF = "http://localhost:5000/images/"
  return (
    <div className='post'>
       {post.photo &&  <img src={PF+post.photo} className='postImg' alt="" />}
        <div className="postInfo">
            <div className="postCats">
              {post.categories.map((cat,i)=>{
                return  <span className='postCat' key={i}>{cat}</span>
              })}
               
            </div>
            <NavLink to={`/post/${post._id}`} state={{...post}}><span className="postTitle">
               {post.title}
            </span></NavLink>
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className='postDesc'>{post.desc}</p>
    </div>
  )
}

export default Post