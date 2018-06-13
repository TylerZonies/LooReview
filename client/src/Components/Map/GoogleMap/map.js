import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    state = {
        selectedPlace: {
            name: "Denver, CO",
            // name: "Broomfield, CO"
        }
    }

    onMarkerClick() {
        alert("clicked");
    }

    render() {
        return (
            <Map 
                google={this.props.google} 
                zoom={14} 
                initialCenter={{
                    lat: 39.7392,
                    lng: -104.9903
                }}
                >

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAi9Qo2mlKhG3Lu40ymnJjObFmK3duDdIY"
})(MapContainer);