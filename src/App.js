import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import Weather from './Weather';
const location_IQ_API_KEY = process.env.REACT_APP_LOCATIONIQ;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cityDisplayName: "",
      cityLon: "",
      cityLat: "",
      imgPath: "",
      cityName: "",
    };
  }
  handleOnChange = (e) => {
    
    this.setState ({cityName: e.target.value});
  };
  handleGetCity = async (e) => {
    console.log(e.target.value);
    //console.log("click");
    // console.log(
    //   `https://us1.locationiq.com/v1/search?key=${location_IQ_API_KEY}&q=nashville&format=json`
    // );
    let result = await axios.get(
      `https://us1.locationiq.com/v1/search?key=${location_IQ_API_KEY}&q=${e.target.value}&format=json`
    );
    let data = result.data;
    // console.log(data);
    this.setState({
      citydisplayName: data[1].display_name,
      cityLat: data[1].lat,
      cityLon: data[1].lon,
    });
  };

  render() {
    return (
      <>
        <Card>
          <Card.Title>{this.state.cityDisplayName}</Card.Title>
          <Card.Body>
            <p>latitude {this.state.cityLat}</p>
            <p>longitude {this.state.cityLon}</p>
          
            <InputGroup className="mb-3">
              <InputGroup.Text id="City-Name">City name</InputGroup.Text>
              <Form.Control
                placeholder="City Name"
                aria-label="City Name"
                aria-describedby="City-Name"
                onChange={this.handleOnChange}
              />
              <Button value={this.state.cityName} onClick={this.handleGetCity}>
                get City Data
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>

        {this.state.cityLat && (
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${location_IQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=18`}
          />
        )}
        <Weather/>
      </>
    );
  }
}

export default App;
