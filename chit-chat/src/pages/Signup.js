import React,{useState,useEffect} from 'react';
import {toast} from "react-toastify";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    
  }
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [username, usernamechange] = useState("");
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState(""); 
    const [reppassword, reppasswordchange] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    
      fetch('http://localhost:3000/user') 
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }, []);


    const IsValidate=()=>{
        console.log("validation is called")
        let isproceed= true;
        let errormessage = 'please enter the value in';
        if(username === null || username === ''){
            isproceed = false;
            errormessage += ' Username';
            
        }
        if(email === null || email === ''){
            isproceed = false;
            errormessage += ' Email';
          
        }
        if( password === null || password  === ''){
            isproceed = false;
            errormessage += ' Password ';
           
        }
        if( reppassword === null ||  reppassword === ''){
            isproceed = false;
            errormessage += ' Reppassword';
        
        }
        if(!isproceed){
            toast.warning(errormessage)
        } else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
      
            } else{
              isproceed = false;
              toast.warning('please enter the valid email')
            }
          }


          if (users.some((user) => user.email === email)) {
            isproceed = false;
            toast.warning('Email is already in use');
          }
        

          // check if the passwords match

        if (password !== reppassword){
          isproceed = false;
          toast.warning('Passwords don not match');
        }

        return isproceed;
    };

    const handlesubmit=(e)=>{
        e.preventDefault();
        let uniqueId = "id" + Math.random().toString(16).slice(2);
        let regobj={uniqueId,username,email,password,reppassword};
        if(IsValidate()){
        // console.log(regobj);
        fetch(" http://localhost:3000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(regobj)
        }).then((res)=>{
           toast.success('Registered successfully.')
           navigate('/login')
        }).catch((err)=>{
          toast.error('Failed:'+err.message);
        });
    }
    }

     

  return (
    <div>
  

    <MDBContainer className="signup-page" fluid  >

      <MDBCard className='text-black m-5' style={{borderRadius: '25px',backgroundColor:" #4f4f4f", paddingRight:"7vw"}}>
        <MDBCardBody>
        <form onSubmit={handlesubmit}>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput style={{backgroundColor:" rgb(162, 161, 160)",color:"black"}} value={username} onChange={e=>usernamechange(e.target.value)} label='User Name' id='form1' type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput style={{backgroundColor:" rgb(162, 161, 160)",color:"black"}} value={email} onChange={e=>emailchange(e.target.value)}  label='Your Email' id='form2' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput style={{backgroundColor:" rgb(162, 161, 160)",color:"black"}} value={password} onChange={e=>passwordchange(e.target.value)}   label='Password' id='form3' type='password'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput style={{backgroundColor:" rgb(162, 161, 160)",color:"black"}} value={reppassword} onChange={e=>reppasswordchange(e.target.value)}   label='Repeat your password' id='form4' type='password'/>
              </div>

              <div className="text-center text-md-start mt-2 pt-2">
              <MDBBtn className='mb-2' style={{backgroundColor:"#3498db",color:"white",padding:"10px 20px",marginLeft:"25px" }} >Sign up</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Log in with your account. <a href="/login" className="link-danger"> Log in </a></p>
              </div>
              
              
             
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>

    </div>
  )
}

export default Signup
