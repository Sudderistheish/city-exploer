import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Card, Form, InputGroup } from "react-bootstrap";
import Weather from "./Weather";
import "./App.css";
const location_IQ_API_KEY = process.env.REACT_APP_LOCATIONIQ;
const backendUrl =
  process.env.REACT_APP_BACKENDURL || "http://localhost:3002/weather?";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cityDisplayName: "",
      cityLon: "",
      cityLat: "",
      imgPath: "",
      cityName: "",
      error: null,
      weatherData: [],
    };
  }
  handleOnChange = (e) => {
    this.setState({ cityName: e.target.value });
  };
  handleGetCity = async (e) => {
    try {
      let result = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${location_IQ_API_KEY}&q=${e.target.value}&format=json`
      );
      let data = result.data;
      this.setState({ error: null });

      this.setState(
        {
          citydisplayName: data[1].display_name,
          cityLat: data[1].lat,
          cityLon: data[1].lon,
        },
        async () => {
          let result = await axios.get(
            backendUrl +
              "lat=" +
              this.state.cityLat +
              "&lon=" +
              this.state.cityLon
          );
          console.log(result);
          this.setState({
            weatherData: result.data,
          });
        }
      );
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }

    // console.log(
    //   `https://us1.locationiq.com/v1/search?key=${location_IQ_API_KEY}&q=nashville&format=json`
    // );
  };

  render() {
    return (
      <>
        {this.state.error && (
          <Alert variant="danger"> {this.state.error} </Alert>
        )}
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
        <Weather />
      </>
    );
  }
}

export default App;
