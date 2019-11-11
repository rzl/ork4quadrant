var express = require('express');
var router = express.Router();
var department = require('../services/department.js')
/* GET home page. */

router.get('/getList', function(req, res, next) {
  department.getList((result) => {
    res.json(result);  
  })
});

router.get('/getUserList', function(req, res, next) {
  console.log(req.query)
  department.getDepartmentUser(req.query.id, (result) => {
    res.json(result);  
  })
});

module.exports = router;
