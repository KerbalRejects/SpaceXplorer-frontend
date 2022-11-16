import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/Container'
import './CSS/Profile.scss'
import { Button } from 'react-bootstrap';
import { faV } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            favorites: [],
            showCommentModal: false,


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

    handleDeleteFavorites = async (favoriteToBeDeleted) => {

        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;

            // leave this console here in order to grab your token for backend testing in Thunder Client
            console.log('token: ', jwt);

            try {
                const proceed = window.confirm('Do you wish to delete?');

                if (proceed) {
                    const config = {
                        headers: { "Authorization": `Bearer ${jwt}` },
                        method: 'delete',
                        baseURL: process.env.REACT_APP_SERVER,
                        url: `/profile/${favoriteToBeDeleted._id}`
                    }

                    const response = await axios(config);
                    console.log(response.data);
                    const updateFavorites = this.state.favorites.filter(favorites => favorites._id !== favoriteToBeDeleted._id);
                    this.setState({ favorites: updateFavorites });
                }
            } catch (error) {
                console.error('Error is in the profile in the deletefavorite', error);
                // axios sends more info about the error in a response object on the error
                this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}` });
            }
        }
    }

    handleUpdatefavorite = async (favoriteToBeUpdated) => {
        this.handleCloseCommentModal();
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;

            // leave this console here in order to grab your token for backend testing in Thunder Client
            console.log('token: ', jwt);

            try {
                const config = {
                    headers: { "Authorization": `Bearer ${jwt}` },
                    method: 'put',
                    baseURL: process.env.REACT_APP_SERVER,
                    url: `/profile/${favoriteToBeUpdated._id}`,
                    data: favoriteToBeUpdated
                }

                const response = await axios(config);
                console.log(response.data);
                const updatedFavorite = this.state.favorites.map(preExistingFavorite => {
                    if (preExistingFavorite._id === favoriteToBeUpdated._id) {
                        return favoriteToBeUpdated;
                    } else {
                        return preExistingFavorite;
                    }
                })
                this.setState({ favorites: updatedFavorite });
            } catch (error) {
                console.error('Error is in the profile.js in the updateFavorite Function: ', error);
                // axios sends more info about the error in a response object on the error
                this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}` });
            }
        }
    }

    handleOpenCommentModal = (event) => {
        this.setState({ showCommentModal: true });
    }
    handleCloseCommentModal = (event) => {
        this.setState({ showCommentModal: false });
    }

    handleSubmit = e => e.preventDefault();


    render() {
        return (

            <body className="profileBody">
                <>
                    <Modal show={this.state.showCommentModal} onHide={this.handleCloseCommentModal}>

                        <Form onSubmit={this.handleUpdatefavorite}>

                            <Form.Group controlId='commentForm'>

                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='add comments!'
                                />
                            </Form.Group>
                            <Button type="submit">Comment</Button>
                        </Form>

                    </Modal>
                </>

                <Container>

                    <div className="cardDiv">
                        <div className="profileCard">
                            <img src={this.props.auth0.user.picture} alt="" />
                            <h2>{this.props.auth0.user?.name}</h2>
                            <h5>{this.props.auth0.user.email}</h5>
                        </div>
                    </div>

              {this.state.favorites.map((favorite, i) =>
                    <Container>
                        {this.state.favorites.length ? (
                            <Card style={{ width: '18rem' }} key={favorite._id}>
                                {/* {console.log('asdfasdf' + this.state.favorites.favorites.astroData.astroMap)} */}
                                <Card.Img variant="top" src={this.state.favorites[i].favorites.astroData.astroMap} alt='astroMap' />
                                <Card.Body>
                                    <Card.Title>{this.props.auth0.name}{this.state.favorites[i].date}</Card.Title>
                                    <Card.Text>Location: {this.state.favorites[i].favorites.location}</Card.Text>
                                    <Card.Text>Date: {this.state.favorites[i].favorites.date}</Card.Text>
                                    <Card.Text>Forecast: {this.state.favorites[i].favorites.weather.desc}</Card.Text>
                                    <Card.Text>High temp: {this.state.favorites[i].favorites.weather.highTemp}</Card.Text>
                                    <Card.Text>High temp: {this.state.favorites[i].favorites.weather.lowTemp}</Card.Text>

                                    <Card.Text>{this.state.favorites[i].comment}</Card.Text>
                                
                                    <Button onClick={() => this.handleDeleteFavorites(favorite)}>Delete</Button>
                                </Card.Body>
                            </Card>)
                            : (
                                <h3>You Have No Favorites.</h3>
                            )}
                    </Container>
              )}
                </Container>

            </body>
        )
    }
}

export default withAuth0(Profile);