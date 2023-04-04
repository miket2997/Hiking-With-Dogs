import React, { useState } from "react";


export default function RegisterForm(props){

    const initInputs = {
        name: "",
        username: "",
        email: "",
        password: ""
    };

    const [registerInputs, setRegisterInputs] = useState(initInputs);


    function handleChange(event){
        const {name, value} = event.target;
        setRegisterInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };

    

    function handleSubmit(event){
        event.preventDefault()
        props.signup(registerInputs)
        setRegisterInputs(initInputs)
    };

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
                    name="username"
                    value={registerInputs.username}
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
