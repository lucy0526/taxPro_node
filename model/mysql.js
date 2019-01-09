var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tax'
})

var sqlFuc = {
    userIdSelFuc: function (loginData, callback) {
        var sqlStr = "select id from user where account='" + loginData.account + "' and password='" + loginData.password + "'"

        connection.query(sqlStr, function (err, results, fields) {
            callback(err, results[0].id)
        })
    },
    accountSelFuc: function (id, callback) {
        var account_sqlStr = "select name,headImage,dept from user where id='" + id + "'"
        connection.query(account_sqlStr, function (err, results) {
            callback(err, results[0])
        })
    },
    infoSelFuc: function (id, callback) {
        var info_sqlStr = "select info_id,title,type,creator,create_time from info where info_id in (" + "select info_id from user_info where id='" + id + "')"
        connection.query(info_sqlStr, function (err, results) {
            callback(err, results)
        })
    },
    compSelFuc: function (id, callback) {
        var comp_sqlStr = "select comp_id,comp_title,state,is_NM,comp_time from complain where id='" + id + "'"
        connection.query(comp_sqlStr, function (err, results) {
            callback(err, results)
        })
    },
}
module.exports = sqlFuc