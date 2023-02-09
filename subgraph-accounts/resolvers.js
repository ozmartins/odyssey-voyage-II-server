const resolvers = {
    user: async (_, { id }, { dataSources }) => {
    },
    me: async (_, __, { dataSources, userId }) => { }
};

module.exports = resolvers;