import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm(){
    const navigate = useNavigate();
    const initInputs = {
        name: "",
        userName: "",
        email: "",
        password: ""
    };

    const [registerInputs, setRegisterInputs] = useState(initInputs);
    const [users, setUsers] = useState([]);

    function handleChange(event){
        const {name, value} = event.target;
        setRegisterInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }


    function handleSubmit(event){
        event.preventDefault()
        axios.post("/api/users", registerInputs)
        .then(res => {
            setUsers(prevUsers => [
                ...prevUsers,
                res.data
            ])
            setRegisterInputs(initInputs);
            navigate("/")
            alert("Thank you for signing up. You can now sign in to your account.")
        })
        .catch(err => console.log(err))
        console.log(users)
        
    }

    return (
        <div className="reg--form--container">
            <h1 className="register--h1">Please enter your information below to register</h1>
            <form className="registration--form" onSubmit={handleSubmit}>
                <label style={{fontWeight: "bold"}}>Please fill out all of the required fields.</label>
                <input 
                    type="text"
                    name="name"
                    value={registerInputs.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required={true}
                />
                <input 
                    type="text"
                    name="userName"
                    value={registerInputs.userName}
                    onChange={handleChange}
                    placeholder="username"
                    required={true}
                />
                <input
                    type= "email"
                    name="email"
                    value={registerInputs.email}
                    onChange={handleChange}
                    placeholder="email"
                    required={true}
                />
                <input
                    type="password"
                    name="password"
                    value={registerInputs.password}
                    onChange={handleChange}
                    placeholder="password"
                    required={true}
                />
                <button className="register--btn">Register</button>
            </form>
        </div>
    )
}
