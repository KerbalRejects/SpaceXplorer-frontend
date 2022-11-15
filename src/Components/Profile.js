import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            favorites: {}

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
                method: 'get', // get is the default
                baseURL: process.env.REACT_APP_SERVER,
                url: '/profile'
            }
            const response = await axios(config);
            console.log('DATA:', response.data);
            this.setState({ favorites: response.data })
        }
    }

    render() {
        const favorites = this.props.favorites;
        return (
            <>
                <article>
                    {this.props.auth0.user.picture && <img src={this.props.auth0.user.picture} alt={this.props.auth0.user?.name} />}
                    <h2>{this.props.auth0.user?.name}</h2>
                    <div>
                        <p classname='email'>{this.props.auth0.user.email}</p>
                        {/* {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]} </li>)} */}
                    </div>

                    <container>
                        {Object.keys(this.state.favorites).length ?(
                            <Card className="h-100">
                            {console.log('asdfasdf' + this.state.favorites.favorites.astroData.astroMap)}
                            <Card.Body>
                                <Card.Title>{this.props.auth0.name}{this.state.favorites.date}</Card.Title>
                                <Card.Text><img src=`${this.state.favorites.astroData.astroMap}` alt='astroMap' /></Card.Text>
                                <Card.Text>Date: {this.props.locations[3][0].date}<br />
                                    Forecast: {this.props.locations[3][0].description}</Card.Text>
                                <Card.Text>{this.state.favorites.comment}</Card.Text>
                            </Card.Body>
                        </Card>)
                        : (
                            <h3>You Have No Favorites...loser.</h3>
                        )}
                    </container>
                </article>
            </>
        )
    }
}

export default withAuth0(Profile);