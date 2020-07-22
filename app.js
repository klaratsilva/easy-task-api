const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

//import routes
const types = require("./routes/types");
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR the jwt is not defined");
  process.exit(1);
}

//connect to mongoose
mongoose
  .connect("mongodb://localhost/easy-task")
  .then(() => console.log("connected to MongoDb..."))
  .catch((err) => console.error("could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/types", types);
app.use("/api/tasks", tasks);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));
