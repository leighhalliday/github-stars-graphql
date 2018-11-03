import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

const STATUS_QUERY = gql`
  query statusQuery {
    status @rest(path: "/", type: "Status", endpoint: "githubstatus") {
      status
    }
  }
`;

const StatusLabel = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export default function Status() {
  return (
    <Query query={STATUS_QUERY}>
      {({ data, loading }) => {
        if (loading) {
          return <StatusLabel>loading...</StatusLabel>;
        }
        return <StatusLabel>{data.status.status}</StatusLabel>;
      }}
    </Query>
  );
}
