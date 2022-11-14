import React from 'react';
import favorite from './Favorite'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Loader from './Loader';
import LocSearchModal from './LocSearchModal';
import { withAuth0 } from '@auth0/auth0-react';

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
      favorites:[],
      favoriteConfig: {}
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
      showLocSearchModal: false,
      showLocData: false
    }, () => console.log('this.state: ', this.state));

    const config = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/location?location=${searchForm.location}&date=${searchForm.date}&time=${searchForm.time}`
      
      
    }
    console.log('handleSearchLocation config: ', config);
    this.setState({showLoader: 'visible'});
    const response = await axios(config);
    console.log('handleSearchLocation response', response);
    this.setState({ locations: response.data });
    
    setTimeout(() => {
      this.setState({showLocData: true, showLoader: 'hidden'});
      
      console.log('Response in setState: ', this.state.locations, 'Response in setState for favorite config: ', this.state.favoriteConfig);
    }, 5000);
    
  }
  
  handleCreateFavorite = async () => {
    
      
   
    console.log(this.favorite())
    try {
      if (this.props.auth0.isAuthenticated) {
        const response = await this.props.auth0.getIdTokenClaims();
        const jwt = response.__raw;
  
        console.log('token: ', jwt);
  
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` }, // new lab 15
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/favorites',
          data: this.favorite()
        }
      

      const res = await axios(config);
      this.setState({ favorites: [...this.state.favorites, res.data] });
    }} catch(err) {
      console.error('Error is in the Main.js in the createFavorite Function: ', err);
      this.setState({ errMessage: `Status Code ${err.res.status}: ${err.res.data}`});
    }
  }
  render() {
    return (
      <>
        
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
          <>
          <img src={this.state.locations[2].imageUrl} alt="starmap"/> 
          <Button variant="primary" onClick={this.handleCreateFavorite}></Button>
          </> 
          : 
          <Loader visibility={this.state.showLoader}/>
        }  
        
      </>
    )
  }
}

export default withAuth0(Main);
