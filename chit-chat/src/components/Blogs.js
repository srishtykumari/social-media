import React from "react";
import Badge from "./Badge";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
const Blogs = ({
  title,
  category,
  description,
  id,
  imageUrl,
  excerpt,
  handleDelete,
  onLikeButtonClick
}) => {
  return (
    
      <MDBCol size="4">
        <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            src={imageUrl}
            alt={title}
            position="top"
            style={{ maxWidth: "100%", height: "180px" }}
          />
          <MDBCardBody>
            <MDBCardTitle>{title}</MDBCardTitle>
            <MDBCardText>
              {excerpt(description)}
              <Link to={`/view/${id}`}>Read More</Link>
            </MDBCardText>
            <Badge>{category}</Badge>

            <span>
            <MDBBtn
                className="mt-1"
                tag="a"
                color="none"
                onClick={() => onLikeButtonClick(id)}
              >
              <MDBIcon
                fas
                icon="thumbs-up"
                style={{ marginLeft: "20px" }}
                size="lg"
              />
              </MDBBtn>
              <MDBIcon
                fas
                icon="comment"
                style={{ color: "#55acee", marginLeft: "20px" }}
                size="lg"
              />
              <MDBBtn
                className="mt-1"
                tag="a"
                color="none"
                onClick={() => handleDelete(id)}
              >
                <MDBIcon
                  fas
                  icon="trash"
                  style={{ color: "#dd4b39",marginLeft: "120px" }}
                  size="lg"
                />
              </MDBBtn>
             
              <Link to={`/addeditpost/${id}`}>
                <MDBIcon
                  fas
                  icon="edit"
                  style={{ color: "#55acee", marginLeft: "10px" }}
                  size="lg"
                />
              </Link>
            </span>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
  );
};

export default Blogs;
