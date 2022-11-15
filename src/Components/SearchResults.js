import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

class SearchResults extends React.Component {
  render() {
    return (
      <Container>
        <Accordion>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Weather Forecast for your location: {this.props.locations[0][0].locationName}</Accordion.Header>
            <Accordion.Body>
              Date: {this.props.locations[3][0].date}<br />
              Forecast: {this.props.locations[3][0].description}
            </Accordion.Body>
            {/* <Accordion.Body>
              <Row>
                {this.props.locations.slice(3, 4).map(curForecast => (
                  <Col>
                    <Forecast
                      forecast={curForecast}
                    />
                  </Col>
                ))}
              </Row>
            </Accordion.Body> */}
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Locations of objects in our solar system as viewed from your location.</Accordion.Header>
            <Accordion.Body>
              <Row sm={1} md={2} lg={3} xl={4} xxl={5}>
                {this.props.locations[1].table.rows.map(curAstroObject => (
                  <Col>
                    <AstroObject
                      astroObject={curAstroObject}
                    />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </Container>
    )
  }
}

// class Forecast extends Component {
//   render() {
//     console.log('forecast :', this.props.forecast);
//     const forecast = this.props.forecast;
//     return (
//       <Card key={forecast.date}>
//         <Card.Body>
//           <Card.Text><b>Date</b>: {forecast.date}</Card.Text>
//           <Card.Text><b>Forecast</b>: {forecast.description}</Card.Text>
//         </Card.Body>
//       </Card>
//     );
//   }
// }

class AstroObject extends Component {
  render() {
    const astroObject = this.props.astroObject;
    return (
      <Card key={astroObject.cells[0].distance.fromEarth.au} className="h-100">
        <Card.Body>
          <Card.Title>{astroObject.entry.name}</Card.Title>
          <Card.Text><b>Dist. from Earth</b>: {astroObject.cells[0].distance.fromEarth.km} km</Card.Text>
          <Card.Text><b>Magnitude</b>: {astroObject.cells[0].extraInfo.magnitude}</Card.Text>
          <Card.Text><b>Constellation</b>: {astroObject.cells[0].position.constellation.name}</Card.Text>
          <Card.Text><b>Right Ascension</b>: {astroObject.cells[0].position.equatorial.rightAscension.string}</Card.Text>
          <Card.Text><b>Declination</b>: {astroObject.cells[0].position.equatorial.declination.string}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default SearchResults;
