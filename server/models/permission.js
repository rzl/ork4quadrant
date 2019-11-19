'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true
    }
  }, {});
  Permission.associate = function(models) {
    // associations can be defined here
    models.Permission.belongsToMany(models.Role, { through: 'PermissionRole' } )

  };
  return Permission;
};
