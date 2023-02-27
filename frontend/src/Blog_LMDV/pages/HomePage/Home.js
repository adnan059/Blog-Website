import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Posts from "../../components/Posts/Posts";
import SideBar from "../../components/SideBar/SideBar";
import Header from "./../../components/Header/Header";
import "./Home.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  let [posts, setPosts] = useState([])
  const {search} = useLocation()
  

   useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        const res = await axios.get("/posts/view/"+search)
      setPosts(res.data)
      } catch (error) {
        alert("Sorry! could not load the posts due to an server error.")
      }
    }
    fetchPosts()
   },[search])


  const sorting = useCallback(()=>{
    return posts.sort((a,b)=>{
      console.log("sorting")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  },[posts])

  sorting()

  return (
    <>
      <Header />
      <div className="home">
      <Posts posts={posts}/>
      <SideBar/>
    </div>
    </>
  );
};

export default Home;
