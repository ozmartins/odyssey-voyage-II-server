const { GraphQLError } = require('graphql');

const AuthenticationError = () => {
    return new GraphQLError("You aren't logged in", {
        extensions: {
            code: "UNAUTHENTICADED"
        }
    })
}

module.exports = { AuthenticationError };