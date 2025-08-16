const blobToBase64 = (buffer) => {
    return new Promise((resolve, reject) => {
        let b = Buffer.from(buffer).toString("base64")
    return resolve(b)
    })
}

module.exports = blobToBase64