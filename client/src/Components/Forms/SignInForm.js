import React, { Component } from 'react';
import {Row, Col, Input, Button, Toast} from 'react-materialize';
import 'whatwg-fetch';
import { setInStorage} from '../../utils/storage';
// import PropTypes from 'prop-types';


class SignInForm extends Component {

    constructor(){
        super();
        this.state = {
            signInEmail: '',
            signInPassword: '',
            signInError: false,
            errorMessage: '',
            token: ''
        };

        this.onTextBoxCHangeSignInEmail = this.onTextBoxCHangeSignInEmail.bind(this);
        this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);

        this.onSignIn = this.onSignIn.bind(this);
    }

    onSignIn() {
        // Grab state
        const {signInEmail, signInPassword, } = this.state;
        
        console.log(signInEmail, signInPassword, );

        
        // Post request to backend
        fetch('/account/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: signInEmail, password: signInPassword})
        }).then(res => {
            if(res.success){
                setInStorage('user_session', { token: res.token });
                this.setState({
                    signInError: res.success,
                    errorMessage: res.message,
                    token: res.token
                })
            }
        })
      }

    onTextBoxCHangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value,
        });
    }
    
    onTextBoxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value,
        });
    }

    render(){
        const {
            signInEmail,
            signInPassword,
            signInError,
            errorMessage
          } = this.state;

        return(

            
            <div className="login-form" >
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col offset="s3" s={6}>
                    <h3>Login</h3>
                        <Input type="email" ref="email" label="Email" value={signInEmail} onChange={this.onTextBoxCHangeSignInEmail} s={12} />
                        <Input type="password" ref="password" label="Password" value={signInPassword} onChange={this.onTextBoxChangeSignInPassword} s={12} />
                        <Button type="submit" waves="purple" onClick={this.onSignIn} >Sign In</Button>
                    </Col>
                {
                (signInError) ? (
                   <Toast toast={errorMessage}>
                   Toast
                   </ Toast>
                ) : (null)
                }   
                </Row>
            </div>
        );
    }
}

//prop-types example
// SignInForm.propTypes = {
//     optionalArray: PropTypes.arrays
// }

export default SignInForm;