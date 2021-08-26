module.exports = (app) => {
  const userController = require("../controllers/student.controller");
  const deptController = require("../controllers/departments.controller");
  let router = require("express").Router();

  //route for register
  router.post("/register", userController.register);

  //route for login
  router.post("/login", userController.login);

  //route for email verification
  router.get("/verifyEmail", userController.verifyEmail);

  //route for adding department
  router.post("/addDepartment", deptController.addDept);

  //to get students
  router.get("/students", userController.getStudents);

  //to get student by its id
  router.get("/studentbyid/:studentId", userController.getStudentById);

  //to get departments
  router.get("/departments", deptController.getDepartments);

  //to update student
  router.put("/updatestudent/:studentId", userController.updateStudent);

  //to delete user
  router.delete("/deletestudent/:studentId", userController.deleteStudent);

  app.use("/api", router);
};
