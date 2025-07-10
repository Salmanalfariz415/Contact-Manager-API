let express = require("express");

let dotenv = require("dotenv").config();

let app = express();

let port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
  console.log("Server is running on port 3001");
});
