// import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql",
//   request: operation => {
//     operation.setContext({
//       headers: {
//         Authorization: `bearer ${sessionStorage.getItem("token")}`
//       }
//     });
//   }
// });

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message}`
    );
  }
});

const authLink = setContext((_, { headers }) => {
  const context = {
    headers: {
      ...headers,
      Authorization: `bearer ${sessionStorage.getItem("token")}`
    }
  };
  return context;
});

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache
});

export default client;
