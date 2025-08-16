const cpuNums = require("os").cpus().length;
const cluster = require("cluster")
const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require('path');
const cookieParser = require('cookie-parser');
/* const enableStrict = require('./middleware/enableStrict'); */
const errorMiddleWare = require("./middleware/errorMiddleware");
const logger = require("./helpers/logger");
const authRoute = require("./routes/general/auth");
const userRoute = require("./routes/user/user");
const { setGlobalVariable } = require("./middleware/globalVariables");
const homeRoute = require("./routes/general/home");
const adminRoute = require("./routes/admin/admin");
const { isUserLogin, isRoleAllow } = require("./middleware/isAuth");
const adminAuthRoute = require("./routes/admin/auth");




try {




//Clustering
    /*if (cluster.isMaster) {
        for (i = 0; i < cpuNums; i++){
            cluster.fork()
        };

        //On Child Process Exist
        cluster.on("exit", worker => {
            cluster.fork()
        });
        
    } else {*/
        /* MAIN WORK START HERE  */
         //Require ENV
require("dotenv").config()


//Required Database
require('./models/db');

//JOBS
require("./jobs/mainJob")

const app = express();

//Cors
app.use(cors({origin:"*",credentials:true}))


//Helmet

  app.use(helmet(
  {
    contentSecurityPolicy: false,
  }
))


//Hpp Security
app.use(hpp())

  // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

  

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join('public')));


//ROUTES
//HOME ROUTE
app.use("/", setGlobalVariable, homeRoute);
  
//USER AUTH ROUTE
app.use("/", setGlobalVariable, authRoute)

//ADMIN AUTH ROUTE
app.use("/admin", setGlobalVariable, adminAuthRoute)

//USER ROUTE
app.use("/", setGlobalVariable, isUserLogin, userRoute);

//ADMIN ROUTE
app.use("/admin", setGlobalVariable, isUserLogin, isRoleAllow(["admin"]), adminRoute);



  
//MIDDLEWARE
app.use(errorMiddleWare)


app.listen() 
  

  process.on('uncaughtException', function (err) {
  logger.debug(err)
    
});

process.on('unhandledRejection', (reason, promise) => {
  logger.debug(reason)
})

/*}*/ //Clustering End



  
} catch (error) {
  logger.debug(error)
}