const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} -` + file.originalname);
  },
});

const upload = multer({ storage });
const PORT = 8001;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("Home");
});

app.post("/upload", upload.single("profile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, () => console.log("Server is connected"));
