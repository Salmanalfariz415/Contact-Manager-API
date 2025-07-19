let express = require("express");

let errorHandler = require("./middleware/errorHandler");
let dotenv = require("dotenv").config();

let app = express();

let port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Use error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is running on port 3001");
});
