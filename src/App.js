import React, { Component, Suspense } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";
import apolloClient from "./apolloClient";
import StarredRepos from "./StarredRepos";
import TokenForm from "./TokenForm";
import Filters from "./Filters";
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
        <ApolloProviderHooks client={apolloClient}>
          <div className="container">
            <h1>
              <span role="img" aria-label="starred">
                ⭐
              </span>{" "}
              Repos
            </h1>
            {token ? (
              <Suspense fallback={<span>Suspense loading...</span>}>
                <Filters />
                <StarredRepos />
              </Suspense>
            ) : (
              <TokenForm setToken={this.setToken} />
            )}
          </div>
        </ApolloProviderHooks>
      </ApolloProvider>
    );
  }
}

export default App;
