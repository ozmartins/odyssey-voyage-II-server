const { AuthenticationError } = require('./utils/errors');

const resolvers = {
    Query: {
        user: async (_, { id }, { dataSources }) => {
            const user = dataSources.accountsAPI.getUser(id);
            if (!user) {
                throw new Error(`No user found with id ${id}`);
            }
            return user;
        },
        me: async (_, __, { dataSources, userId }) => {
            if (!userId) {
                throw AuthenticationError();
            }
            const user = dataSources.accountsAPI.getUser(userId);
            return user;
        },
    },
    Mutation: {},
    User: {
        __resolveType(user) {
            return user.role;
        },
    },
    Host: {
        __resolveReferece: (user, { dataSources }) => {
            return dataSources.accountsAPI.getUser(user.id);
        }
    },
    Guest: {
        __resolveReferece: (user, { dataSources }) => {
            return dataSources.accountsAPI.getUser(user.id);
        }
    },
};

module.exports = resolvers;