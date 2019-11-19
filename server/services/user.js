var models = require('../models')

module.exports = {
  getUserInfo: function(user, cb) {
    user.permissions = []
    var role = models.Role.build({ id: user.roleId })
    console.log(role)
    role.getPermissions().then((permissions) => {
      permissions.forEach((permission) => {
        user.permissions.push(permission.key)
      })
      cb(user)
    })
  },
  getUserByUsername: function(username, cb) {
    models.User.findOne({where: {username}}).then((row, r) => {
      cb(row)
    })
  },
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