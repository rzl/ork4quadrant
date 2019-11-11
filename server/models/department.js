'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    dingid: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    models.Department.belongsTo(
      models.Department, 
      {
        as : 'dingParent',
        targetKey: 'dingid'
      }
    )
    models.Department.belongsToMany(
      models.User , 
      { 
        as: 'users', 
        through: 'DepartmentUsers', 
        foreignKey:'dingid', 
        sourceKey: 'dingid', 
        otherKey: 'userid'
      }
    )
    models.Department.belongsToMany(models.User , {as: 'manager', through: 'departmentOkrManager'})
  };
  return Department;
};
