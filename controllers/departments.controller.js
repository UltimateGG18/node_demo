const db = require("../models");
const { departments, students, subjects } = require("../models");
const Op = db.Sequelize.Op;

//to add departments
exports.addDept = async (req, res) => {
  try {
    const dept = {
      name: req.body.name,
      contact: req.body.contact,
    };
    const department = await departments.findOne({
      where: { name: dept.name },
    });
    if (department) {
      return res.status(400).json({ message: "department Already Exist" });
    } else {
      const response = await departments.create(dept);
      if (response) {
        return res.status(200).json({
          message: "department Added Successfully...",
          dept: response,
        });
      } else {
        return res.status(500).json({ error: "department Not Added..." });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

//to get departments
exports.getDepartments = async (req, res) => {
  try {
    const response = await departments.findAll({
      include: [
        { model: students, as: "students" },
        { model: subjects, as: "subjects" },
      ],
    });
    if (response) {
      return res.status(200).json({
        message: "departments fetched successfully",
        departments: response,
      });
    } else {
      return res
        .status(500)
        .json({ error: "departments NOT fetched successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};
