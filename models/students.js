"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ departments, subjects }) {
      // define association here
      this.belongsTo(departments, { foreignKey: "deptId", as: "department" });
      this.belongsToMany(subjects, {
        through: "student_subjects",
      });
    }
  }
  students.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "student must have a name" },
          notEmpty: { msg: "student must have a name" },
          isAlpha: { msg: "student name must have only letters" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "student must have a email" },
          notEmpty: { msg: "student must have a email" },
          isEmail: { msg: "please enter a valid email" },
        },
      },
      contact: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: { msg: "student must have a contact" },
          notEmpty: { msg: "student must have a contact" },
          isNumeric: { msg: "contact field must have only numbers" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "please enter your password" },
          notEmpty: { msg: "please enter your password" },
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/,
          // validatePassword: function (password) {
          //   if (
          //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/.test(
          //       password
          //     )
          //   ) {
          //     throw new Error(
          //       "The password must contain at least 10 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
          //     );
          //   }
          // },
        },
      },
      deptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "student must have atleast one department" },
          notEmpty: { msg: "student must have atleast one department" },
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailToken: {
        type: DataTypes.STRING,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "students",
    }
  );
  return students;
};
