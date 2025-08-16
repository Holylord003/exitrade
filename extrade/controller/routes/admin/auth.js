const { adminLoginGet } = require("../../controller/admin/auth/login");
const { loginPost } = require("../../controller/general/login");
const { isAuthUser } = require("../../middleware/isAuth");

const adminAuthRoute = require("express").Router();
//LOGIN
adminAuthRoute.route("/login").get(isAuthUser, adminLoginGet).post(isAuthUser, loginPost)


module.exports = adminAuthRoute