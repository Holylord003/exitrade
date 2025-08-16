const { logoutController } = require("../../controller/admin/auth/logout");
const { forgotGet, forgotPost, changePasswordGet, changePasswordPut } = require("../../controller/general/forgot");
const { loginGet, loginPost } = require("../../controller/general/login");
const { registerGet, registerPost, getUplineByUsername } = require("../../controller/general/register");
const { isAuthUser, isUserLogin } = require("../../middleware/isAuth");

const authRoute = require("express").Router();

//Register
authRoute.route("/register").get(isAuthUser, registerGet).post(isAuthUser, registerPost).put(isAuthUser, getUplineByUsername)

//Login
authRoute.route("/login").get(isAuthUser, loginGet).post(isAuthUser, loginPost);

//Forgot Password
authRoute.route("/reset-password").get(isAuthUser, forgotGet).post(isAuthUser, forgotPost);

//Change Password
authRoute.route("/reset/password").get(isAuthUser, changePasswordGet).put(isAuthUser, changePasswordPut);

//Logout
authRoute.route("/logout").get(isUserLogin, logoutController)

module.exports = authRoute