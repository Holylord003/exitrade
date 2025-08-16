const { adminLoginGet, adminLoginPost } = require("../../controller/admin/auth/login");
// const { isAuthUser } = require("../../middleware/isAuth");

const adminAuthRoute = require("express").Router();

// Redirect /admin to /admin/login
adminAuthRoute.route("/").get((req, res) => {
    res.redirect("/admin/login");
});

//LOGIN
adminAuthRoute.route("/login").get(adminLoginGet).post(adminLoginPost)


module.exports = adminAuthRoute