import React from "react";
import { useQuery } from "react-apollo-hooks";
import Repository from "./Repository";
import { STARRED_REPOS_QUERY } from "./queries";

const filterRepos = (repoNodes, selectedLanguage) => {
  if (!selectedLanguage) {
    return repoNodes;
  }

  return repoNodes.filter(repoNode => {
    return repoNode.languages.nodes
      .map(langNode => langNode.name)
      .includes(selectedLanguage);
  });
};

export default function StarredRepos() {
  const { data } = useQuery(STARRED_REPOS_QUERY, {
    variables: { numRepos: 25 }
  });
  const selectedLanguage = data.filters.language;

  return filterRepos(
    data.viewer.starredRepositories.nodes,
    selectedLanguage
  ).map(node => <Repository data={node} key={node.id} />);
}
