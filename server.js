const express = require("express");
const cors = require("cors");
const db = require("./models");

//to creating a server
const app = express();

//to handling the cors error
app.use(cors());

//to parse requests of content-type application/json
app.use(express.json());

//to parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node application." });
});

require("./routes/index")(app);

//to set port, listen for requests
const PORT = 5050;
const HOST = "localhost";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST} : ${PORT}.`);
});
