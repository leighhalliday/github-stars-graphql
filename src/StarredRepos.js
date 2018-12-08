import React from "react";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import Repository from "./Repository";

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
  }
`;

export default function StarredRepos() {
  const { data } = useQuery(STARRED_REPOS_QUERY, {
    variables: { numRepos: 25 }
  });

  return data.viewer.starredRepositories.nodes.map(node => (
    <Repository data={node} key={node.id} />
  ));
}
