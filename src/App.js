import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./apolloClient";
import StarredRepos from "./StarredRepos";
import TokenForm from "./TokenForm";

export default class App extends Component {
  state = {
    token: null
  };

  componentDidMount() {
    this.setState({ token: sessionStorage.getItem("token") });
  }

  setToken = token => {
    sessionStorage.setItem("token", token);
    this.setState({ token });
  };

  render() {
    const { token } = this.state;

    return (
      <ApolloProvider client={apolloClient}>
        <h1>Starry Eyed</h1>
        {token ? <StarredRepos /> : <TokenForm setToken={this.setToken} />}
      </ApolloProvider>
    );
  }
}
