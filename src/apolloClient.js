import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `bearer ${sessionStorage.getItem("token")}`
      }
    });
  }
});

export default client;
