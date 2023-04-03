import React, { useState } from "react";
import axios from "axios";

export default function TrailForm(props){
    const initInputs = {
        name: "",
        location: "",
        length: "",
        elevation: "",
        difficulty: "",
        image: ""
    }

    const [trailInputs, setTrailInputs] = useState(initInputs);
    const [newTrails, setNewTrails] = useState([]);


    function handleTrailChange(event){
        const {name, value} = event.target;
        setTrailInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
        console.log("changing")
    }


    function handleTrailSubmit(event){
        event.preventDefault()
        axios.post("/api/trails", trailInputs)
        .then(res => {
            setNewTrails(prevTrails => [...prevTrails, res.data])
            props.getTrails()
            setTrailInputs(initInputs)
            console.log(newTrails)
            
        })
        .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleTrailSubmit} className="trail--form">
            <label className="trail--label">Enter Trail Information</label>
            <input 
                type="text"
                name="name"
                value={trailInputs.name}
                onChange={handleTrailChange}
                placeholder="Trail Name"
                className="trail--inputs"
            />
            <input 
                type="text"
                name="location"
                value={trailInputs.location}
                onChange={handleTrailChange}
                placeholder="location"
                className="trail--inputs"
            />
            <input
                type="text"
                name="length"
                value={trailInputs.length}
                onChange={handleTrailChange}
                placeholder="distance"
                className="trail--inputs"
                step="any"
            />
            <input
                type="number"
                name="elevation"
                value={trailInputs.elevation}
                onChange={handleTrailChange}
                placeholder="elevation"
                className="trail--inputs" 
            />
            <select name="difficulty" value={trailInputs.difficulty} onChange={handleTrailChange} className="trail--inputs select">
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
            </select>
            <input 
                type="text"
                name="image"
                value={trailInputs.image}
                onChange={handleTrailChange}
                placeholder="img Url"
                className="trail--inputs"
            />
            <button className="trail--form--btn">Add trail</button>
            {props.addTrail && <button type="button" onClick={props.handleAddTrail} className="trail--close--btn">Close</button>}
        </form>
    )
}
