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



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setIsLoggedIn(true);
    }
  }, []);


  function logout(){
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("You are now logged out.")
  }


  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} logout ={logout} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/trailList" element={<TrailList isLoggedIn={isLoggedIn} />} />
        <Route path="/trailCard/:trailId" element={<TrailCard isLoggedIn={isLoggedIn} />} />
        <Route path="/trailCard/:trailId/:reviewId" element={<TrailCard />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/login" element={<LogInForm setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}/>
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} logout={logout} />} />
      </Routes>
      <Footer isLoggedIn={isLoggedIn} logout={logout} />
    </BrowserRouter>
  )
}



export default App;
