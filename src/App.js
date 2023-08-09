import React from "react";
import axios from "axios";

const LocationIQ = "pk.b99b913e08dd28f0dbe4264e6d67b898";
class App extends Component {
  constructor() {
    super();
    this.state = {
      cityDisplayName: "",
      cityLon: "",
      cityLat: "",
    };
  }

  handleGetNashville = async () => {
    console.log("click");
    let result = await axios.get(
      `https://us1.locationiq.com/v1/search?key=${location_IQ_API_KEY}&q=nashville&format=json`
    );
    let data = result.data;
    console.log(data);
    this.setState({
      citydisplayName: data[1].display_name,
      cityLat: data[1].lat,
      cityLon: data[1].lon,
    });
  };

  render() {
    return (
      <>
        <h3>{this.state.cityDisplayName}</h3>
        <p>latitude {this.state.cityLat}</p>
        <p>longitude {this.state.cityLon}</p>
        <img
          src={`https://maps.location.com/v3/staticmap?key=${location_IQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=18`}
          alt="City Map"
        />
        <button onClick={this.handleGetCity}>get City Data</button>
      </>
    );

    // <>
    //   <h3> {this.state.cityDisplayName} </h3>
    // <p>latitude {this.state.cityLat} </p>
    //   <p>longitude {this.state.cityLon} </p>
    //  <imgsrc = {`https://maps.location.com/v3/staticmap'
    //Key=${location_IQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=18`} />
    //<button onClick={this.handleGetCity} >get City Data</button>
  }
}

export default App;
