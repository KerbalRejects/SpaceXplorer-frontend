import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './CSS/Header.scss'; 
import { useAuth0 } from "@auth0/auth0-react";
import { Link  } from "react-router-dom";

const Header = (props) => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    function handleCheck(){
        if(!isAuthenticated){
            loginWithRedirect()
        }
    }
        return(
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">SpaceXplorer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link as = {Link} to = '/' onClick = {handleCheck}>Home</Nav.Link>
                            <Nav.Link as = {Link} to = '/about' onClick = {handleCheck}>About</Nav.Link>
                            <Nav.Link as = {Link} to = '/profile' onClick = {handleCheck}>Profile</Nav.Link>
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => {
                                    logout({ 
                                        logoutParams: {
                                            returnTo: window.location.origin
                                        }
                                    })
                                }}>Logout</NavDropdown.Item>
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
export default Header;
