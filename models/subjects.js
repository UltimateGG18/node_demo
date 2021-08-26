"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ students, departments }) {
      // define association here
      this.belongsTo(departments, { foreignKey: "deptId", as: "department" });
      this.belongsToMany(students, { through: "student_subjects" });
    }
  }
  subjects.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "subjects",
    }
  );
  return subjects;
};
