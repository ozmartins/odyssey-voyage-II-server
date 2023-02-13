const { GraphQLError } = require('graphql');

const AuthenticationError = () => {
    return new GraphQLError("You must to be logged in", { extensions: { code: "UNAUTHETICATED" } })
}

const ForbidenError = (errorMessage) => {
    return new GraphQLError(errorMessage, { extension: { code: "FORBIDEN" } })
}

module.exports = { AuthenticationError, ForbidenError }