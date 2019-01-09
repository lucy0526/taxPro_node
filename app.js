var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var session = require('express-session')

var router1 = require(path.join(__dirname, 'routers', 'session'))
var router2 = require(path.join(__dirname, 'routers', 'headMenu'))

var app = express()

app.engine('html', require('express-art-template'))

app.use(session({
    secret:'keyboard',
    resave:false,
    saveUninitialized:true
}))

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/views', express.static(path.join(__dirname, 'views')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router1)
app.use(router2)
app.use(function(err, req, res, next){
    console.log(err)
    res.status(500).render('error.html')
})

app.listen(8080)