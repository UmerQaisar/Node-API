require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/application.routes.js')
const mongo = require('./db/db.config.mongo.js')
const passport = require('passport')
const jwtStrategy = require('./config/jwt.strategy.js')

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize())
passport.use(jwtStrategy)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(routes)

//server
const port = process.env.PORT || 3000;
(async () => {
    try {
        await mongo;
        app.listen(port, () => {
            console.log('Express server is running on port 3000')
        })
    } catch (e) {
        console.log("Connection failed. " + e)
    }
})();
