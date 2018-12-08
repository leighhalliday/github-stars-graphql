import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";
import { STARRED_REPOS_QUERY } from "./queries";

const SET_LANGUAGE_FILTER = gql`
  mutation SetLanguageFilter($language: String) {
    setLanguageFilter(language: $language) @client
  }
`;

const extractLanguages = data => {
  const allLanguages = data.viewer.starredRepositories.nodes
    .map(repoNode => {
      return repoNode.languages.nodes.map(langNode => langNode.name);
    })
    .flat();

  return [...new Set(allLanguages)];
};

export default function Filters() {
  const setLanguageFilter = useMutation(SET_LANGUAGE_FILTER);
  const { data } = useQuery(STARRED_REPOS_QUERY, {
    variables: { numRepos: 25 }
  });
  const selectedLanguage = data.filters.language;
  const languages = extractLanguages(data);

  return (
    <div>
      {languages.map(language => (
        <button
          key={language}
          onClick={() => {
            setLanguageFilter({ variables: { language } });
          }}
        >
          {language === selectedLanguage ? (
            <strong>{language}</strong>
          ) : (
            language
          )}
        </button>
      ))}
      {selectedLanguage && (
        <button
          onClick={() => {
            setLanguageFilter({ variables: { language: null } });
          }}
        >
          clear
        </button>
      )}
    </div>
  );
}
