import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import TrailForm from "./TrailForm";

export default function TrailList({ isLoggedIn }){
    const [trails, setTrails] = useState([]);
    const navigate = useNavigate();
    const [addTrail, setAddTrail] = useState(false);

    function getTrails(){
        axios.get("/api/trails")
        .then(res => setTrails(res.data))
        .catch(err => console.log(err))
    };


    function handleAddTrail(){
        setAddTrail(prev => !prev)
    };

    function navigateToAddTrail(){
        navigate("/login")
    }


    useEffect(() => {
        getTrails()
    }, [])

    return (
        <div className="list--container">
            <h1 className="list--title">Dog Friendly Hiking Trails</h1>
            <div className="trail--list--container">
            {trails.map(trail => (
                <div key={trail._id} className="trail--container">
                    <img className="img--list" src={trail.image} alt={trail.name} />
                    <h1>{trail.name}</h1>
                    <h4>Location: {trail.location}</h4>
                    <p>Difficulty: {trail.difficulty}</p>
                    <p>Length: {trail.length} miles</p>
                    <p>Elevation: {trail.elevation} feet</p>
                    <button className="trail--btn" onClick={() => navigate(`/trailCard/${trail._id}`)}>See trail details and reviews</button>
                </div>
            ))}
            </div>
            {!addTrail && isLoggedIn && <button className="add--trail--btn" onClick={handleAddTrail}>Click here to add a trail</button>}
            {!addTrail && !isLoggedIn && <button className="navigate--add--trail--login" onClick={navigateToAddTrail}>Login to add a trail.</button>}
            {addTrail && <TrailForm getTrails={getTrails} handleAddTrail={handleAddTrail} addTrail={addTrail} />}
        </div>
    )
}
