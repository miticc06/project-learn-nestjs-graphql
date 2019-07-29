import React, { Component } from 'react';
import NormalLoginForm from '../components/NormalLoginForm/NormalLoginForm'

class AuthPage extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>AuthPage</h1>
                <NormalLoginForm></NormalLoginForm>
            </React.Fragment>



        );
    }
}

export default AuthPage;