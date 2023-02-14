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
    Mutation: {
        updateProfile: async (_, { updateProfileInput }, { dataSources, userId }) => {
            if (!userId) throw AuthenticationError();
            try {
                const updatedUser = dataSources.accountsAPI.updateUser({ userId, userInfo: updateProfileInput });
                return {
                    code: 200,
                    success: true,
                    message: "Profile succesfuly updated",
                    user: updatedUser
                }
            } catch (e) {
                return {
                    code: 400,
                    success: false,
                    message: e
                }
            }
            return null;
        }
    },
    User: {
        __resolveType(user) {
            return user.role;
        },
    },
    Host: {
        __resolveReference: (user, { dataSources }) => {
            return dataSources.accountsAPI.getUser(user.id);
        }
    },
    Guest: {
        __resolveReference: (user, { dataSources }) => {
            return dataSources.accountsAPI.getUser(user.id);
        }
    },
};

module.exports = resolvers;