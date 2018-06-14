import React, { Component } from 'react';
import {Modal, NavItem} from 'react-materialize';
import SignInForm from '../Forms/SignInForm';


class SignInModal extends Component {

    render(){

        return(

            <div className='modalLoo'>
                <Modal 
                    id='signIn'
                    trigger={<NavItem>Login</NavItem>}>
                    <SignInForm />
                </Modal>
            </div>

        );
    }
}


export default SignInModal;