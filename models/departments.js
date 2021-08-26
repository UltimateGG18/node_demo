"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ students, subjects }) {
      // define association here
      this.hasMany(students, { foreignKey: "deptId", as: "students" });
      this.hasMany(subjects, { foreignKey: "deptId", as: "subjects" });
    }
  }
  departments.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "department must have a name" },
          notEmpty: { msg: "department must have a name" },
        },
      },
      contact: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: { msg: "department must have a contact info" },
          notEmpty: { msg: "department must have a contact info" },
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "departments",
    }
  );
  return departments;
};
