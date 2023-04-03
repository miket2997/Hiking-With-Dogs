import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";

function Home({ isLoggedIn }) {
    const navigate = useNavigate();

    const images = [
        "trent3.JPG",
        "trent5.JPG",
        "trent9.JPG",
        "trent4.JPG",
        "trent2.JPG",
        "trent6.JPG",
        "trent7.JPG",
        "trent8.JPG",
        "trent1.JPG",
        'trent10.JPG',
        "trent11.JPG",
        "trent12.JPG",
        "trent13.JPG",
        "trent14.JPG",
        "trent15.JPG",
        "trent16.JPG",
        "trent17.JPG",
        "trent18.JPG",
        "trent19.JPG"
    ];

    function handleNavigateList(){
        navigate("trailList")
    }

    function handleNavigateLogin(){
        navigate("/login")
    };

    function handleNavigateRegister(){
        navigate("/registerForm")
    }

  return (
    <div className="home--container">
        <h1>Hiking with your pup: Your Guide to Dog-Friendly-Trails</h1>
        <p>Welcome to Hiking With your Pup, the ultimate resource for dog owners who love to explore the great outdoors. Our app is designed 
           to help you find the best dog-friendly hiking trails in your area, so you can enjoy the beauty of nature with your furry friend
           by your side. You will be able to view a list of dog friendly trails that have been added by other users, and view reviews that
           other users have left. You will also be able to create an acount and leave your own reviews, along with adding dog friendly trails of
           your own!
        </p>
        <button onClick={handleNavigateList} className="home--navs">See List of dog friendly hiking trails</button>
        {!isLoggedIn && <button onClick={handleNavigateLogin} className="home--navs">Click here to sign in to your account</button>}
        {!isLoggedIn && <button onClick={handleNavigateRegister} className="home--navs">Or click here to create an account</button>}
        <Carousel className="carousel">
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={require(`../images/${image}`)}
                        alt={`Slide ${index + 1}`} 
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    </div>
  );
}

export default Home;