const blobToBase64 = require("../controller/helpers/blobToBase64")
const getDateDifference = require("../controller/helpers/getDateDifference")
const { openToken } = require("../controller/helpers/jwt")
const manipulateDate = require("../controller/helpers/manipulateDate")
const numberWithDelimeter = require("../controller/helpers/numberWithDelimeter")
// const db = require("../models/db")

//GET USER INFO
exports.userinfo =  (userId) => {
    return new Promise((resolve, reject) => {
        // Mock user data for now
        resolve(null)
    })
}


//Get Web Settings
exports.getWebSettings = () => {
    return new Promise((resolve, reject) => {
        // Mock web settings for now
        const settings = {
            website_title: "Extrade - Investment Platform",
            website_description: "A trusted investment platform",
            website_author: "Extrade Team",
            website_favicon: "",
            website_logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMDA3Y2JmIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FeHRyYWRlPC90ZXh0Pgo8L3N2Zz4K",
            website_header_code: "",
            website_currency: "₦"
        };
        resolve(settings)
    })
}