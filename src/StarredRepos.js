import React from "react";
import { Query } from "react-apollo";
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

export default class StarredRepos extends React.Component {
  render() {
    return (
      <div>
        <Query query={STARRED_REPOS_QUERY} variables={{ numRepos: 25 }}>
          {({ data, loading }) => {
            if (loading) {
              return <span>Loading...</span>;
            }

            return data.viewer.starredRepositories.nodes.map(node => (
              <Repository data={node} key={node.id} />
            ));
          }}
        </Query>
      </div>
    );
  }
}
