const { AuthenticationError, ForbiddenError } = require('./utils/errors');

const resolvers = {
  // TODO: fill in resolvers
  Query: {
    bookingsForListing: async (_, { listingId, status }, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();
      if (userRole != "Host") throw ForbiddenError();

      //TODO: As duas linhas abaixo exigem que eu tenha acesso à API de listings.
      //const listings = await dataSources.listingsAPI.getListingsForUser(userId);
      //if (!listings.find((listing) => listing.id === listingId)) throw new Error('Listing does not belong to host');

      return await dataSources.bookingDb.getBookingsForListing(listingId, status);
    },
    guestBookings: async (_, __, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();
      if (userRole != 'Guest') throw ForbiddenError('Only guests have access to trips');
      return await dataSources.bookingDb.getBookingsForUser(userId);
    },
    upcomingGuestBookings: async (_, __, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();
      if (userRole !== 'Guest') throw ForbiddenError('Only guests have access to trips');
      return await dataSources.bookingDb.getBookingsForUser(userId, 'UPCOMING');
    },
    pastGuestBookings: async (_, __, { dataSources, userId, userRole }) => {
      if (!userId) throw AuthenticationError();
      if (userRole != 'Guest') throw ForbiddenError('Only guests have access to trips');
      return await dataSources.bookingDb.getBookingsForUser(userId, 'COMPLETED');
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
    },
    listing: (booking) => {
      return { id: booking.listingId };
    },
    guest: (booking) => {
      return { id: booking.guestId };
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
