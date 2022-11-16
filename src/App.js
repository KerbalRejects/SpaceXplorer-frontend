import React from 'react'
import Footer from './Components/Footer';
import Main from './Components/Main';
import Profile from './Components/Profile';
import About from './Components/About';
import Header from './Components/Header';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';


import {
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
      {console.log(this.props.auth0.isAuthenticated)}
      {this.props.auth0.isAuthenticated ? <>
        
          {/* <Header /> */}
          <Routes>
            <Route
              path='/'
              element={<Main />}
            ></Route>

            <Route
              path="/profile"
              element={<Profile />}
            ></Route>

            <Route
              path='/about'
              element={<About />}
            ></Route>

          </Routes>

          {/* <Footer /> */}
          
        <Footer />
      </>
      :
      <Login/>
      }
      </>
    )
  }

}

export default withAuth0(App);
