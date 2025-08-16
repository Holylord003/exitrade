const uuid = require("uuid-random");

exports.getUniqueID = () => {
    const ID = uuid().split("-");
    if (ID[4]) {
        return ID[4]
    } else {
        return ID[0]
    }
}
