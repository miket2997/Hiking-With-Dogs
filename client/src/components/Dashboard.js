import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ isLoggedIn, logout }){
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();


    function handleLogout(){
        logout();
        navigate(-1)

    }

    return (
        <div className="dashboard">
            {isLoggedIn && (
                <div className="user--info">
                    <h1>My Dashboard</h1>
                    <label>Your Information</label>
                    <ul>
                        <li>Name: {user.name}</li>
                        <li>Username: {user.username}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                    <h4>Click below to log out.</h4>
                    <button className="logout--btn" onClick={handleLogout}>Logout</button>
                    <br />
                    <button className="dashboard--btn" onClick={() => navigate("/trailList")}>See a list of trails</button>
                </div>
            )}
        </div>
    )
}

