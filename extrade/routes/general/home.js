const { homeGet, pageGet, contactUsGet, contactUsPost, planGet } = require("../../controller/general/home");

const homeRoute = require("express").Router();

//HOMEPAGE
homeRoute.route("/").get(homeGet);

//VIEW PAGE
homeRoute.route("/page/:slug").get(pageGet)

//CONTACT US PAGE
homeRoute.route("/contact-us").get(contactUsGet).post(contactUsPost)

//CONTACT US PAGE
homeRoute.route("/plans").get(planGet)

module.exports = homeRoute