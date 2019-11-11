var express = require('express');
var router = express.Router();
var admin = require('../services/admin.js')
/* GET home page. */
router.get('/freshDingDingData', function(req, res, next) {
  admin.freshDingDingData(req, res, (result) => {
    res.json(result);  
  })
});

module.exports = router;
