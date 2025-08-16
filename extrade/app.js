const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleware/errorMiddleware");
const logger = require("./controller/helpers/logger");
const authRoute = require("./routes/general/auth");
const userRoute = require("./routes/user/user");
const { setGlobalVariable } = require("./middleware/globalVariables");
const homeRoute = require("./routes/general/home");
const adminRoute = require("./routes/admin/admin");
// const { isUserLogin, isRoleAllow } = require("./middleware/isAuth");
const adminAuthRoute = require("./routes/admin/auth");

console.log('Starting Extrade application...');

try {
    //Require ENV
    require("dotenv").config()
    console.log('Environment loaded');

    //Required Database - Temporarily disabled for local testing
    // require('./models/db');

    // Note: Cron jobs are disabled for Vercel deployment
    // require("./jobs/mainJob")

    const app = express();
    console.log('Express app created');

    //Cors
    app.use(cors({origin:"*",credentials:true}))

    //Helmet
    app.use(helmet({
        contentSecurityPolicy: false,
    }))

    //Hpp Security
    app.use(hpp())

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.COOKIE_SECRET || 'default-secret'));
    app.use(express.static(path.join('public')));



    //ROUTES
    //HOME ROUTE
    app.use("/", setGlobalVariable, homeRoute);
      
    //USER AUTH ROUTE
    app.use("/", setGlobalVariable, authRoute)

    //USER ROUTE - Temporarily disabled
    // app.use("/", setGlobalVariable, isUserLogin, userRoute);

    //ADMIN ROUTE
    app.use("/admin", setGlobalVariable, adminRoute);

    //ADMIN AUTH ROUTE
    app.use("/admin", setGlobalVariable, adminAuthRoute)

    //MIDDLEWARE
    app.use(errorMiddleWare)

    // Handle Vercel deployment
    const port = process.env.PORT || 3000;
    console.log(`Attempting to start server on port ${port}`);
    
    if (process.env.NODE_ENV !== 'production') {
        app.listen(port, () => {
            console.log(`✅ Server running on http://localhost:${port}`);
            console.log(`✅ Test endpoint: http://localhost:${port}/test`);
        });
    }

    module.exports = app;

} catch (error) {
    console.error('Error starting application:', error);
    logger.debug(error);
}