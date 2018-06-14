import React, { Component } from 'react';
import {Row, Col, Preloader, Card} from 'react-materialize';
// import logo from './logo.svg';
import Navibar from '../Header/navbar';
import MapG from './GoogleMap/map';
import CollapsibleSearchBar from '../Collapsible/SearchBar';

class MapPage extends Component {

  render(){

    return (
      <div>
        <CollapsibleSearchBar />
        <Row className="clearfix">
          <Col className="looInfo" s={3}>
            <div>
            <Col m={6} s={12}>
            <Card className='blue-grey darken-1' textClassName='white-text' title='Card title'>
            </Card>
            
            </Col>
            </div>
          </Col>
          <Col  className="looMap" s={8}>
            <div className="googleMap">
              <MapG />
          
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MapPage;
