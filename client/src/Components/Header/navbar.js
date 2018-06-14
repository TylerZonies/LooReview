import React, { Component } from 'react';
import {Navbar, NavItem, Button, SideNav, SideNavItem, Icon} from 'react-materialize';
import { getFromStorage, removeFromStorage } from '../../utils/storage';
import SignUpModal from '../Modal/SignUpModal';
import SignInModal from '../Modal/SignInModal';
import './navbar.css';
import logo from './img/golden-toilet.jpg';
import 'whatwg-fetch';


class Navibar extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage: "Home",
            isLoggedIn: this.props.isLoggedIn
        }

        this.onLogOut = this.onLogOut.bind(this);
        this.buttonSelect = this.buttonSelect.bind(this);
    }

    onLogOut(){
        const session = getFromStorage('user_session')

        fetch('/account/verify?token=' + session.token, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => {
              if(res.success){
                fetch('/account/logout?token=' + res.token, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
                }).then((response) => {
                    if(response.success){
                        removeFromStorage('user_session');
                        this.setState({
                            isLoggedIn:false
                        });
                        console.log(response.message)
                    } else {
                        console.log(response.message)
                    }
                })
              } else {
                console.log(res.message);
              }
            })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
      };

    buttonSelect = function(){
        console.log('here');
        if(this.props.loggedIn){ 
            return(
                <NavItem onClick={this.onLogOut}>
                    <p>Log Out</p>
                </NavItem>
            )
                                         
        } else {
        return[
           <NavItem key="A"><SignUpModal /></NavItem>,
           <NavItem key="B"><SignInModal /></NavItem>
        ]
        
        }
    }

    render(){

        return(
            <div className='navBar'>
                <Navbar style={{  background: '#80deea' }} brand='LooReview' right>
                {/* ask sarah about this shit its garbage */}
                    {this.buttonSelect()}
                    {/* <NavItem>
                        <SignUpModal />
                    </NavItem>
                    <NavItem>
                        <SignInModal />
                    </NavItem> */}
                    
                    <NavItem>
                        <SideNav
                            trigger={<Button style={{ height: '64px' }} className="sideNavButton"><Icon>menu</Icon></Button>}
                            options={{ closeOnClick: true }}>
                            <SideNavItem userView
                                user={{
                                background: logo,
                                image: 'https://scontent.fapa1-1.fna.fbcdn.net/v/t1.0-9/19904964_10213466963577435_2582372553199714267_n.jpg?_nc_cat=0&oh=73d1cb5ff0c1837dced802fe259d378b&oe=5BBCF013',
                                name: 'Tyler Zonies',
                                email: 'tylerzonies@gmail.com'
                                }}/>
                            <SideNavItem href='#' icon='face'>My Account</SideNavItem>
                            <SideNavItem divider />
                            <SideNavItem href='#' icon='favorite'>My Favorites</SideNavItem>
                            <SideNavItem divider />
                            <SideNavItem href='#' icon='build'>Admin Panel</SideNavItem>
                        </SideNav>
                    </NavItem>
                </Navbar>
            </div>

        );
    }
}

//prop-types example
// Navbar.propTypes = {
//     optionalArray: PropTypes.arrays
// }

export default Navibar;