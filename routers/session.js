var express = require('express')
var path = require('path')
var sqlFuc = require(path.join(__dirname, '../', 'model', 'mysql.js'))

var router = express.Router()

router.get('/', function (req, res, next) {
    res.render('loginUI.html')
})

router.post('/login', function (req, res, next) {
    var loginData = req.body
    sqlFuc.userIdSelFuc(loginData, function (err, results) {
        if(err){
            next(err)
        }
        if (results.length === 0) {
            res.render('loginUI.html', {
                errMsg: '密码或账户错误！'
            })
        }
        req.session.userId = results
        console.log("results*******************"+results)
        res.redirect('/main_page')
    })
})

module.exports = router