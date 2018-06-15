import React, {Component} from 'react';
import HomeSearch from '../SearchBar/homeSearch';
import { Row } from 'react-materialize';
// import CardItems from "../Maploop/googleList"
// import MapPage from './Components/Map/mapPage';



class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
           searchResponse: {},
           isSearched: false

        }

        this.passInfo = this.passInfo.bind();
    }

    passInfo(res){
        console.log(res);
        this.setState({
            searchResponse: res,
            isSearched: true
        });
    }


    render(){
      
        return(
            <Row>
                {
                    (isSearched) ? (
                         <MapPage response={this.state.searchResponse}/>
                    ) : ( <HomeSearch passInfo={passInfo.bind(this)}/>)
                }
                {/* <MapPage/> */}
                <HomeSearch />

            </Row>
        )
    }
}

export default HomePage