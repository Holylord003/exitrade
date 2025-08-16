const getDateDifference = (endDate) => {
    let miliseconds = new Date(endDate) - new Date();
    return Math.round(miliseconds / (1000 * 60 * 60 * 24))
}

module.exports = getDateDifference