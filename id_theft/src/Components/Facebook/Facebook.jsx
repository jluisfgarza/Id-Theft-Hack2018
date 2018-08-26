import React, { Component, Fragment } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

// import facebookStyle from "../../Assets/jss/FacebookStyle";

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    imgArray: []
  };

  componentClicked = () => {
    console.log("clicked component");
  };

  responseFacebook = response => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  getFacebookData = () => {
    window.FB.api(
      "/me",
      "GET",
      { fields: "email,gender,id,photos{images}" },
      function(response) {
        if (response) {
          // console.log(
          //   response.photos.data.map(function(img) {
          //     return img.images[0].source;
          //   })
          // );
          axios
            .post(
              `https://api.infringement.report/2.0/search`,
              {
                images: response.photos.data.map(function(img) {
                  return img.images[0].source;
                }),
                list_label: response.id
              },
              { headers: { "x-api-key": "d7d9c0fada0bf4294da373362b4c1f4a" } }
            )
            .then(res => {
              console.log(res);
            });
        }
      }
    );
  };

  render() {

    // const { classes } = this.props;
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <Fragment>
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
          <button onClick={this.getFacebookData}>Click Me!</button>
        </Fragment>
      );
    } else {
      fbContent = (
        <Fragment>
          <FacebookLogin
            appId="1674319169346674"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </Fragment>
      );
    }

    return <Fragment> {fbContent} </Fragment>;
  }
}
