const resolvers = {
    Query: {
        featuredListings: (_, __, { dataSources }) => {
            return dataSources.listingsAPI.getFeaturedListings(3);
        }
    },
    Listing: {
        host: ({ hostId }) => {
            return { id: hostId };
        }
    }
};

module.exports = resolvers;