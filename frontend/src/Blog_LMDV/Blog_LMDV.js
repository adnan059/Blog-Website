import React from "react";
import "./BlogLMDV.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"


import TopBar from "./components/TopBar/TopBar";
import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";
import Settings from "./pages/Settings.js/Settings";

import SinglePage from "./pages/SinglePage/SinglePage";
import Write from "./pages/Write/Write";
import Home from './pages/HomePage/Home';
import {PrivateOutlet1, PrivateOutlet2} from "./components/PrivateOutet/PrivateOutlet";
import { AuthContextProvider } from "./context/Context";




const BlogLMDV = () => {
  return (
  <AuthContextProvider>
  <BrowserRouter>
  <TopBar/>
  <Routes>
    
  <Route path="/" element={<Home/>}/>

    <Route path="/*" element={<PrivateOutlet2/>}>
    <Route path="register" element={<Register/>}/>
    <Route path="login" element={<Login/>}/>
    </Route>


    

    <Route path="/*" element={<PrivateOutlet1/>}>
    <Route path="write" element={<Write/>}/>
    <Route path="settings" element={<Settings/>}/>
    </Route>

    <Route path="/post/:postID" element= 
    {<SinglePage/>}/>



   
  </Routes>
  </BrowserRouter>
  </AuthContextProvider> 
  );
};

export default BlogLMDV;
