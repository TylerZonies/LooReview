import React, {Component} from 'react';
import HomeSearch from '../SearchBar/homeSearch';
import { Row } from 'react-materialize';
// import CardItems from "../Maploop/googleList"
// import MapPage from './Components/Map/mapPage';



class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
           

        }
    }

    render(){
      
        return(
            <Row>
                {/* {MapItems} */}
                {/* <MapPage/> */}
                {/* <HomeSearch /> */}

            </Row>
        )
    }
}

export default HomePage