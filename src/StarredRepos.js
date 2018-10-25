import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Repository from "./Repository";
import StarredControls from "./StarredControls";

const STARRED_CONTROLS_QUERY = gql`
  query StarredControlsQuery {
    starredControls @client {
      numRepos
    }
  }
`;

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
        <Query query={STARRED_CONTROLS_QUERY}>
          {({ data: { starredControls } }) => (
            <Fragment>
              <StarredControls numRepos={starredControls.numRepos} />
              <Query
                query={STARRED_REPOS_QUERY}
                variables={{ numRepos: starredControls.numRepos }}
              >
                {({ data: repoData, loading }) => {
                  if (loading) {
                    return <span>Loading...</span>;
                  }

                  return repoData.viewer.starredRepositories.nodes.map(node => (
                    <Repository data={node} key={node.id} />
                  ));
                }}
              </Query>
            </Fragment>
          )}
        </Query>
      </div>
    );
  }
}
