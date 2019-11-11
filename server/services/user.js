var models = require('../models')

module.exports = {
  getList: function(cb) {
    models.User.findAll().then((rows,r) => {
      cb(rows)
    })
  },
  getDepartmentUser: function(departmentid, cb) {
    console.log(models.DepartmentUsers.prototype)
    models.Department.build({ dingid : departmentid }).getUsers({
      attributes: ['name', 'userid']
    }).then((rows, a) => {
      cb(rows)
    })
  }
}