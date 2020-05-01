import React from "react";
import { GoogleLogout } from 'react-google-login';

class SignOut extends React.Component{

    logoutFunc = () => {
        this.props.logout();
        this.props.history.push('/');
    }

    render(){
    return (
        <>
            <GoogleLogout
            clientId="633836193320-58ne77b6orcdts600rm6llqle3j19vkm.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={this.logoutFunc}
            >
            </GoogleLogout>
        </>
    )}

};

export default SignOut;