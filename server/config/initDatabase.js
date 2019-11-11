var fs = require('fs')

module.exports = (models) => {
  function showMethods(models) {
    var file = __dirname + '/dbmethods.txt'
    fs.writeFileSync(file, '')
    for (var x in models) {
      if (x === 'sequelize') break
      fs.appendFileSync(file, 'model: ' + x + '\n')
      for (var fn in models[x].prototype) {
        if (typeof models[x].prototype[fn] === 'function' && fn.indexOf('_') !== 0) {
          fs.appendFileSync(file, 'function: ' + fn + '\n')
        }
      }
    }
  }

  function createPermission(models, cb) {
    var Permission = models.Permission
    var Role = models.Role
    Permission
    .findOrCreate({where: { key: 'SUPERADMIN' }, defaults: {name: 'SUPERADMIN'}})
    .then(([permission, created]) => {
      permission.addRole(Role.build({id: 1})).then(() => {})
      Permission.findOrCreate({where: { key: 'DEPARTMENTADMIN' }, defaults: {name: 'DEPARTMENTADMIN'}})
      .then(([permission, created]) => {
        permission.addRoles(Role.build({id: 1}), Role.build({id: 2})).then(() => {})
        Permission.findOrCreate({where: { key: 'SELFADMIN' }, defaults: {name: 'SELFADMIN'}})
        .then(([permission, created]) => {
          permission.addRoles([Role.build({id: 1}), Role.build({id: 2}), Role.build({id: 3})]).then(() => {})
          cb(models)
        })
      })
    })  
  }

  function createRole(models, cb) {
    var Role = models.Role
    Role
    .findOrCreate({where: { id: 1 }, defaults: {name: 'SUPERADMIN'}})
    .then(([role, created]) => {
      Role.findOrCreate({where: { id: 2 }, defaults: {name: 'DEPARTMENTADMIN'}})
      .then(([role, created]) => {
        Role.findOrCreate({where: { id: 3 }, defaults: {name: 'SELFADMIN'}})
        .then(([role, created]) => {
          console.log('权限初始化完成')
          cb(models)
        })
      })
    }) 
  }

  showMethods(models)
  createRole(models, (models) => {
    createPermission(models, () => {
      console.log('权限初始化完成')
    })
  })
}