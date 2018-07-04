import React, { Component } from 'react';
import './Login.css';
import GoogleLogin from 'react-google-login';
import Background from './background_image.jpg';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false,
      userName: "NA",
      userEmail: "xxx@a.com",
      userProfileURL: "http://",
      sessionKey: "LALALA",
      redirect:false
    };
  }
  
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }
  setSessionId = (sId)=>{
    this.setState({
      sessionKey:sId
    });
  }
  responseGoogle = (response)=>{
    console.log(response.profileObj);
    fetch("http://webdemo.nctu.me:5000/registration/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_token: response.tokenObj.id_token,
        email: response.profileObj.email,
        familyName: response.profileObj.familyName,
        givenName: response.profileObj.givenName,
        imageUrl: response.profileObj.imageUrl
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(response);
        if (result.loginStatus === 'success') {
          console.log("login success!");
          this.setState({
            isLogined: true,
            userName: response.profileObj.name,//.replace(/\s+/g, '_'),
            userEmail: response.profileObj.email,
            userProfileURL: response.profileObj.imageUrl,
            sessionKey: result.sessionId
          });
          this.setSessionId(result.sessionId);
          console.log(this.state)
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    var sectionStyle = {
      // backgroundImage: `url(${Background})`
    };
    const redirect = this.state.redirect;

    if (redirect) {
      return (<Redirect to={{
        pathname: '/menu',
        state: { userInfo: this.state }
      }}/>);
    }else{
      return (
        <div className="container-fluid h-100 " style={sectionStyle}>
          <div className="row text-center h-100">
            <div className="col-lg-8 my-auto col-centered">
              <div className="card col-md-5 mx-auto">
                <div className="card-body">
                  <h1 className="card-title">大鼓の達人</h1>
                  <GoogleLogin
                    clientId="996100624897-1o5d50v1lnk813m8vu1q71h5anov542v.apps.googleusercontent.com"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}>
                    <i className="fab fa-google"></i>  Google Login
                </GoogleLogin>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
  }
}
export default Login;
