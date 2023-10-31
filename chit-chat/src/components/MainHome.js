import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const delIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
  >
    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
  </svg>
);
const likeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
  >
    <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
  </svg>
);
const friends = (
  <svg
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
  >
    <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
  </svg>
);
const memories = (
  <svg
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
  >
    <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
  </svg>
);
const saved = (
  <svg
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
  >
    <path d="M120-40v-640q0-33 23.5-56.5T200-760h400q33 0 56.5 23.5T680-680v640L400-160 120-40Zm80-122 200-86 200 86v-518H200v518Zm560 2v-680H240v-80h520q33 0 56.5 23.5T840-840v680h-80ZM200-680h400-400Z" />
  </svg>
);
const group = (
  <svg
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
  >
    <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
  </svg>
);
const video = (
  <svg
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
  >
    <path d="m460-380 280-180-280-180v360ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
  </svg>
);
const events = (
  <svg
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    height="30"
    viewBox="0 -960 960 960"
    width="30"
  >
    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
  </svg>
);

const MainHome = () => {
  const [user, setUser] = useState(null);
  const [imagePost, setImagePost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const navigate = useNavigate();
  const isAuthenticated = true;

  useEffect(() => {
    // Retrieve the logged-in user from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
  }, [user]);

  // const handleLike = async (id) => {
  //   // Check if the post is already liked
  //   if (likedPosts.includes(id)) {
  //     toast.warning("You have already liked this post.");
  //     return;
  //   }

  //   try {
  //     // Send a POST request to the correct liking endpoint
  //     const response = await axios.post(`http://localhost:3000/blogs/${id}`);
  //     if (response.status === 200) {
  //       // Update the likedPosts state to remember that the user liked this post
  //       setLikedPosts([...likedPosts, id]);

  //       // Update the number of likes in the posts state
  //       const updatedPosts = posts.map((post) => {
  //         if (post.id === id) {
  //           // Increase the like count by 1
  //           return { ...post, likes: post.likes + 1 };
  //         }
  //         return post;
  //       });
  //       setPosts(updatedPosts);

  //       toast.success("Post Liked Successfully");
  //     } else {
  //       toast.error("Something went wrong while liking the post.");
  //     }
  //   } catch (error) {
  //     console.error("Error liking the post: ", error);
  //     toast.error("Something went wrong while liking the post.");
  //   }
  // };

  const handleDelete = async (id) => {
    console.log(1);
    if (window.confirm("Are you sure that you wanted to  delete that Post?")) {
      const response = await axios.delete(`http://localhost:3000/blogs/${id}`);
      console.log(response);
      if (response.status === 200) {
        toast.success("Post Deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="hero-section">
      <div className="left-content">
        <div
          style={{ display: "flex", marginTop: "20px", marginLeft: "20px" }}
          className="user-pro-det"
        >
          <div className="pro-home-pic">
            {imagePost && (
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50px" }}
                className="pro-home-image"
                src={imagePost.imagePost}
                alt="Profile Image"
              />
            )}
          </div>
          {user ? (
            <div className="pro-details">
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  marginLeft: "10px",
                }}
                onClick={() => navigate("/profile")}
              >
                {user.username}
              </p>
            </div>
          ) : (
            <p>No user logged in. Please log in to view your profile.</p>
          )}
        </div>
        <div
          style={{ display: "flex", marginTop: "20px", marginLeft: "30px" }}
          className="grp"
        >
          {friends}
          <p
            style={{ marginLeft: "15px" }}
            onClick={() => navigate("/friends")}
          >
            Friends{" "}
          </p>
        </div>
        <div
          style={{ display: "flex", marginTop: "20px", marginLeft: "30px" }}
          className="grp"
        >
          {memories}
          <p style={{ marginLeft: "15px" }}>Memories</p>
        </div>
        <div
          style={{ display: "flex", marginTop: "20px", marginLeft: "30px" }}
          className="grp"
        >
          {saved}
          <p style={{ marginLeft: "15px" }}>Saved </p>
        </div>
        <div
          style={{ display: "flex", marginTop: "20px", marginLeft: "30px" }}
          className="grp"
        >
          {group}
          <p style={{ marginLeft: "15px" }}>Groups </p>
        </div>
        <div
          style={{ display: "flex", marginTop: "20px", marginLeft: "30px" }}
          className="grp"
        >
          {video}
          <p style={{ marginLeft: "15px" }}>videos </p>
        </div>
        <div
          style={{ display: "flex", marginTop: "20px", marginLeft: "30px" }}
          className="grp"
        >
          {events}
          <p style={{ marginLeft: "15px" }}>Events </p>
        </div>
        <hr />
        <p style={{ marginLeft: "15px" }}>Your shortcuts</p>
        <p style={{ marginLeft: "15px" }}>📂 HTML,CSS,JavaScript</p>
      </div>
      <div className="posts-container">
        {posts.map((post,index) => {
          return (
            <div className="post-hero-box" key={index}>
              <div className="pro-detail">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                  }}
                  src={post.userImagePost}
                  alt=""
                />
                <p>
                  {post.username}
                  <span style={{ fontWeight: "200" }}>...shared a post🖼️</span>{" "}
                </p>
              </div>

              <div className="post-card" key={post.title}>
                <div
                  className="post-style"
                  style={{ display: "flex", marginLeft: "5vw" }}
                >
                  <p className="post-date">{post.date}.......</p>
                  <p className="post-body">{post.category}</p>
                </div>
                <p className="post-title" style={{ marginLeft: "5vw" }}>
                  {post.description}
                </p>
                <img className="post-image" src={post.imageUrl} alt="" />
                {post.videoUrl && (
                  <video controls className="post-video">
                    <source src={post.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="button">
                  <div
                    className="delete-btn"
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  >
                    {delIcon}
                  </div>
                  <div className="like-btn">
                    😮Like {likeIcon} {post.likes}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="right-content">
        <h6 style={{ marginLeft: "100px", marginTop: "20px" }}>Sponspored</h6>
      </div>
    </div>
  );
};

export default MainHome;
