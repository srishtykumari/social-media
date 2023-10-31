import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate  } from "react-router-dom";



const Login = () => {
  const [username, usernameupdate] = useState("");
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:3000/user/");
      const users = await response.json();
      const getUser = users.filter((user) => user.username === username);
      if (getUser.length === 0) {
        toast.error("User not found");
      } else {
        if (getUser[0].email !== email) {
          toast.error("Please Enter right email");
        } else {
          if (getUser[0].password !== password) {
            toast.error("Please Enter valid credentials");
          } else {
            localStorage.setItem("user", JSON.stringify(getUser[0]));
            toast.success("Login successful");
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  return (
    <div className="login-page">
      <MDBContainer fluid className="p-3 my-5 h-custom ">
        <form onSubmit={loginHandler}>
          <MDBRow className="login-input">
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="pic"
              />
            </MDBCol>

            <MDBCol col="4" md="6">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <p className="lead fw-normal mb-0 me-3">Log in with</p>

                <MDBBtn floating size="md" tag="a" className="me-2">
                  <MDBIcon fab icon="facebook-f" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className="me-2">
                  <MDBIcon fab icon="twitter" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className="me-2">
                  <MDBIcon fab icon="linkedin-in" />
                </MDBBtn>
              </div>

              <div className="divider d-flex align-items-center my-2">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <MDBInput style={{backgroundColor:" rgb(162, 161, 160)",color:"black"}}
                value={username}
                onChange={(e) => usernameupdate(e.target.value)}
                wrapperClass="mb-4"
                label=" Your Name"
                id="formControlLg"
                type="text"
                size="lg"
              />
              <MDBInput style={{backgroundColor:" rgb(162, 161, 160)",color:"black"}}
                value={email}
                onChange={(e) => emailupdate(e.target.value)}
                wrapperClass="mb-4"
                label="email"
                id="formControlLg"
                type="text"
                size="lg"
              />
              <MDBInput style={{backgroundColor:" rgb(162, 161, 160)",color:"black"}}
                value={password}
                onChange={(e) => passwordupdate(e.target.value)}
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a style={{color:"white"}} href="!#">Forgot password?</a>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <button style={{backgroundColor:"#3498db",color:"white",padding:"10px 20px" }} className="mb-0 px-5" size="lg">
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?{" "}
                  <a href="/signup" className="link-danger">
                    Register
                  </a>
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    </div>
  );
};

export default Login;

