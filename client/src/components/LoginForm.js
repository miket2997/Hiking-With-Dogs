import React, { useState } from "react";
import { useNavigate } from "react-router-dom"



export default function LogInForm(props){

    const initInput = {
        username: "",
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
    };

   

    function handleSubmit(event){
        event.preventDefault()
        props.login(loginInputs)
        navigate(-1)
    };



    return (
        <div className="login--form">
            {!props.isLoggedIn ? (
                <form className="sign--in--form" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input 
                    className="login--inputs"
                    type="text"
                    name="username"
                    value={loginInputs.email}
                    onChange={handleChange}
                    placeholder="username"
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


