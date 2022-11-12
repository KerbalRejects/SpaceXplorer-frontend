import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class LocSearchModal extends React.Component {
  render() {
    return (

      <>

        <Modal show={this.props.showLocSearchModal} onHide={this.props.handleCloseLocSearchModal}>

          <Modal.Header closeButton>
            <Modal.Title>SOME TITLE GOES HERE</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Container>

              <Form onSubmit={this.onSumbit}>

                <Form.Group controlId='formLocation'>
                  <Form.Label>Enter your location</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your location (e.g. Seattle)'
                  />
                </Form.Group>

                <Form.Group controlId='formDate'>
                  <Form.Label>What Date are you searching for</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Enter your date (e.g. 2022-11-12)'
                  />
                </Form.Group>

                <br />
                <Button type="submit">Search</Button>

              </Form>

            </Container>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.handleCloseLocSearchModal}>
              Close
            </Button>
          </Modal.Footer>

        </Modal >

      </>

    )
  }
}

export default LocSearchModal;