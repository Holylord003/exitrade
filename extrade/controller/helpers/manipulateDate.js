const moment = require("moment");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

exports.manipulateDate = (gmt) => {
    let date = new Date(gmt);
    return moment.utc(date).fromNow()
}

exports.dateToPostFormat = (date) => {
    const newDate = new Date(date);
    return `${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
}