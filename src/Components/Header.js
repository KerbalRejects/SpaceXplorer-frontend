import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './CSS/Header.scss'; 

class Header extends React.Component {
    render () {
        return(
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            // <>
            
            //     <h1> Auth0 Login</h1>
            //     {/* <LoginButton />
            //     <LogoutButton /> */}
            // </>
        )
    }
    

}

export default Header;
