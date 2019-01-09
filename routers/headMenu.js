var express = require('express')
var path = require('path')
var sqlFuc = require(path.join(__dirname, '../', 'model', 'mysql.js'))

var router = express.Router()

router.get('/main_page', function (req, res, next) {
    var id = req.session.userId
    var account_results
    var info_results
    var comp_results
    console.log("1*******************" + id)

    sqlFuc.accountSelFuc(id, function (err, results) {
        if (err) {
            next(err)
        }
        account_results = results
        console.log("2*******************" + id)
        sqlFuc.infoSelFuc(id, function (err, results) {
            if (err) {
                next(err)
            }
            info_results = results
            console.log("3*******************" + id)
            sqlFuc.compSelFuc(id, function (err, results) {
                if (err) {
                    next(err)
                }
                comp_results = results
                console.log(info_results)
                res.render('home/home.html', {
                    account: account_results,
                    infoList: info_results,
                    compList: comp_results
                })
            })
        })
    })
})

// router.post('/login', function (req, res, next) {
//     var loginData = req.body
//     var sqlStr = "select id,name from user where account='" + loginData.account + "' and password='" + loginData.password + "'"
//     // var sqlStr = "select id from user where account='a'"
//     console.log(sqlStr)

//     connection.query(sqlStr, function (err, results) {
//         if (err) next(err)
//         if (results.length === 0) {
//             res.render('loginUI.html', {
//                 errMsg: '密码或账户错误！'
//             })
//         }
//         req.session.name = results.name
//         req.session.id = results.id
//         res.render('home/home.html', {
//             name: req.session.name
//         })
//     })
// })


module.exports = router