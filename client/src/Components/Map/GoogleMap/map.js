import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import key from '../../../keys';

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

        const points = [
            { lat: 42.02, lng: -77.01 },
            { lat: 42.03, lng: -77.02 },
            { lat: 41.03, lng: -77.04 },
            { lat: 42.05, lng: -77.02 }
        ]
    
        let bounds = new this.props.google.maps.LatLngBounds();
    
        for (let i = 0; i < points.length; i++) {
          bounds.extend(points[i]);
        }

        return (
            <Map 
                google={this.props.google} 
                zoom={14} 
                initialCenter={{
                    lat: 39.7392,
                    lng: -104.9903
                }}
                bounds={bounds}>
                
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
    apiKey: key.GOOGLE
})(MapContainer);