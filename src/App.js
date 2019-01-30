import React, { Component } from "react";
import axios from "axios";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";

class App extends Component {
  state = {
    latitude: "",
    loading: true,
    longitude: ""
  };

  getLocation = () =>
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544.json")
      .then(response =>
        this.setState({
          ...response.data,
          loading: false
        })
      );

  componentDidMount = () => this.getLocation();

  render() {
    const { latitude, loading, longitude } = this.state;

    const map = (
      <Map
        center={[latitude - 20, longitude - 10]}
        zoom={2}
        width={450}
        height={400}
      >
        <Marker anchor={[latitude, longitude]} payload={1} />
      </Map>
    );

    const loader = (
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    );

    return (
      <div className={loading ? "app app--loading" : "app"}>
        {loading ? (
          loader
        ) : (
          <>
            <h1 className="app__h1">ISS Location</h1>
            <p>
              <strong>Lat:</strong> {latitude},<strong>&nbsp;Lng:</strong>{" "}
              {longitude}
            </p>
            <div className="app-map">{map}</div>
            <button className="app-button" onClick={() => this.getLocation()}>
              Update location
            </button>
          </>
        )}
      </div>
    );
  }
}

export default App;
