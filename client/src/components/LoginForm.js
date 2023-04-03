import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


export default function LogInForm(props){

    const initInput = {
        email: "",
        password: ""
    };

    const [loginInputs, setLoginInputs] = useState(initInput);
    const navigate = useNavigate();

    function handleRegister(){
        navigate("/registerForm")
    }

    function handleDashboard(){
        navigate("/dashboard")
    }

    function handleChange(event){
        const {name, value} = event.target
        setLoginInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(event){
        event.preventDefault()
        const {email, password} = loginInputs;
        axios.post("/api/users/login", { email, password })
        .then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            props.setIsLoggedIn(true)
            axios.get(`/api/users/${res.data.user._id}`, {
                headers: {Authorization: `Bearer ${res.data.token}`},
            }).then(res => {
                console.log(res.data)
            })
            navigate(-1)
        })
        .catch(err => console.log(err))
    };



    return (
        <div className="login--form">
            {!props.isLoggedIn ? (
                <form className="sign--in--form" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input 
                    className="login--inputs"
                    type="email"
                    name="email"
                    value={loginInputs.email}
                    onChange={handleChange}
                    placeholder="email"
                />
                <input 
                    className="login--inputs"
                    type='password'
                    name="password"
                    value={loginInputs.password}
                    onChange={handleChange}
                    required={true}
                    placeholder="password"
                />
                <button className="login--btn">Submit</button>
                <button type="button" className="go--to--register--btn" onClick={handleRegister}>Don't have an account? Click here to sign up.</button>
            </form>
            ) :
            (
                <div className="logged--in--already">
                    <h1>You are logged in.</h1>
                    <button onClick={handleDashboard}>Go to dashboard</button>
                </div>
            )}
            
        </div>
    )
}


