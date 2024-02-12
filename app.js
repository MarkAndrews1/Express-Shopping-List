const express = require("express")
const routes = require('./routes/items')
const ExpressError = require('./expressError')

const app = express()

app.use(express.json())
app.use('/items', routes)

app.use(function(req, res, next){
    return new ExpressError("Page not found", 404)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)

    return res.json({
        error: err.message
    })
})

module.exports = app