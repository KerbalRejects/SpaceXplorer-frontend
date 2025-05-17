import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/Container'
import './CSS/Profile.scss'
import { Button } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            favorites: [],
            showCommentModal: false,
            favoriteToBeUpdated: {}
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
                url: '/profile'
            }
            const response = await axios(config);
            this.setState({ favorites: response.data })
        }
    }


    handleDeleteFavorites = async (favoriteToBeDeleted) => {

        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;

            try {
                const proceed = window.confirm('Do you wish to delete?');

                if (proceed) {
                    const config = {
                        headers: { "Authorization": `Bearer ${jwt}` },
                        method: 'delete',
                        baseURL: import.meta.env.VITE_APP_SERVER,
                        url: `/profile/${favoriteToBeDeleted._id}`
                    }

                    await axios(config);
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
    
    handleUpdatefavorite = async (e) => {
        e.preventDefault();
        
        const favoriteToBeUpdated = e.target.commentForm.value;
        this.handleCloseCommentModal();
        if (this.props.auth0.isAuthenticated) {
            const res = await this.props.auth0.getIdTokenClaims();
            const jwt = res.__raw;


            try {
                const config = {
                    headers: { "Authorization": `Bearer ${jwt}` },
                    method: 'put',
                    baseURL: import.meta.env.VITE_APP_SERVER,
                    url: `/profile/${this.state.favoriteToBeUpdated._id}`,
                    data:  {
                        email: this.state.favoriteToBeUpdated.favorites.email,
                        isFavorited: true,
                        favorites: {
                          astroData: {
                            astroMap: this.state.favoriteToBeUpdated.favorites.astroData.astroMap,
                            lat: this.state.favoriteToBeUpdated.favorites.astroData.lat,
                            lon: this.state.favoriteToBeUpdated.favorites.astroData.lon
                          },
                          weather: { desc: this.state.favoriteToBeUpdated.favorites.weather.desc, lowTemp: this.state.favoriteToBeUpdated.favorites.weather.lowTemp, highTemp: this.state.favoriteToBeUpdated.favorites.weather.highTemp },
                          location: this.state.favoriteToBeUpdated.favorites.location,
                          date: this.state.favoriteToBeUpdated.favorites.date,
                          comment: favoriteToBeUpdated
                        },
                    
                      }
                }
            
                const response = await axios(config);
                const updatedFavorite = this.state.favorites.map(preExistingFavorite => {
                    if (preExistingFavorite._id === response.data._id) {
                        
                        return response.data;
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

    handleOpenCommentModal = (favorite) => {
        this.setState({ showCommentModal: true,
            favoriteToBeUpdated: favorite
            
         });
        
    }


    handleCloseCommentModal = (event) => {
        this.setState({ showCommentModal: false });
        
        
    }

    

    render() {
        return (

            <div className="profileBody">
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
                            <Button type="submit" >Comment</Button>
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
                    <Row sm={1} md={2} lg={3} xl={4} xxl={5}>
              {this.state.favorites.map((favorite, i) =>
                    <Container>
                        <Col>
                        {this.state.favorites.length ? (
                            <Card style={{ width: '18rem' }} key={favorite._id + 1}>
                                <Card.Img variant="top" src={this.state.favorites[i].favorites.astroData.astroMap} alt='astroMap' />
                                <Card.Body>
                                    <Card.Title>{this.props.auth0.name}{this.state.favorites[i].date}</Card.Title>
                                    <Card.Text>Location: {this.state.favorites[i].favorites.location}</Card.Text>
                                    <Card.Text>Date: {this.state.favorites[i].favorites.date}</Card.Text>
                                    <Card.Text>Forecast: {this.state.favorites[i].favorites.weather.desc}</Card.Text>
                                    <Card.Text>High temp: {this.state.favorites[i].favorites.weather.highTemp}</Card.Text>
                                    <Card.Text>Low temp: {this.state.favorites[i].favorites.weather.lowTemp}</Card.Text>

                                    <Card.Text>{this.state.favorites[i].favorites.comment}</Card.Text>
                                    <Button className="comment"onClick={() => this.handleOpenCommentModal(favorite)}>Comment</Button>
                                
                                    <Button className="delete"onClick={() => this.handleDeleteFavorites(favorite)}>Delete</Button>
                                </Card.Body>
                            </Card>)
                            : (
                                <h3>You Have No Favorites.</h3>
                            )}
                        </Col>
                    </Container>

              )}
                </Row>
                </Container>

            </div>

        )
    }
}


export default withAuth0(Profile);
