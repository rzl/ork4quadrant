function BaseService(model) {
  this.model = model
  return this
}

/**
 * [getModel description]
 * @param  {[type]}   p [where, sortby, order]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
BaseService.prototype.getModel = function (p, cb) {
  this.model.findAndCountAll(p).then((rows) => {
    cb(rows)
  })
}

/**
 * [getModelPaging description]
 * @param  {[type]}   opt [where, page, limit, sortby, order]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
BaseService.prototype.getModelPaging = function (opt, cb) {
  var p = { 
    where: opt.where
  }

  models[this.model]['findAndCountAll']({
    where: where,
    offset: page * limit,
    limit: limit,
    order: [ [ sortby, order ] ]
  }).then((rows) => {
    cb(rows)
  })
}

module.exports = BaseService