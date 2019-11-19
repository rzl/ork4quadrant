'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    models.Role.belongsToMany(models.Permission, { through: 'PermissionRole' , as: 'permissions' })

  };
  return Role;
};
