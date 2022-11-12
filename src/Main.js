import React from 'react';
import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import LocSearchModal from './LocSearchModal';
// import { withAuth0 } from '@auth0/auth0-react';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      date:'',
      time:'',
      lat: '',
      lon: '',
      showLocSearchModal: false,
      errorMsg: '',
      locations: [],
    }
  }

  // componentDidMount = async () => {
  //   const config = {
  //     // FIXME: set default CRUD method
  //     method: 'get',
  //     baseURL: process.env.REACT_APP_SERVER,
  //     // FIXME: set url endpoint
  //     url: '/'
  //   }
  //   const response = await axios(config);
  //   console.log('data: ', response.data);
  //   // FIXME: verify this state is correct for app needs
  //   this.setState({ locations: response.data }); 
  // }

  handleOpenLocSearchModal = (event) => {
    this.setState({ showLocSearchModal: true });
  }
  handleCloseLocSearchModal = (event) => {
    this.setState({ showLocSearchModal: false });
  }

  handleSearchLocation = (searchForm) => {
    console.log(searchForm);
    this.setState({ 
      location: searchForm.location, 
      date: searchForm.date.value,
      time: searchForm.time
     });
     console.log(this.location);
     console.log(this.date);
     console.log(this.time);
  }

  render() {
    return (
      <>
        <img src="https://via.placeholder.com/468x60" alt="SpaceX-plorer logo" title="SpaceX-plorer logo" />
        <h2>SpaceX-plorer</h2>
        <p>Ipsum lorem this what this page does</p>
      
        <Button variant="primary" onClick={this.handleOpenLocSearchModal}>Search your location</Button>
      
        {this.state.showLocSearchModal &&
        <LocSearchModal
          handleSearchLocation={this.handleSearchLocation}
          showLocSearchModal={this.state.showLocSearchModal}
          handleCloseLocSearchModal={this.handleCloseLocSearchModal}
        />}
      
      </>
    )
  }
}

export default Main;
