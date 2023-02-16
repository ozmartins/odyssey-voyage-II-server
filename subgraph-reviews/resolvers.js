const { AuthenticationError, ForbiddenError } = require('./utils/errors');

const resolvers = {
  Listing: {
    reviews: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewsForListing(id);
    },
    overralRating: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getOverallRatingForListing(id);
    }
  }
};

module.exports = resolvers;
