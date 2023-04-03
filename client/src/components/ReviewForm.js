import React, { useState } from "react";
import axios from "axios";

export default function ReviewForm(props){
    const [reviewInputs, setReviewInputs] = useState({rating: "", text: ""});
    
    function handleReviewChange(event){
        const {name, value} = event.target;
        setReviewInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
        //console.log("changing")
    }

    function handleReviewSubmit(event){
        event.preventDefault()
        axios.post(`/api/reviews/${props.trailId}`, reviewInputs)
            .then(res => {
                props.getReviews(res.data)
                props.handleReview()
                setReviewInputs({rating: "", text: ""});
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleReviewSubmit} className="add--review--form">
            <label className="review--label">Add Review</label>
            <input 
                type="number"
                name="rating"
                value={reviewInputs.rating}
                onChange={handleReviewChange}
                placeholder="Rating"
                className="review--inputs"
                min="1"
                max="5"
            />
            <textarea 
                name="text"
                value={reviewInputs.text}
                onChange={handleReviewChange}
                placeholder="Describe your experience"
                style={{ resize: "none" }}
                className="review--inputs"
            />
            <button>Submit your review</button>
            <br />
            <button onClick={props.handleReview} type="button">Close</button>
        </form>
    )
}

