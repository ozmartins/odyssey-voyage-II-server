const { ApolloServer } = require('@apollo/server');
const { startStandAloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const AccountsAPI = require('./datasources/accounts');
const gql = require('graphql-tag');
const { readFileSync } = require('fs');

const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');

const server = new ApolloServer({
    schema: buildSubgraphSchema({
        typeDefs,
        resolvers
    })
});

const extractUserIdFromHeader = (req) => {
    const token = req.headers.authorization || '';
    return token.split(' ')[1]; //token example = "Bearer User-1"
}

const context = async ({ req }) => {
    const userId = extractUserIdFromHeader(req);
    const accountsAPI = new AccountsAPI();
    const { data } = accountsAPI.login(userId);
    return {
        userId: data.id,
        userRole: data.role,
        dataSources: {
            accountsAPI
        }
    }
};

const startApolloServer = async () => {
    const port = 4002;

    const options = {
        context,
        listen: port
    };

    const { url } = await startStandAloneServer(server, options);

    console.log(`accounts subgraph running at ${url}`);
}

startApolloServer();