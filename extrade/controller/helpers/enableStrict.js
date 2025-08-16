const enableStrict = (req, res, next) => {
    /* if (req.url.substr(-1) !== "/" ) next()
    else res.redirect(req.url.slice(0, -1)) */
    if (req.url.substr(-1) === "/" && req.url.length > 1) {
        res.redirect(req.url.slice(0, -1))
    } else {
        next()
    }
    

    
    
}

module.exports = enableStrict