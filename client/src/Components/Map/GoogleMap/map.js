import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import key from '../../../keys';

export class MapContainer extends Component {

    state = {
        selectedPlace: {
            name: "Denver, CO",
            markers: [{
                "location": {
                    "lat": 39.95651429999999,
                    "lng": -105.0361773
                },
                "name": "Subway Restaurants",
                "address": "3700 West 144th Avenue E-1200, Broomfield",
                "id": "60bf564c498e3d347c6912b3a5d3b7541fd7ae5d"
            },
            {
                "location": {
                    "lat": 39.95656990000001,
                    "lng": -105.0366854
                },
                "name": "Le Peep Broadlands",
                "address": "3700 West 144th Avenue, Broomfield",
                "id": "631a5429fc4bd7974dead616f16b780ddb6c6299"
            },
            {
                "location": {
                    "lat": 39.9615614,
                    "lng": -104.9959466
                },
                "name": "Red Robin Gourmet Burgers",
                "address": "799 West 146th Avenue, Broomfield",
                "id": "f83061a887f438c398ae4d9c15200b40d6aa13dd"
            },
            {
                "location": {
                    "lat": 39.959006,
                    "lng": -104.995703
                },
                "name": "Pizza Hut Express",
                "address": "14451 Orchard Parkway, Westminster",
                "id": "e1e4b6c67faf09db0544a69da1974a57bfea8fea"
            },
            {
                "location": {
                    "lat": 39.9624043,
                    "lng": -104.9939072
                },
                "name": "Marco's Pizza",
                "address": "14663 Orchard Parkway, Westminster",
                "id": "556306da221f60748397ff1f67e9b9c7a1143d88"
            },
            {
                "location": {
                    "lat": 39.961725,
                    "lng": -104.993976
                },
                "name": "Mt Fuji Japanese Hibachi",
                "address": "14643 Orchard Parkway, Westminster",
                "id": "c42c64f3db92b70c37fcecc4155bf14534b26d4a"
            },
            {
                "location": {
                    "lat": 39.96194270000001,
                    "lng": -104.9938756
                },
                "name": "Crushed Red",
                "address": "14643 Orchard Parkway #400, Westminster",
                "id": "d7ff41251816b9f6542276fb0609ecdd82c9bd1c"
            },
            {
                "location": {
                    "lat": 39.96144839999999,
                    "lng": -104.993877
                },
                "name": "Rusty Bucket Restaurant and Tavern",
                "address": "14613 Orchard Parkway, Westminster",
                "id": "bf3d49bdec0e10f3ec0b26cbb52601f9f62f2c9c"
            },
            {
                "location": {
                    "lat": 39.95707319999999,
                    "lng": -104.9950208
                },
                "name": "Noodles and Company",
                "address": "14375 Orchard Parkway, Westminster",
                "id": "5b6772a40cb375b7a228ea133ced3c295092ea2a"
            },
            {
                "location": {
                    "lat": 39.95708140000001,
                    "lng": -104.994913
                },
                "name": "Smashburger",
                "address": "14375 Orchard Parkway, Westminster",
                "id": "2c5fe28c018f80f63d85f515bba56a51a2758527"
            },
            {
                "location": {
                    "lat": 39.96260059999999,
                    "lng": -104.9929668
                },
                "name": "Rock Bottom Restaurant & Brewery",
                "address": "14694 Orchard Parkway Ste 400, Westminster",
                "id": "5a61975422852c7da7cb4d553fa32a6040b6b08b"
            },
            {
                "location": {
                    "lat": 39.9570786,
                    "lng": -104.9947534
                },
                "name": "Sugarfire Smoke House",
                "address": "14375 Orchard Parkway, Westminster",
                "id": "dbc8e7af5954b489cfbdc838f2e5ce0b6a50da0b"
            },
            {
                "location": {
                    "lat": 39.94446790000001,
                    "lng": -105.0125453
                },
                "name": "Corona's Mexican Grill",
                "address": "2255 West 136th Avenue, Broomfield",
                "id": "eda13b8379921617f5cee91277d3e4b1dce4aee4"
            },
            {
                "location": {
                    "lat": 39.9629573,
                    "lng": -104.9923523
                },
                "name": "Bitto Bistro",
                "address": "14697 Delaware Street #1000, Westminster",
                "id": "a17c297fabd17401480d505c93f9bb13c562eaf5"
            },
            {
                "location": {
                    "lat": 39.9443439,
                    "lng": -105.0121084
                },
                "name": "Go Fish Sushi(broomfield)",
                "address": "B106, 2055 West 136th Avenue, Broomfield",
                "id": "ff980f9fa430114ac9f6920705a8f529dba29ed3"
            },
            {
                "location": {
                    "lat": 39.9625883,
                    "lng": -104.992356
                },
                "name": "3 Margaritas - Orchard Mall",
                "address": "14697 Delaware Street, The Orchard Town Center, Westminster",
                "id": "01cd12bf31a88afa8fa9aac390487d2f4bb5764f"
            },
            {
                "location": {
                    "lat": 39.94406780000001,
                    "lng": -105.0130597
                },
                "name": "Papa Murphy's Take 'N' Bake Pizza",
                "address": "2355 West 136th Avenue suite c-118, Denver",
                "id": "b65ecab622ce795abb825261504e6159b69c9206"
            },
            {
                "location": {
                    "lat": 39.9563062,
                    "lng": -104.9942565
                },
                "name": "Coffee & Bagels",
                "address": "14315 Orchard Parkway Suite 600, Westminster",
                "id": "8764236bb334d1e4a7354ef5f94b6ffdaadfd140"
            },
            {
                "location": {
                    "lat": 39.9562226,
                    "lng": -104.9942585
                },
                "name": "Jimmy John's",
                "address": "14315 Orchard Parkway #500, Westminster",
                "id": "da4a0417b8a564130271532e0afaaefd396ce976"
            },
            {
                "location": {
                    "lat": 39.9441148,
                    "lng": -105.0116762
                },
                "name": "Saigon Dragon Asian Cuisine",
                "address": "2055 West 136th Avenue #154, Broomfield",
                "id": "ebc667ccbf5c24787e4f18f58dba3551b79990c0"
            }]
        }

    }

    onMarkerClick() {
        alert("clicked");
    }

    render() {

        const MarkerPins = this.state.selectedPlace.markers.map(location => {
            return (
                <Marker
                    title={location.name}
                    name={location.name}
                    position={{lat: location.location.lat, lng: location.location.lng}}
                    key={location.id}
                />
            )
        });

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
            <Map google={this.props.google}
            style={{width: '75%', height: '100%', position: 'relative'}}
            className={'map'}
            initialCenter={{
                "lat": 39.9651949,
                "lng": -105.0206757
            }}
            zoom={14}>
            {MarkerPins}
            <Marker onClick={this.onMarkerClick} name={'Current location'} />
            <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
            </InfoWindow>
            </Map>
        );
    }
}

console.log(process.env);

export default GoogleApiWrapper({
    apiKey: key.GOOGLE
})(MapContainer);