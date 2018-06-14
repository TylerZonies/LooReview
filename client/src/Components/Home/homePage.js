import React, {Component} from 'react';
import HomeSearch from '../SearchBar/homeSearch';
import { Row } from 'react-materialize';


class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        return(
            <Row>
                <HomeSearch />
            </Row>
        )
    }
}

export default HomePage