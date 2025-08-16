const bcrypt = require("bcryptjs")
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        const newHashPassword = bcrypt.hash(password, 9);
        resolve(newHashPassword)
    })
}


exports.comparePassword = (password, hashPassword) => {
    return new Promise((resolve, reject) => {
        const same = bcrypt.compareSync(password, hashPassword);
        resolve(same)
    })
}