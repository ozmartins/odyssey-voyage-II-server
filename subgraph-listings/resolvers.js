const { AuthenticationError, ForbiddenError } = require('./utils/error')

const resolvers = {
    Query: {
        featuredListings: (_, __, { dataSources }) => {
            return dataSources.listingsAPI.getFeaturedListings(3);
        },
        listing: (_, { id }, { dataSources }) => {
            return dataSources.listingsAPI.getListing(id);
        },
        listingAmenities: (_, __, { dataSources }) => {
            return dataSources.listingsAPI.getAllAmenities()
        },
        hostListings: async (_, __, { dataSources, userId, userRole }) => {
            if (!userId) throw AuthenticationError();
            if (userRole == "Host")
                return dataSources.listingsAPI.getListingsForUser(userId)
            else
                throw ForbiddenError("Only hosts have access to listings");
        },
        searchListings: async (_, { criteria }, { dataSources }) => {
            const { numOfBeds, checkInDate, checkOutDate, page, limit, sortBy } = criteria;

            const listings = await dataSources.listingsAPI.getListings({ numOfBeds, page, limit, sortBy });

            // check availability for each listing
            /*const listingAvailability = await Promise.all(
                listings.map((listing) =>
                    dataSources.bookingsDb.isListingAvailable({ listingId: listing.id, checkInDate, checkOutDate })
                )
            );

            // filter listings data based on availability
            const availableListings = listings.filter((listing, index) => listingAvailability[index]);

            return availableListings;*/

            return listings;
        },
    },
    Listing: {
        host: ({ hostId }) => {
            return { id: hostId };
        },
        totalCost: async ({ id }, { checkInDate, checkOutDate }, { dataSources }) => {
            const { totalCost } = await dataSources.listingsAPI.getTotalCost({ id, checkInDate, checkOutDate });
            return totalCost || 0;
        }
    },
    AmenityCategory: {
        ACCOMMODATION_DETAILS: "Accommodation Details",
        SPACE_SURVIVAL: "Space Survival",
        OUTDOORS: "Outdoors"
    }
};

module.exports = resolvers;