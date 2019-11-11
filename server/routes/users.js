var express = require('express');
var router = express.Router();
var user = require('../services/user.js')

/* GET users listing. */
router.post('/login', function(req, res, next) {
  console.log(res)
  res.json({
    code: 0,
    data: { token: '1234' },
    msg: ''
  });
});

router.post('/logout', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;
