const { AuthenticationError, ForbiddenError } = require('./utils/errors');

const resolvers = {
  // TODO: fill in resolvers
  Query: {
    bookings: (_, __, { dataSources, userId }) => {
      return dataSources.bookingDb.getBookingsForUser(userId)
    },
  },
  Booking: {
    __resolveReference: (bookingId, { dataSources }) => {
      return dataSources.bookingDb.getBooking(bookingId);
    },
    checkInDate: ({ checkInDate }, _, { dataSources }) => {
      return dataSources.bookingDb.getHumanReadableDate(checkInDate);
    },
    checkOutDate: ({ checkOutDate }, _, { dataSources }) => {
      return dataSources.bookingDb.getHumanReadableDate(checkOutDate);
    }
  },
  Listing: {
    bookings: async ({ id }, _, { dataSources }) => {
      return await dataSources.bookingDb.getBookingsForListing(id)
    },
    numberOfUpcomingBookings: async ({ id }, __, { dataSources }) => {
      return ((await dataSources.bookingDb.getBookingsForListing(id, 'UPCOMING')) || []).length;
    },
    currentlyBookedDates: async ({ id }, _, { dataSources }) => {
      return await dataSources.bookingDb.getCurrentlyBookedDateRangesForListing(id);
    }
  },
  ReservedDate: {
    checkInDate: ({ checkInDate }, _, { dataSources }) => {
      return dataSources.bookingDb.getHumanReadableDate(checkInDate);
    },
    checkOutDate: ({ checkOutDate }, _, { dataSources }) => {
      return dataSources.bookingDb.getHumanReadableDate(checkOutDate);
    }
  }
};

module.exports = resolvers;
