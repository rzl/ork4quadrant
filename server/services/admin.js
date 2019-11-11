var models = require('../models');
var util = require('../utils');
console.log(models.sequelize.models)
module.exports = {
  syncPromise: function(o, fn, args) {
    var res = []
    var i = 0
    var run = function(o, fn, args, i, cb) {
      if (i >= args.length) { return cb(res) }
      console.log(i, args[i], args.length)
      fn.apply(o, args[i]).then((rs) => {
        res.push(rs)
        i++
        run(o, fn, args, i, cb)
      }).catch((rs) => {
        res.push(rs)
        i++
        run(o, fn, args, i, cb)
      })
    }
    return new Promise((rs, rj) => {
      run(o, fn, args, i, (r) => {
        rs(r)
      })
    })
  },
  freshDingDingData: function(req, res, cb) {
    req.app.$dc({
      url: 'department/list',
      method: 'get',
      params: {
        id: '1'
      }
    }).then((res) => {
      if (res.errcode !== 0) {
        return cb(res)
      }
      var p = []
      var ds = []
      res.department.sort((a, b) => {
        if (a.parentid === b.id || a.parentid >= b.parentid ) { 
          return 1
        }
        return  a.id - b.id
      })
      res.department.forEach((d) => {
        ds.push([
          { 
            where: { dingid: d.id }, 
            defaults: {
              name: d.name,
              dingParentDingid: d.parentid
            } 
          }
        ])
        p.push({
          url: 'user/simplelist',
          params: {
            department_id: d.id
          }
        })
      })
      this.syncPromise(models.Department, models.Department.findOrCreate, ds).then((res) => {
        console.log('部门同步完成！')
        cb(res)
        p.forEach((pp) => {
          req.app.$dc(pp).then((res) => {
            if (res.errcode !== 0) { console.log(res) }
            res.userlist.forEach((user) => {
              req.app.$dc({
                url: 'user/get',
                params: {
                  userid: user.userid
                }
              }).then((dingUser) => {
                models.User.findOrCreate({ where: { userid: dingUser.userid }, 
                  defaults: {
                    name: dingUser.name,
                    userid: dingUser.userid,
                    username: dingUser.mobile,
                    mobile: dingUser.mobile,
                    password: util.md5('123456')
                  }
                }).then((u) => {
                  models.Department.findOne({ where: { dingid: pp.params.department_id } }).then((dep) => {
                    u[0].addDepartments(dep).then((adep) => {
                      console.log(adep)
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }
}