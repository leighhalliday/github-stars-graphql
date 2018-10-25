import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "@progress/kendo-react-buttons";
import styled from "styled-components";

const Control = styled(Button)`
  margin-right: 5px;
`;

const UPDATE_STARRED_CONTROLS = gql`
  mutation UpdateStarredControls($numRepos: Int!) {
    updateStarredControls(numRepos: $numRepos) @client
  }
`;

const StarredControls = ({ numRepos }) => (
  <div>
    View{" "}
    <Mutation mutation={UPDATE_STARRED_CONTROLS}>
      {updateStarredControls => (
        <Fragment>
          {[10, 20, 30].map(num => (
            <Control
              onClick={() => {
                updateStarredControls({ variables: { numRepos: num } });
              }}
              key={num}
            >
              {numRepos === num ? <strong>{num}</strong> : num}
            </Control>
          ))}
        </Fragment>
      )}
    </Mutation>{" "}
    Repos
  </div>
);

export default StarredControls;
