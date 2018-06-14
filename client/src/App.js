import dotenv from 'dotenv';
import React, { Component } from 'react';
import 'react-materialize';
// import logo from './logo.svg';
import { getFromStorage } from './utils/storage';
import './App.css';
import Navibar from './Components/Header/navbar';
import HomePage from './Components/Home/homePage'
import MapPage from './Components/Map/mapPage';
// import CollapsibleSearchBar from './Components/Collapsible/SearchBar';


class App extends Component {
  
  constructor(){

    super();
    this.state = {
      verifyLoading: false,
      searchTerms: '',
      searchResponse: {},
      isLoggedIn: false
    };

  }
  
  componentWillMount() {
    const session = getFromStorage('user_session')
    if(session && session.token){
      fetch('/account/verify?token=' + session.token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
          if(res.success){
            this.setState({
              isLoggedIn: true
            });
          } else {
            console.log(res.message);
          }
        })
    }

  }

  render() {
    return (
      <div className="page clearfix">
        <Navibar loggedIn={this.isLoggedIn}/>
            <MapPage />
          {/* <HomePage /> */}
      </div>
    );
  }
}

const result = dotenv.config();
console.log(result.parsed);


if (result.error){
  throw result.error;
}


export default App;

