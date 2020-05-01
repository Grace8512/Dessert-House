import React from "react";
import { useHistory} from "react-router-dom";
import Axios from "axios";
import GoogleLogin from 'react-google-login';

const SignIn = (props) => {
    const history = useHistory();
    const responseGoogle = (res) => {
        console.log(res);
        if(res.error){
            console.log("error!!");
        }else{
            // yay! logged in!
            console.log("login", res.profileObj);
            const profileData = (res.profileObj);
            props.onLogin(profileData);
            history.push(props.redirectUrl);
        }
        // const profileData = (res.profileObj);
        // isSignedIn = {true} if user sginedin successful.
        // passin state.isSignedIn to google login componenet as a prop. 
    }

    return (
        <>
        {/* <button onClick={onClickSignin}>Sign in</button>
        <button onClick={onClickSignup}>Sign up</button> */}
        <GoogleLogin
            clientId="633836193320-58ne77b6orcdts600rm6llqle3j19vkm.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}//func
            onFailure={responseGoogle}//func
            cookiePolicy={'single_host_origin'}//string
        />
        </>
    );
};

export default SignIn;