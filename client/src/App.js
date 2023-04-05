import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import TrailList from "./components/TrailList";
import TrailCard from "./components/TrailCard";
import RegisterForm from "./components/RegisterForm";
import LogInForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import axios from "axios";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setIsLoggedIn(true);
    }
  }, []);


  const userAxios = axios.create();
  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${ token }`
    return config
  });

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    reviews: [],
    errMsg: ""
  };

  const [userState, setUserState] = useState(initState);

  function signup(credentials){
    userAxios.post("/auth/signup", credentials)
    .then(res => {
        const { user, token } = res.data;
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prev => ({
          ...prev,
          user,
          token
        }))
        setIsLoggedIn(true)
    })
    .catch(err => {
      console.log(err)
      alert("Sign up unsuccessful")
    })
  };

  function login(credentials){
    userAxios.post("/auth/login", credentials)
    .then(res => {
        const { user, token } = res.data;
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prev => ({
            ...prev,
            user,
            token
        }))
        setIsLoggedIn(true)
    })
    .catch(err => console.log(err))
};

  function logout(){
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You are now logged out.")
  };

  function addReview(trailId, newReview, callback){
    userAxios.post(`/reviews/${trailId}`, newReview)
    .then(res => {
      setUserState(prev => ({
        ...prev,
        reviews: [...prev.reviews, res.data]
      }))
      callback()
    })
    .catch(err => console.log(err))
  };

  function deleteReview(reviewId, callback){
    userAxios.delete(`/reviews/${reviewId}`)
    .then(() => {
      setUserState(prev => ({
        ...prev,
        reviews: prev.reviews.filter(review => review._id !== reviewId)
      }))
      callback()
    })
    .catch(err => console.log(err.response.data.errMsg))
  }


  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} logout ={logout} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/trailList" element={<TrailList isLoggedIn={isLoggedIn} />} />
        <Route path="/trailCard/:trailId" element={<TrailCard isLoggedIn={isLoggedIn} addReview={addReview} deleteReview={deleteReview} />} />
        <Route path="/registerForm" element={<RegisterForm signup={signup} isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<LogInForm setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} login={login} />}/>
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} logout={logout} />} />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} logout={logout} />
    </BrowserRouter>
  )
}



export default App;
