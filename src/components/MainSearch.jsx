import { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const MainSearch = () => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);

  const endpoint = 'http://api.openweathermap.org/geo/1.0/direct'
  const limit = 5;
  const apiKey = '179a9a0266358864f84a80a290948345';

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log(`${endpoint}?&q=${query}&limit=${limit}&appid=${apiKey}`);
      const response = await fetch(`${endpoint}?&q=${query}&limit=${limit}&appid=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      } else {
        alert('Error fetching results');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const buildLocationName = (location) => {
    const name = location.name;
    const countryState = location.state === undefined ? `${location.country}` : `${location.country} - ${location.state}`;

    return `${name} |${countryState}|`;
  }

  return (
    <>
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h2 className=''>Search for a city</h2>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Type here your state."
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {
            locations.map((location) => 
              (
                <Row key={location.lat + location.lon}
                  className="mx-0 mt-3 p-3"
                  style={{ border: '1px solid #00000033', borderRadius: 4 }}>
                  <Col>
                    <Link to={`weather?lat=${location.lat}&lon=${location.lon}`}>{buildLocationName(location)}</Link>
                  </Col>
                </Row>
              )
            )
          }
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default MainSearch;
