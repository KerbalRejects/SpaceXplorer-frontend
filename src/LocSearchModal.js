import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class LocSearchModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const newSearch = {
      location: e.target.formLocation.value,
      date: e.target.formDate.value,
      time: e.target.formTime.value,
    }
    console.log("handletSubmit() newSearch: ", newSearch );
    this.props.handleSearchLocation(newSearch);
  }

  render() {
    return (

      <>

        <Modal show={this.props.showLocSearchModal} onHide={this.props.handleCloseLocSearchModal}>

          <Modal.Header closeButton>
            <Modal.Title>SOME TITLE GOES HERE</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Container>

              <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId='formLocation'>
                  <Form.Label>Enter your location</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your location (e.g. Seattle)'
                  />
                </Form.Group>

                <Form.Group controlId='formDate'>
                  <Form.Label>What date are you searching for?</Form.Label>
                  <Form.Control
                    required
                    type='date'
                  />
                </Form.Group>

                <Form.Group controlId='formTime'>
                  <Form.Label>What time are you searching for?</Form.Label>
                  <Form.Control
                    required
                    type='time'
                  />
                </Form.Group>

                <br />
                <Button type="submit" >Search</Button>

              </Form>

            </Container>

          </Modal.Body>

          {/* <Modal.Footer>
            <Button onClick={this.props.handleCloseLocSearchModal}>
              Close
            </Button>
          </Modal.Footer> */}

        </Modal >

      </>

    )
  }
}

export default LocSearchModal;