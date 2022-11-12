import React from 'react';
// import Header from './Header';
// import Footer from './Footer';
import Main from './Main';
// import Profile from './Profile';
// import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>

          {/* <Header /> */}

          <Routes>

            <Route
              path='/'
              element={<Main />}
            ></Route>

            {/* <Route
              path="/profile"
              element={<Profile />}
            ></Route> */}

            {/* <Route
              path='/about'
              element={<About />}
            ></Route> */}

          </Routes>

          {/* <Footer /> */}
          
        </Router>
      </>
    )
  }
}

export default App;
