// Hero Styles

const heroStyle = theme => ({
  root: {
    marginTop: "15%",
    marginBottom: "100px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "70px"
    }
  },
  h1: {
    fontSize: "50px",
    lineHeight: "1.5em",
    [theme.breakpoints.down("xs")]: {
      fontSize: "36px"
    }
  },
  h3: {
    marginTop: "20px",
    marginBottom: "30px",
    fontSize: "24px",
    lineHeight: "1.5em",
    fontWeight: "300",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px"
    }
  },
  img: {
    maxWidth: "350px",
    margin: "0 auto",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "300px",
      marginTop: "30px"
    }
  },
  welcome: {
    marginTop: "150px",
    marginBottom: "70px",
    alignItems: "center",
    textAlign: "center"
  },
  picture: {
    borderRadius: "50px",
    height: "60px",
    width: "60px"
  },

  centerProgress: {
    marginLeft: "45%",
    marginRight: "0%"
    // marginBottom: "20%"
  },
  centerList: {
    marginLeft: "35%",
    marginRight: "0%"
    // marginBottom: "20%"
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "10%"
  },
  codeStyle: {
    marginLeft: "10%",
    marginRight: "10%",
    // maxWidth: "500px",
    padding: "20px",
    color: "black",
    backgroundColor: "lightGrey",
    overflow: "auto"
  },
  listItem: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: "lightGrey"
  }
});

export default heroStyle;
