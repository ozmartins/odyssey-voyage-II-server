const { AuthenticationError, ForbiddenError } = require('./utils/errors');

const resolvers = {
  Query: {
    myReviews: (_, __, { dataSources, userId }) => {
      return dataSources.reviewsDb.getReviewsByUser(userId);
    }
  },
  Listing: {
    reviews: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewsForListing(id);
    },
    overralRating: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getOverallRatingForListing(id);
    }
  },
  Booking: {
    guestReview: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewForBooking('GUEST', id);
    },
    hostReview: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewForBooking('HOST', id);
    },
    locationReview: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewForBooking('LISTING', id);
    }
  }
};

module.exports = resolvers;
