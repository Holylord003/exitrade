const { logoutController } = require("../../controller/admin/auth/logout");
const { forgotGet, forgotPost, changePasswordGet, changePasswordPut } = require("../../controller/general/forgot");
const { loginGet, loginPost } = require("../../controller/general/login");
const { registerGet, registerPost, getUplineByUsername } = require("../../controller/general/register");
const { isAuthUser, isUserLogin } = require("../../middleware/isAuth");

const authRoute = require("express").Router();

//Register
authRoute.route("/register").get(registerGet).post(registerPost).put(getUplineByUsername)

//Login
authRoute.route("/login").get(loginGet).post(loginPost);

//Forgot Password
authRoute.route("/reset-password").get(forgotGet).post(forgotPost);

//Change Password
authRoute.route("/reset/password").get(changePasswordGet).put(changePasswordPut);

//Logout
authRoute.route("/logout").get(logoutController)

module.exports = authRoute