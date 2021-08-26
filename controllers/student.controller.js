const db = require("../models");
const { students, departments, subjects } = require("../models");
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("../services/mail.service");

exports.register = async (req, res) => {
  try {
    const Student = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
      deptId: req.body.deptId,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    };
    // const validPass =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[#$@!%&*?])[A-Za-zd#$@!%&*?]{8,20}$/;
    // const validPassword = validPass.test(Student.password);
    // console.log(validPassword);
    //to get registered users email
    const Studentemail = await students.findOne({
      where: { email: Student.email },
    });

    //to check user already exist ot not
    if (Studentemail) {
      res.status(400).json({ message: "Email Already Exist" });
    } else {
      //to hashing password
      // const hashedPass = await bcrypt.hashSync(Student.password, 10);
      // Student.password = hashedPass;

      //to create new user
      const response = await students.create(Student);

      if (response) {
        //console.log(response);
        //to sending verification mail to the user
        let mailOptions = {
          from: ` "Verify your Email" ${process.env.EMAIL}`,
          to: Student.email,
          subject: `Verify your Email`,
          html: `<h2>${Student.name} Thanks for Registering...</h2>
                <h4>Please verify your Email to proceed...</h4>
                <a href="http://${req.headers.host}/api/verifyEmail?token=${Student.emailToken}">Verify Here</a>`,
        };
        //sending mail
        sendEmail(mailOptions);

        res.status(200).json({
          message: "Student Registration Successful...",
          student: response,
        });
      } else {
        return res
          .status(500)
          .json({ error: "Student Registration Unsuccessful..." });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    //to destructuring email & password from request body
    const { email, password } = req.body;

    const response = await students.findOne({ where: { email: email } });
    //console.log(response);

    //to checking user exist or not
    if (!response) {
      return res.status(400).json({ error: "Student does not Exist" });
    }

    // //to checking password matches or not
    // let isPassMatched = await bcrypt.compareSync(
    //   password,
    //   response.dataValues.password
    // );
    //  //from if isPassMatched &&
    if (response.dataValues.isVerified == true) {
      return res.status(200).json({
        message: "Student logged in successfully",
        student: response.dataValues,
      });
    } else {
      return res.status(400).json({
        error: "Invalid Credentials or you haven't verified your email",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//to Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    let token = req.query.token;

    let student = await students.findOne({ where: { emailToken: token } });
    if (student) {
      student.emailToken = null;
      student.isVerified = true;
      const response = await student.save();
      //console.log(response);
      res.status(200).json({ message: "Email Verification is successfull" });
    } else {
      res.status(400).json({ error: "Email Verification is Unsuccessfull" });
    }
  } catch (err) {
    console.log(err);
  }
};

//to get students
exports.getStudents = async (req, res) => {
  try {
    const response = await students.findAll({
      include: [
        { model: departments, as: "department", attributes: ["name"] },
        { model: subjects, attributes: ["name"] },
      ],
    });
    if (response) {
      return res
        .status(200)
        .json({ message: "students fetched successfully", students: response });
    } else {
      return res
        .status(500)
        .json({ error: "students NOT fetched successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

//to get student by its unique id
exports.getStudentById = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const response = await students.findOne({
      where: { id: studentId },
      include: [
        { model: departments, as: "department", attributes: ["name"] },
        { model: subjects, attributes: ["name"] },
      ],
    });
    if (response) {
      return res
        .status(200)
        .json({ message: "student fetched successfully", student: response });
    } else {
      return res
        .status(500)
        .json({ error: "student NOT fetched successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

//to update student
exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { name, contact } = req.body;
    const response = await students.findOne({ where: { id: studentId } });

    response.name = name;
    response.contact = contact;

    const updatedStudent = await response.save();

    if (updatedStudent) {
      return res.status(200).json({
        message: "student information updated successfully",
        updatedStudent,
      });
    } else {
      return res
        .status(500)
        .json({ error: "student information NOT updated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

//to delete student
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const response = await students.findOne({ where: { id: studentId } });
    if (response) {
      response.isDeleted = true;
      const deletedStudent = response.save();
      if (deletedStudent) {
        return res
          .status(200)
          .json({ message: "student deleted successfully" });
      } else {
        return res
          .status(500)
          .json({ error: "student NOT deleted successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
