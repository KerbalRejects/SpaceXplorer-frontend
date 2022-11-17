import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class LocSearchModal extends React.Component {

  constructor() {
    super();
    this.state={
      currentDate: new Date().toISOString().slice(0,10),
      currentTime: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  const newSearch = {
    location: e.target.formLocation.value,
    date: e.target.formDate.value,
    time: e.target.formTime.value,
  }
  console.log("handletSubmit() newSearch: ", newSearch);
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
            <Form.Label>Where and when do you want to know what's up there?</Form.Label>
              <Form.Group controlId='formLocation'>
                <Form.Label>Enter your location</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Enter your location (e.g. Seattle)'
                />
              </Form.Group>
              <br />
              <Form.Group controlId='formDate'>
                <Form.Label>What date? (defaults to your current date)</Form.Label>
                <Form.Control
                  required
                  type='date'
                  defaultValue={this.state.currentDate}
                />
              </Form.Group>
              <br />
              <Form.Group controlId='formTime'>
                <Form.Label>What time of day/night? (defaults to your current time)</Form.Label>
                <Form.Control
                  required
                  type='time'
                  defaultValue={this.state.currentTime}
                />
              </Form.Group>
              <br />
              <Button type="submit" >Search</Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal >
    </>
  )
}
}

export default LocSearchModal;