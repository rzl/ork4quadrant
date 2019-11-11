var services = require('../services')
var express = require('express');
var router = express.Router();

router.get('/rest/:model', function(req, res, next) {
  /*var p = { 
    where: opt.where
  }
  if (opt.sortby !== undefined && opt.order !== undefined) {
    p.order = [ [ opt.sortby, opt.order ] ]
  }*/
  services[req.params.model].getModel({}, (result) => {
    res.json({ code: 0, data: result, msg: '' });
  })
});

router.get('/rest/:model/:id', function(req, res, next) {
  res.json({ title: req.params });
});

router.get('/rest/:model/:id/:assoc', function(req, res, next) {
  res.json({ title: req.params });
});

router.get('/rest/:model/:id/:assoc/:associd', function(req, res, next) {
  res.json({ title: req.params });
});

router.get('/rest/:model/@prop/:prop/like/:value', function(req, res, next) {
  res.json({ title: req.params });
});

router.get('/rest/:model/@prop/:prop/eq/:value', function(req, res, next) {
  res.json({ title: req.params });
});

router.post('/rest/:model', function(req, res, next) {
  res.json({ title: req.params });
});

router.post('/rest/:model/@list', function(req, res, next) {
  res.json({ title: req.params });
});

router.post('/rest/:model/@paging', function(req, res, next) {
  res.json({ title: req.params });
});

router.put('/rest/:model/:id', function(req, res, next) {
  res.json({ title: req.params });
});

router.put('/rest/:model/:id/:prop', function(req, res, next) {
  res.json({ title: req.params });
});

router.delete('/rest/:model/:id', function(req, res, next) {
  res.json({ title: req.params });
});

module.exports = router;
