
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Flat from './components/flat';
import Marker from './components/marker';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flats : [],
            selectedFlat: null,
            search: '',
            allFlats: []
        };
    }

    componentDidMount(){
        fetch('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json')
            .then((response) => {
                return response.json()
            }).then((json) => {
                console.log('parsed json', json)
                this.setState({
                    flats : json,
                    allFlats: json
                });
            }).catch((ex) => {
                console.log('parsing failed', ex)
            })
        }

    selectFlat = (flat) => {
        this.setState({
            selectedFlat : flat
        })
    }
    handleSearch = (e) => {
        this.setState({
            search: e.target.value,
            flats: this.state.allFlats.filter((flat) => new RegExp(e.target.value,"i").exec(flat.name))
        });
    }

  render() {
      let center = {
          lat : 48.8566,
          lng: 2.3522
      }
      if(this.state.selectedFlat) {
          center = {
              lat: this.state.selectedFlat.lat,
              lng: this.state.selectedFlat.lng
          }
      }

      return (
        <div className="app">
            <div className="main">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={this.state.search}
                        onChange={this.handleSearch}
                    />
                </div>
                <div className="flats">
                    { this.state.flats.map((flat, i) => {
                        return <Flat
                            key={i}
                            flat={flat}
                            selectFlat={this.selectFlat} />
                    }) }
                </div>

            </div>
            <div className="map">
                <GoogleMapReact
                    // bootstrapURLKeys={{ key: /* YOUR KEY HERE */a }}
                    defaultCenter={center}
                    center={center}
                    defaultZoom={13}
                    >
                        {this.state.flats.map((flat, i) => {
                            return <Marker
                                key={i}
                                lat={flat.lat}
                                lng={flat.lng}
                                text={flat.price}
                                selected = { flat === this.state.selectedFlat }
                            />
                        })}
                </GoogleMapReact>
            </div>

        </div>
        );
    }
}

export default App;
