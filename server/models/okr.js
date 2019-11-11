'use strict';
module.exports = (sequelize, DataTypes) => {
  const Okr = sequelize.define('Okr', {
    data: DataTypes.TEXT,
  }, {});
  Okr.associate = function(models) {
    // associations can be defined here
    models.Okr.belongsTo(models.User, {as : 'user', foreignKey: 'userId'})
    models.Okr.belongsTo(models.Department, {as : 'department', foreignKey: 'departmentId'})
  };
  return Okr;
};
