const resolvers = {
    Query: {
        featuredListings: (_, __, { dataSources }) => {
            return dataSources.listingsAPI.getFeaturedListings(3);
        }
    },
    Listing: {
        host: ({ hostId }) => {
            return { id: hostId };
        },
        totalCost: async ({ id }, { checkInDate, checkOutDate }, { dataSources }) => {
            const { totalCost } = await dataSources.listingsAPI.getTotalCost({ id, checkInDate, checkOutDate });
            return totalCost || 0;
        }
    }
};

module.exports = resolvers;