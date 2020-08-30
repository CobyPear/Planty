const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

const passport = require('./server/passport/setup');
const auth = require('./server/routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGODB_URI || process.env.LOCAL_DB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected at ${MONGO_URI}`))
    .catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// express session
app.use(
    session({
        secret: 'hands off my bagels',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// passport middleware
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', auth);
// app.get("/", (req, res) =>
// res.sendFile(path.join(__dirname, "../client/build/index.html"))
// );

app.listen(PORT, () => console.log("Listening at http://localhost:" + PORT + "/"))