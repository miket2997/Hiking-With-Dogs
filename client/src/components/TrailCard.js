import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "./ReviewForm";

export default function TrailCard({ isLoggedIn }) {
  const { trailId } = useParams();
  const [trail, setTrail] = useState({});
  const [review, setReview] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();

  function navigateLogin(){
    navigate("/login")
  }


  useEffect(() => {
    axios
      .get(`/api/trails/${trailId}`)
      .then((res) => setTrail(res.data))
      .catch((err) => console.log(err));
  }, [trailId]);

  const getReviews = useCallback(() => {
    axios
      .get(`/api/trails/${trailId}/reviews`)
      .then((res) => setReviewList(res.data.reviews))
      .catch((err) => console.log(err));
  }, [trailId]);

  function handleReview() {
    setReview((prev) => !prev);
  };

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <div className="trail--card">
      <div className="trail--info">
        <img className="trail--img" src={trail.image} alt={trail.name} />
        <h1>{trail.name}</h1>
        <h2>Location: {trail.location}</h2>
        <p>Difficulty: {trail.difficulty}</p>
        <p>Distance: {trail.length} miles</p>
        <p>Elevation: {trail.elevation} feet</p>
      </div>
      {!review && isLoggedIn && (
        <button className="add--review--btn" onClick={handleReview}>
          Add Review
        </button>
      )}
      {!review && !isLoggedIn && <button className="review--login--btn" onClick={navigateLogin}>Click here to login in order to add a review.</button>}
      {review && <ReviewForm trailId={trailId} handleReview={handleReview} getReviews={getReviews} />}
      <h1 className="reviews--h1">Reviews</h1>
      {reviewList.map((review) => (
        <div key={review._id} className="review--container">
          <p>Rating: {review.rating}/5</p>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
}
