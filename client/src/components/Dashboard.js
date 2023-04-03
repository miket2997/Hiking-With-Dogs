import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ isLoggedIn, logout }){
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const localDate = new Date(user.birthDate).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

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
                        <li>Name: {user.firstName} {user.lastName}</li>
                        <li>Username: {user.userName}</li>
                        <li>Email: {user.email}</li>
                        <li>Birthday: { localDate }</li>
                        {user.phoneNumber && <li>Phone Number: {user.phoneNumber}</li> }
                    </ul>
                    <h4>Click below to log out.</h4>
                    <button className="logout--btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    )
}

