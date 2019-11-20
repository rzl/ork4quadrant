var express = require('express');
var router = express.Router();
var userService = require('../services/user.js')
var utils = require('../utils')
var jwt = require('jsonwebtoken')
const config = require(__dirname + '/../config/config.json')['app'];
console.log('config', config)
/* GET users listing. */
router.post('/login', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  userService.getUserByUsername(req.body.username, (row) => {
  	if (row) {
  	  if (utils.md5(password) === row.password) {
        console.log(row)
  	  	  var jsonData = {
  	  	  	username: row.username,
  	  	  	name: row.name,
  	  	  	mobile: row.mobile,
  	  	  	userid: row.userid,
  	  	  	roleId: row.roleId
  	  	  }
  	  	  var token = jwt.sign(jsonData, config.jsonwebtokensecret , {
  	  	  	expiresIn: '48h',
  	  	  })
		  res.json({
		    code: 0,
		    data: token,
		    message: '登录成功'
		  });
  	  } else {
  	  	res.json({
		    code: 0,
		    data: null,
		    message: '账号密码错误'
		  });
  	  }

  	} else {
  		res.json({
	    code: 2000,
	    data: null,
	    message: '账号密码错误'
	  });
  	}
  })
});

router.get('/info', function(req, res, next) {
  var token = req.get('X-Token')
  if (!token) { return res.json({ code: 5000, message: 'token缺失'})}
  var user = jwt.verify(token, config.jsonwebtokensecret, (err, user) => {
    if (err) { return res.json({ coode: 5001, message: 'token不合法2'})}
      console.log(user)
    userService.getUserInfo(user, (result) => {
      res.json({code: 0, data: result})
    })  
  })
});

router.get('/logout', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;
