/**
 * External Dependencies
 */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

/**
 * Internal Dependencies
 */
const { notFoundHandler, genericError } = require('./middlewares/common/errorHandler');

/**
 * Express App
 */
const app = express();
dotenv.config();

/**
 * Database Connection
 */
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Database conection successfull');
    })
    .catch((error) => {
        console.log(error);
    });
/**
 * Request Parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Set view engine
 */
app.set('view engine', 'ejs');

/**
 * set statice folder
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * cookie parser
 */
app.use(cookieParser(process.env.COOKIE_SECRET));
/**
 * Routing setup
 */

/**
 * Not Found Handler
 */
app.use(notFoundHandler);
/**
 * Error Handling
 */
app.use(genericError);
/**
 * Express app initialization
 */
app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`);
});
