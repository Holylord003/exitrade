exports.getSegmented = (duration, segment) => {
    return Math.round(parseInt(duration) / parseInt(segment))
}


exports.getDurationFunc = (day) => {
    return Date.parse(new Date(Date.now() + 1000*60*60*24*day))
}