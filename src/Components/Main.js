import React from 'react';
import './CSS/Main.scss';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import LocSearchModal from './LocSearchModal';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      date: '',
      time: '',
      lat: '',
      lon: '',
      showLocSearchModal: false,
      showLocData: false,
      showLoader: 'hidden',
      errorMsg: '',
      locations: [],
    }
  }

  componentDidMount = async () => {

    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      console.log('token: ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get', // get is the default
        baseURL: process.env.REACT_APP_SERVER,
        url: '/' // endpoint
      }

      const response = await axios(config);
      console.log('DATA: ', response.data);
      this.setState({ locations: response.data });
    }
  }

  handleOpenLocSearchModal = (event) => {
    this.setState({ showLocSearchModal: true });
  }
  handleCloseLocSearchModal = (event) => {
    this.setState({ showLocSearchModal: false });
  }

  handleSearchLocation = async (searchForm) => {
    
    this.setState({
      location: searchForm.location,
      date: searchForm.date,
      time: searchForm.time,
      showLocSearchModal: false
    }, () => console.log('this.state: ', this.state));

    const config = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/location?location=${searchForm.location}&date=${searchForm.date}&time=${searchForm.time}`
      
      
    }
    console.log('handleSearchLocation config: ', config);
    const response = await axios(config);
    console.log('handleSearchLocation response', response);
    this.setState({ locations: response.data });
    this.setState({showLoader: 'visible'});
    setTimeout(() => {
      this.setState({showLocData: true, showLoader: 'hidden'});
      console.log('Response in setState: ', this.state.locations);
    }, 5000);
    
  }

  render() {
    return (
      <>
        <Header/>
        <h2>SpaceX-plorer</h2>
        <p>Ipsum lorem this what this page does</p>

        <Button variant="primary" onClick={this.handleOpenLocSearchModal}>Search your location</Button>

        {this.state.showLocSearchModal &&
          <LocSearchModal
            handleSearchLocation={this.handleSearchLocation}
            showLocSearchModal={this.state.showLocSearchModal}
            handleCloseLocSearchModal={this.handleCloseLocSearchModal}
          />}

        {this.state.showLocData ? 
          <img src={this.state.locations[2].imageUrl} alt="starmap"/> : <div style={{visibility: this.state.showLoader}} class="loader"></div>
          
        }  
        
      </>
    )
  }
}

export default withAuth0(Main);
