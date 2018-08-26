import React, { Component, Fragment } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

export default class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  responseFacebook = response => {
    // console.log(response);

    this.setState({
      isLoggedIn: true
    });

    this.props.sendData({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });

    this.getFacebookData();
    // this.incandescentRequest();
  };

  getFacebookData = () => {
    window.FB.api(
      "/me",
      "GET",
      { fields: "email,gender,id,photos.limit(1){images}" },
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
                // images: response.photos.data.map(function(img) {
                //   return img.images[0].source;
                // }),
                images: [
                  "http://www.gstatic.com/tv/thumb/persons/589228/589228_v9_ba.jpg"
                ],
                list_label: response.id
              },
              { headers: { "x-api-key": "bef0c55ff68e3947df8bcc8859459754" } }
            )
            .then(res => {
              console.log(res);
              setTimeout(10, () => {
                console.log("Hola");
                axios
                  .get(
                    `https://api.infringement.report/2.0/list/${
                      res.data.list_id
                    }/query?use_ignore_lists=false&q=*`
                  )
                  .then(function(response) {
                    // handle success
                    console.log(response);
                  })
                  .catch(function(error) {
                    // handle error
                    console.log(error);
                  });
              });
            });
        }
      }
    );
  };

  incandescentRequest = () => {
    var self = this;
    window.FB.api(
      "/me",
      "GET",
      { fields: "email,gender,id,photos.limit(5){images}" },
      function(response) {
        if (response) {
          /*
          console.log(
            response.photos.data.map(function(img) {
              return img.images[0].source;
            })
          );
          */
          var incan_client = require("node-incandescent-client").client;
          var client = new incan_client(
            "7484",
            "a0c2a625a07d0eea3f39c515dc9e8817"
          );
          client.addImageUrl(
            "http://www.gstatic.com/tv/thumb/persons/589228/589228_v9_ba.jpg"
            // response.photos.data.map(function(img) {
            //   return img.images[0].source;
            // })
          );
          client.assemble();

          client.sendRequest(function(projectId) {
            console.log("ProjectID: " + projectId);

            client.getResults(projectId, function(data) {

              self.props.sendArray(data);
            });
          });
        }
      }
    );
  };

  render() {
    // const { classes } = this.props;
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = <Fragment />;
    } else {
      fbContent = (
        <Fragment>
          <FacebookLogin
            appId="1674319169346674"
            autoLoad={true}
            fields="name,email,picture"
            // onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </Fragment>
      );
    }

    return <Fragment> {fbContent} </Fragment>;
  }
}
