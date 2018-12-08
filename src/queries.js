import gql from "graphql-tag";

const STARRED_REPOS_QUERY = gql`
  query StarredReposQuery($numRepos: Int) {
    viewer {
      id
      starredRepositories(last: $numRepos) {
        nodes {
          id
          name
          description
          pushedAt
          url
          languages(first: 5) {
            nodes {
              id
              color
              name
            }
          }
        }
      }
    }
    filters @client {
      language
    }
  }
`;

export { STARRED_REPOS_QUERY };
