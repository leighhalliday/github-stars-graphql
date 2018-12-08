import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./apolloClient";
import StarredRepos from "./StarredRepos";
import TokenForm from "./TokenForm";
import "./app.css";

class App extends Component {
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
        <div className="container">
          <h1>
            <span role="img" aria-label="starred">
              ⭐
            </span>{" "}
            Repos
          </h1>
          {token ? <StarredRepos /> : <TokenForm setToken={this.setToken} />}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
