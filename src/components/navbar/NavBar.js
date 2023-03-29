import { useState, useEffect } from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import "./NavBar.css"
import Logo from "../../images/logo.png"
import Logout from "../logout/Logout"

function NavigationBar() {

  const [nameUser, setNameUser] = useState("");
  const [image, setImage] = useState(null);
  const [key, setKey] = useState(window.location.href.split("/")[3]);

  var roleUser = ""
    try {
        roleUser = JSON.parse(sessionStorage.getItem('myUserEntity'))["roleUser"]

        console.log("Роль текущего пользователя", roleUser)
    } catch(err) {
        roleUser = ""
  }

  useEffect(() => {
      if (sessionStorage.getItem('myUserEntity') !== null) {
        var user = JSON.parse(sessionStorage.getItem('myUserEntity'))
        console.log("USER:", user)
        setNameUser(`${user.family} ${user.name}`)
        setImage(user.imageUrl)
    } else {
        setNameUser("")
        setImage(null)
    }
  }, [])

  const ActiveStyle = {
    color: "white"
  };

  const inActiveStyle = {
    ...ActiveStyle,
    color: "gray"
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Container>
            <Navbar.Brand href="/analytics"> <img src={Logo} height="40px" alt="Logo"/>  </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse id='responsive-navbar-nav'>
            { sessionStorage.getItem('myUserEntity') !== null ?
                <Nav className="me-auto" activeKey={key} onSelect={key => setKey(key)} style={{marginTop: "-3px"}}>
                { roleUser === 'admin' ?
                  <>
                      <Nav.Link as={ Link } to="/analytics" eventKey="analytics" style={key === "analytics" || key === "results" ? ActiveStyle : inActiveStyle}> Аналитика </Nav.Link>
                      <Nav.Link as={ Link } to="/upload" eventKey="upload" style={key === "upload" ? ActiveStyle : inActiveStyle}> Загрузка модулей </Nav.Link>
                      <Nav.Link as={ Link } to="/manager" eventKey="manager" style={key === "manager" ? ActiveStyle : inActiveStyle}> Управление модулями </Nav.Link>
                      <Nav.Link as={ Link } to="/about" eventKey="about" style={key === "about" ? ActiveStyle : inActiveStyle}> О проекте </Nav.Link>
                  </>
                  : <>
                      <Nav.Link as={ Link } to="/analytics" eventKey="analytics" style={key === "analytics" || key === "results" ? ActiveStyle : inActiveStyle}> Аналитика </Nav.Link>
                      <Nav.Link as={ Link } to="/upload" eventKey="upload" style={key === "upload" ? ActiveStyle : inActiveStyle}> Загрузка модулей </Nav.Link>
                      <Nav.Link as={ Link } to="/about" eventKey="about" style={key === "about" ? ActiveStyle : inActiveStyle}> О проекте </Nav.Link>
                  </>
                }
                </Nav>
              : <div></div> }
                <Nav>
                  {image && (
                        <div className="elementRightNavBar">
                            <div className="nameAccount"> {nameUser} </div>
                            <NavDropdown 
                                title={
                                        <img className="iconAccountImage"
                                            src={image} 
                                            width="35px" height="35px"
                                            alt="user pic"
                                        />
                                } 
                                align="end"
                                className='dropdown-right'
                                >
                                <NavDropdown.Item> Профиль </NavDropdown.Item>
                                <NavDropdown.Item> <Logout /> </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;