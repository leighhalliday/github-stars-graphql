const resolvers = {
  Mutation: {
    updateStarredControls: (_, { numRepos }, { cache }) => {
      const data = {
        starredControls: {
          __typename: "StarredControls",
          numRepos
        }
      };
      cache.writeData({ data });
      return data;
    }
  }
};

const defaults = {
  starredControls: {
    __typename: "StarredControls",
    numRepos: 20
  }
};

export default { resolvers, defaults };
