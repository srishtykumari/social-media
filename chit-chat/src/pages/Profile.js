import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadPic from "./UploadPic";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [imagePost, setImagePost] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // const navigate = useNavigate();
  // const isAuthenticated = true;

  useEffect(() => {
    // Retrieve the logged-in user from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Retrieve the logged-in user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user); // Set loggedInUser with the user data
    }
  }, []);

  useEffect(() => {
    // Fetch the imagePost data only if the user is available
    if (user && user.id) {
      fetch(`http://localhost:3000/user/${user.id}`) // Assuming you can fetch user data by ID
        .then((response) => response.json())
        .then((data) => {
          setImagePost(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]); // Trigger the fetch whenever the user state changes

  let userBox = document.getElementById("userBox");

  function openinfo() {
    userBox.classList.remove("hide-details");
  }
  function closeinfo() {
    userBox.classList.add("hide-details");
  }

 
  return (
    <div className="profile-page">
    <h1 style={{ textAlign: "center", marginTop:"30px" }}>profile</h1>
      <div className="user hide-details" id="userBox">
        <div className="pro-pic">
          {imagePost && (
            <img
              className="profile-image"
              src={imagePost.imagePost}
              onClick={openinfo}
              alt="Profile Image"
            />
          )}
        </div>
        {user ? (
          <div className="profile-details">
            <h1>{user.username}</h1>
            <p>
              Welcome to <span >chit-chat</span>
            </p>
            <p>{user.bio}</p>
            <p> User-id:{user.id}</p>
          </div>
        ) : (
          <p>No user logged in. Please log in to view your profile.</p>
        )}
        
        <div className="close-icon" onClick={closeinfo}></div>
      </div>
      <button className="change-pic-btn">Change profile</button>
      
    </div>
  );
};

export default Profile;



