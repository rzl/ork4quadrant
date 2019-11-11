var RestService = require('./RestService')
var models = require('../models')

var departmentService = new RestService(models.Department)

departmentService.getList = function(cb) {
  models.Department.findAll().then((rows,r) => {
    cb(rows)
  })
}

departmentService.getDepartmentUser = function(departmentid, cb) {
  console.log(models.DepartmentUsers.prototype)
  console.log(models.Department.prototype)
  models.Department.build({ dingid : departmentid }).getUsers({
    attributes: ['name', 'userid']
  }).then((rows, a) => {
    cb(rows)
  })
}

module.exports = departmentService