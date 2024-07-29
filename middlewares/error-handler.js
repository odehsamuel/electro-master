function handleError(req, res, next) {
    res.status(500).render("default/500")

    return next()
}

module.exports = handleError