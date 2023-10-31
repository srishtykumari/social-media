import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UploadPic = () => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
  
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
      // Retrieve the logged-in user from localStorage
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setLoggedInUser(user); // Set loggedInUser with the user data
      }
    }, []);

    
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      const onUploadProfile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ouvojths");
        const resp = await axios.post(
          "http://api.cloudinary.com/v1_1/dn8nk8q76/image/upload",
          formData
        );
        return resp.data.url;
      };

      if (profileImage) {
        const URL = await onUploadProfile(profileImage);

        await fetch(`http://localhost:3000/user/${user.id}`, {
          method: "PUT",
          body: JSON.stringify({
            uniqueId: user.uniqueId,
            username: user.username,
            email: user.email,
            password: user.password,
            reppassword: user.reppassword,
            imagePost: URL,
            bio: bio,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            toast.info("Profile updated Successfully");
            navigate ("/profile")
          })
          .catch((err) => {
            console.log(err.message);
          });

        setProfileImage(null); // Clear the selected file

      }
    } else {
      toast.error("You are not authenticated to update this profile.");
    }
  };

  return (
    <div>
          <div class="profile-upload-container">
  <div class="profile-upload">
    <form onSubmit={handleProfileSubmit}>
      <input
        type="file"
        id="image-upload"
        class="image-upload-input"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
      <label for="image-upload" class="image-upload-label">
        <i class="fas fa-camera"></i> Upload Profile Picture
      </label>
      <textarea
        name="bio"
        type="text"
        placeholder="Add your bio"
        class="bio-input"
        rows="4"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>
      <button class="profile-btn" type="submit">
        Add Profile
      </button>
    </form>
  </div>
</div>
    </div>
  )
}

export default UploadPic





