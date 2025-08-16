const db = require("../models/db")

exports.createPage = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_pages SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET PAGES
exports.adminGetPagesFunction = (limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_pages LIMIT ? OFFSET ?",[limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//GET PAGE BY ID
exports.getPageById = (pageId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_pages WHERE page_id = ? LIMIT 1",parseInt(pageId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//GET PAGE BY SLUG
exports.getPageBySlug = (pageSlug) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_pages WHERE page_slug = ? AND page_status = 1 LIMIT 1",pageSlug, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//EDIT PAGE BY ID
exports.editPageById = (pageId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_pages SET ? WHERE page_id = ?",[obj, parseInt(pageId)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE PAGE BY ID
exports.deletePageById = (pageId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_pages WHERE page_id = ?",parseInt(pageId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}