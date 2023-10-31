import React,{useState} from 'react'
import img1 from "../images/chit-chat.png"
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
  } from 'mdb-react-ui-kit';

const Header = () => {
    const [show,setShow] = useState(false);
  return (
    <div>
       <MDBNavbar expand='lg' light style={{ backgroundColor: '#3498db', position:"sticky" }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img src={img1} alt="logo" style={{height:"50px", width:"50px"}}/>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShow(!show)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={show} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/' style={{color:"#fff",marginLeft:"20px"}}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/addeditpost'  style={{color:"#fff" }}>Add Post</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/uploadpic'  style={{color:"#fff" }}>Uploade Profile</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/friends'  style={{color:"#fff"}}>Friends</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/profile'  style={{color:"#fff"}}>profile</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/listfriends'  style={{color:"#fff"}}>Friend List</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'  style={{color:"#fff", marginLeft:"40vw"}}>Logout</MDBNavbarLink>
              </MDBNavbarItem>
             
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
     </div>
  )
}

export default Header
