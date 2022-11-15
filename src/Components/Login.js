import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "react-bootstrap/Button"
import './CSS/Login.scss'
import Header from './Header'
import Footer from './Footer'


const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div id="loginPage">
        
      
        <img id="loginImage" src="" alt=""/>
        <div id="btn">
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        </div> 
        
        <Footer/>
      </div>
      

    </>
  
  
  
  );
};
export default Login;