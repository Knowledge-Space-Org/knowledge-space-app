import React, { Component } from "react";
import CookieConsent, {
  getCookieConsentValue,
  Cookies,
} from "react-cookie-consent";

import withRoot from "withRoot";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Main from "./Main";
import GA from "features/googleAnalytics/GoogleAnalytics";

const styles = (theme) => ({
  root: {
    textAlign: "center",
  },
});

class App extends Component {
  state = {
    isConsent: false,
  };

  componentDidMount() {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      this.setState({ isConsent: true });
    }
  }

  handleAcceptCookie = () => {
    this.setState({ isConsent: true });
  };

  handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.isConsent && GA.init() && <GA.RouteTracker />}
        <Main />
        <CookieConsent
          enableDeclineButton
          onAccept={this.handleAcceptCookie.bind(this)}
          onDecline={this.handleDeclineCookie.bind(this)}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App));
