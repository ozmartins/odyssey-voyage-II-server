const resolvers = {
    Query: {
        example: () => "Olá mundo",
        featuredListings: (_, __, { dataSources }) => {
            return dataSources.listingsAPI.getFeaturedListings(3);
        }
    }
};

module.exports = resolvers;