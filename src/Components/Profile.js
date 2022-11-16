import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/Container'
import './CSS/Profile.scss'
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            favorites: []
        }
    }
    componentDidMount = async () => {
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            console.log(res);
            const jwt = res.__raw;
            console.log(jwt);
            const config = {
                headers: { "Authorization": `Bearer ${jwt}` },
                method: 'get', 
                baseURL: process.env.REACT_APP_SERVER,
                url: '/profile'
            }
            const response = await axios(config);
            this.setState({ favorites: response.data })
        }
    }
    render() {
        return (
            <div className="profileBody">
                <Container>
                    
                    <div className="cardDiv">
                        <div className="profileCard">
                            <img src={this.props.auth0.user.picture} alt=""/>
                            <h2>{this.props.auth0.user?.name}</h2>
                            <h5>{this.props.auth0.user.email}</h5>
                        </div>
                    </div>
                    
                    <Container>
                        {this.state.favorites.length ?(
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.state.favorites[5].favorites.astroData.astroMap} alt='astroMap'/>
                            <Card.Body>
                                <Card.Title>{this.props.auth0.name}{this.state.favorites[0].date}</Card.Title>
                                <Card.Text>Location: {this.state.favorites[5].favorites.location}</Card.Text>
                                <Card.Text>Date: {this.state.favorites[5].favorites.date}</Card.Text>
                                <Card.Text>Forecast: {this.state.favorites[5].favorites.weather.desc}</Card.Text>
                                <Card.Text>High temp: {this.state.favorites[5].favorites.weather.highTemp}</Card.Text>
                                <Card.Text>High temp: {this.state.favorites[5].favorites.weather.lowTemp}</Card.Text>
                                <Card.Text>{this.state.favorites[0].favorites.comment}</Card.Text>
                            </Card.Body>
                        </Card>)
                        : (
                            <h3 className="error">You Have No Favorites.</h3>
                        )}
                    </Container>
                </Container>
            </div>
        )
    }
}

export default withAuth0(Profile);