import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Loader from './Loader';
import LocSearchModal from './LocSearchModal';
import { withAuth0 } from '@auth0/auth0-react';
import Container from 'react-bootstrap/esm/Container';
import SearchResults from './SearchResults';
import './CSS/Main.scss'


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
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: import.meta.env.VITE_APP_SERVER,
        url: '/'
      }
      const response = await axios(config);
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
    try {
      this.setState({
        location: searchForm.location,
        date: searchForm.date,
        time: searchForm.time,
        showLocSearchModal: false,
        showLocData: false,
        errorMsg: '',
        showLoader: 'visible'
      });

      const config = {
        method: 'get',
        baseURL: import.meta.env.VITE_APP_SERVER,
        url: `/location?location=${searchForm.location}&date=${searchForm.date}&time=${searchForm.time}`
      };

      console.log('Making API request with config:', config);
      const response = await axios(config);
      console.log('API Response:', response.data);

      if (!response.data || !Array.isArray(response.data) || response.data.length < 4) {
        throw new Error('Invalid response data structure');
      }

      this.setState({ 
        locations: response.data,
        showLoader: 'hidden',
        showLocData: true 
      });
    } catch (error) {
      console.error('Error in handleSearchLocation:', error);
      console.error('Error response:', error.response?.data);
      this.setState({
        errorMsg: error.response?.data?.message || 'An error occurred while fetching location data',
        showLoader: 'hidden',
        showLocData: false
      });
    }
  }
  handleCreateFavorite = async () => {
    window.alert("You have favorited this search!")
    const postConfig = {
      email: `${this.props.auth0.user.email}`,
      isFavorited: true,
      favorites: {
          location: `${this.state.locations[0].locationName}`,
          date: `${this.state.locations[0].cacheDate}`,
          astroData: {
                  astroMap: `${this.state.locations[2].imageUrl}`,
                  lat: `${this.state.locations[0].locationLat}`, 
                  lon: `${this.state.locations[0].locationLon}`,
                  },
          weather: {
                  desc: `${this.state.locations[3][0].description}`, 
                  lowTemp: `${this.state.locations[3][0].min_temp}`, 
                  highTemp: `${this.state.locations[3][0].high_temp}`
                  },
          comment: ''
      }
    } 
    try {
      if (this.props.auth0.isAuthenticated) {
        const response = await this.props.auth0.getIdTokenClaims();
        const jwt = response.__raw;
  
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'post',
          baseURL: import.meta.env.VITE_APP_SERVER,
          url: '/favorites',
          data: postConfig
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
      <div className="mainPage">
        <Container  fluid="md">
          <div className="searchBtn">
            <Button onClick={this.handleOpenLocSearchModal}>Search your location</Button>
          </div>
            <p className="welcome">Hello {this.props.auth0.user.name}! Welcome to SpaceXplorer. This app was created as a one-stop portal where you can plan your stargazing adventure. Simply login, set your search criteria, and you'll be presented with everything you need to know, mainly: what is in the sky, and what the weather will be.</p>
            {this.state.errorMsg && (
              <div className="alert alert-danger" role="alert">
                {this.state.errorMsg}
              </div>
            )}
            {this.state.showLocSearchModal &&
              <LocSearchModal
                handleSearchLocation={this.handleSearchLocation}
                showLocSearchModal={this.state.showLocSearchModal}
                handleCloseLocSearchModal={this.handleCloseLocSearchModal}
              />}
            {this.state.showLocData && this.state.locations && this.state.locations.length > 0 ?
              <>
                <div className="center-box">
                  <div className="animated-border-box-glow"></div>
                  <div className="animated-border-box">
                    <img src={this.state.locations[2]?.imageUrl} alt="starmap" />
                  </div>
                </div>
                <div className="favBtn">
                  <Button variant="primary" onClick={this.handleCreateFavorite}>Favorite search</Button>
                </div>
                <SearchResults locations={this.state.locations} />
              </>
              :
              <Loader visibility={this.state.showLoader}/>
            }
        </Container>
      </div>
        
      </>
    )
  }
}

export default withAuth0(Main);
