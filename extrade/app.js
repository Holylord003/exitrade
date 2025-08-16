const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require('path');
const fs = require('fs');
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
    // Serve static files
    const staticPath = path.join(__dirname, 'public');
    console.log('Static files path:', staticPath);
    app.use(express.static(staticPath));



    // Static file handler for Vercel
    app.get('/api/static', (req, res) => {
        const { filePath } = req.query;
        
        if (!filePath) {
            return res.status(400).json({ error: 'File path is required' });
        }
        
        // Security: prevent directory traversal
        if (filePath.includes('..') || filePath.includes('~')) {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const fullPath = path.join(__dirname, 'public', filePath);
        
        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        // Get file extension to set correct content type
        const ext = path.extname(fullPath).toLowerCase();
        const contentTypes = {
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.eot': 'application/vnd.ms-fontobject'
        };
        
        const contentType = contentTypes[ext] || 'application/octet-stream';
        
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        
        const fileStream = fs.createReadStream(fullPath);
        fileStream.pipe(res);
    });

    // Test route for static files
    app.get('/test-css', (req, res) => {
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href="/api/static?filePath=css/home/theme.css">
                </head>
                <body>
                    <h1>CSS Test</h1>
                    <p>If you see styled text, CSS is working!</p>
                </body>
            </html>
        `);
    });

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