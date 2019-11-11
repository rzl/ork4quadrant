'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    userid: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    },
    name: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.belongsToMany(
      models.Department, 
      {
        as: 'departments', 
        through: 'DepartmentUsers', 
        foreignKey:'userid', 
        otherKey:'dingid', 
      } 
      )
    models.User.belongsToMany(models.Department, {as: 'ManageDepartments', through: 'departmentOkrManager'} )
    models.User.belongsTo(models.Role, { as : 'role', foreignKey: 'roleId' } )
  };
  return User;
};