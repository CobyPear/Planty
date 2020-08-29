const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongodb: {
        dbURI: process.env.MONGODB_URI || process.env.LOCAL_DB
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET
    }
}