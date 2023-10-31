import React,{useState, useEffect} from 'react';
import {
 
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const View = () => {

  const [blog, BlogPost]= useState();
  const {id} = useParams();

  useEffect(()=>{
    if(id) {
      getSinglePost();
    }
  },[id])

const getSinglePost = async () =>{
  const response = await axios.post(`http://localhost:3000/blogs/${id}`);

  if (response.status === 200){
    BlogPost(response.data);
  } else {
    toast.error("Something went wrong");
  }
};

const styleInfo = {
  display:"inline",
  marginLeft:"5px",
  float:"right",
  marginTop:"7px"
}

  return (
    <MDBContainer style={{border:"1px solid #d1ebe8"}}>
    <Link to="/">
     <strong style={{float:"left",color:"black"}} className="mt-3">Go Back</strong>
     </Link>
     <MDBTypography tag="h2" className="text-muted mt-2" style={{display:"inline-block"}}>{blog && blog.title}</MDBTypography>
     <img src={blog && blog.imageUrl} className="img-fluid rounded" alt={blog && blog.title} style={{width:"100", maxHeight:"500px"}} />
    </MDBContainer>
  )
}

export default View
