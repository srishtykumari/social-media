import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import img2 from "../images/start.gif";

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  videoUrl: "",
};


const AddEditPost = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { title, description,imageUrl, like } = formValue;
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();
  const isAuthenticated = true;


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
    } else {
      // Handle the case when the user is not logged in, e.g., redirect to the login page
      navigate("/login");
    }
  }, [navigate]);


 
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };


  /*------------------------Add Edit Post------------------------------- */
  
  const onUploadVideo = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ouvojths");
    axios
      .post("http://api.cloudinary.com/v1_1/dn8nk8q76/video/upload", formData) // Modify the URL for video uploads
      .then((resp) => {
        toast.info("Video Uploaded Successfully");
        setFormValue({ ...formValue, videoUrl: resp.data.url });
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!loggedInUser || !loggedInUser.username) {
      console.error("User is not logged in or username is missing");
      return;
    }
  
    if (title && description) {
      const currentDate = getDate();
      const updatedBlogData = {
        ...formValue,
        date: currentDate,
        username: loggedInUser.username,
        userImagePost: loggedInUser.imagePost,
      };
  
      const response = await axios.post(
        "http://localhost:3000/blogs",
        updatedBlogData
      );
  
      if (response.status === 201) {
        toast.success("Post Created Successfully");
      } else {
        toast.error("Something went wrong");
      }
  
      // Reset the form, but keep the imageUrl or videoUrl intact
      setFormValue({ title: "", description: "", category: "", imageUrl: formValue.imageUrl, videoUrl: formValue.videoUrl });
      navigate("/");
    }
  };
  


  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ouvojths");
    axios
      .post("http://api.cloudinary.com/v1_1/dn8nk8q76/image/upload", formData)
      .then((resp) => {
        toast.info("Image Uploaded Successfully");
        setFormValue({ ...formValue, imageUrl: resp.data.url });
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  

  /*---------------------------end of AddEdit-------------------------- */

  return (
   
    <div className="add-post-page" style={{marginTop:"-110px"}} >
<div className="sec-contenet">
  <img
  style={{borderRadius:"50%",width:"35vw", height:"70vh", marginLeft:"10vw",marginTop:"250px"}}
          src={img2} 
          className="card-img-2"
          alt="Avatar"
        />


        <MDBValidation
        className="row g-3"
        style={{ marginTop: "250px",marginLeft:"120px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <p
            className="fs-2 fw-bold"
            style={{ marginLeft: "120px", marginTop: "-70px" }}
          >
            Add Post
          </p>
          <MDBInput style={{backgroundColor:"#d4d5cf",color:"black"}}
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputChange}
            label="Title"
            validation="please provide a title"
            required
            invalid
          />
          <br />
          <textarea style={{backgroundColor:"#d4d5cf",color:"black"}}
            value={description || ""}
            name="description"
            placeholder="description"
            type="text"
            className="form-control"
            rows={4}
            cols={50}
            onChange={onInputChange}
            label="description"
            required
            invalid
          />
          <br />
          <MDBInput style={{backgroundColor:"#d4d5cf",color:"black"}}
            name="title"
            type="file"
            onChange={(e) => onUploadImage(e.target.files[0])}
            label=""
            validation="Please provide a title"
            required
            invalid
          />
          <br />


          <MDBInput style={{backgroundColor:"#d4d5cf",color:"black"}}
            name="video"
            type="file"
            onChange={(e) => onUploadVideo(e.target.files[0])}
            validation="Please provide a video"
            label="uploade video"
            required
            invalid
          />



          <br />
          <br />
          <MDBBtn type="submit" style={{backgroundColor:"#3498db", marginRight: "10px" }}>
            Add
          </MDBBtn>
          <MDBBtn
            color="danger"
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/")}
          >
            Go Back
          </MDBBtn>
        </div>
      </MDBValidation>


</div>

     
      </div>
   
  );
};

export default AddEditPost;




