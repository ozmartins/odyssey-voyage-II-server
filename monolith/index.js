const { ApolloServer } = require('@apollo/server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { readFileSync } = require('fs');
const gql = require('graphql-tag');
const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers')
const { startStandaloneServer } = require('@apollo/server/standalone');
const axios = require('axios');
const { AuthenticationError } = require('./utils/error');

async function startApolloServer() {

    const server = new ApolloServer({
        schema: buildSubgraphSchema({
            typeDefs,
            resolvers
        })
    })

    const context = async ({ req }) => {
        const token = req.headers.authorization || '';
        const userId = token.split(' ')[1];
        let userInfo = {};
        if (userInfo) {
            const { data } = await axios.get(`http://localhost:4011/login/${userId}`).catch(() => { throw AuthenticationError(); });
            userInfo = { userId: data.id, userRole: data.role };
        }
        return {
            userId: userInfo.userId,
            userRole: userInfo.userRole,
            dataSources: {
            }
        }
    }

    let { url } = await startStandaloneServer(server, {
        context,
        listen: { port: 4001 }
    });

    console.log("server running on --> ", url);
}

startApolloServer();