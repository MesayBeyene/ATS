//Import
var express = require("express");
var app = express();
const port = 8080;

//Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.get("", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/assignmentLog", (req, res) => {
  res.sendFile(__dirname + "/views/assignmentLog.html");
});

app.get("/developerLog", (req, res) => {
  res.sendFile(__dirname + "/views/developerLog.html");
});

app.get("/generalReport", (req, res) => {
  res.sendFile(__dirname + "/views/generalReport.html");
});

//Listen on port 8080
app.listen(port, () => console.log("Listening on port 8080"));
