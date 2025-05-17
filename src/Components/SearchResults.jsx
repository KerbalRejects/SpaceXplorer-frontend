import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

class SearchResults extends React.Component {
  render() {
    const { locations } = this.props;
    
    if (!locations || !Array.isArray(locations) || locations.length < 4) {
      return null;
    }

    const locationInfo = locations[0] || {};
    const astroData = locations[1]?.table?.rows || [];
    const weatherData = locations[3] || [];

    return (
      <Container>
        <Accordion defaultActiveKey={['1', '2']} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Weather Forecast for {locationInfo.locationName}</Accordion.Header>
            <Accordion.Body>
              <Row xs={1} sm={2} md={3} lg={5}>
                {weatherData.map((forecast, index) => (
                  <Col key={index} className="mb-3">
                    <Forecast forecast={forecast} />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Solar System Objects Visible from {locationInfo.locationName}</Accordion.Header>
            <Accordion.Body>
              <Row xs={1} sm={2} md={3} lg={4}>
                {astroData.map((astroObject, index) => (
                  <Col key={index} className="mb-3">
                    <AstroObject astroObject={astroObject} />
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    );
  }
}

class Forecast extends Component {
  render() {
    const forecast = this.props.forecast;
    if (!forecast) return null;

    const iconUrl = `https://www.weatherbit.io/static/img/icons/${forecast.icon}.png`;
    
    return (
      <Card>
        <Card.Body>
          <Card.Text><b>Date</b>: {forecast.date}</Card.Text>
          <Card.Text>
            <b>Forecast</b>: {forecast.description}
            <img src={iconUrl} alt={forecast.description} style={{ marginLeft: '8px', width: '32px' }} />
          </Card.Text>
          <Card.Text><b>Low temp</b>: {forecast.min_temp}°F</Card.Text>
          <Card.Text><b>High temp</b>: {forecast.high_temp}°F</Card.Text>
          {forecast.sunrise && forecast.sunset && (
            <>
              <Card.Text><b>Sunrise</b>: {new Date(forecast.sunrise * 1000).toLocaleTimeString()}</Card.Text>
              <Card.Text><b>Sunset</b>: {new Date(forecast.sunset * 1000).toLocaleTimeString()}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    );
  }
}

class AstroObject extends Component {
  render() {
    const { astroObject } = this.props;
    if (!astroObject?.cells?.[0] || !astroObject?.entry) return null;

    const data = astroObject.cells[0];
    const { name } = astroObject.entry;

    return (
      <Card className="h-100">
        <Card.Body>
        
          <Card.Title style={{fontSize: '1.2rem', color: 'white'}}>{data.name}</Card.Title>
          {data.distance?.fromEarth?.km && (
            <Card.Text><b>Distance</b>: {Number(data.distance.fromEarth.km).toLocaleString()} km</Card.Text>
          )}
          {data.extraInfo?.magnitude && (
            <Card.Text><b>Magnitude</b>: {data.extraInfo.magnitude}</Card.Text>
          )}
          {data.position?.constellation?.name && (
            <Card.Text><b>Constellation</b>: {data.position.constellation.name}</Card.Text>
          )}
          {data.position?.equatorial?.rightAscension?.string && (
            <Card.Text><b>Right Ascension</b>: {data.position.equatorial.rightAscension.string}</Card.Text>
          )}
          {data.position?.equatorial?.declination?.string && (
            <Card.Text><b>Declination</b>: {data.position.equatorial.declination.string}</Card.Text>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default SearchResults;
