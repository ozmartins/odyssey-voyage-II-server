const { RESTDataSource } = require('@apollo/datasource-rest');

class ListingsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "http://localhost:4010/"
    }

    getFeaturedListings(limit = 1) {
        return this.get(`featured-listings?limit=${limit}`);
    }
}

module.exports = ListingsAPI;