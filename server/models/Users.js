const mongoose = require('mongoose');

const GoogleAuth = new mongoose.Schema({
    googleId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema(
    {
        userame: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
        },
        password: {
            type: String,
        },
        google_Auth: [GoogleAuth],

    },
    {
        strict: false
    });

module.exports = User = mongoose.model("users", UserSchema);