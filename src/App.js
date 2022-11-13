import React from 'react';

import About from './Components/About';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render (){
    return (
      <Router>
       
          <Routes>
            
            <Route exact path="/About" element={<About />}/>
      
            
   
          </Routes>

        </Router>
    )
  }
  
}

export default App;
