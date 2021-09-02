const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bp.json());
app.use(cors());

const users = [];
const courses = [];

app.post("/register", (req, res) => {
  const randomId = uuidv4();
  if ((req.body.email, req.body.password)) {
    if (
      users.some((v) => v.email.toLowerCase() === req.body.email.toLowerCase())
    ) {
      res.send({ status: "Failed: This email already exists" });
    } else {
      users.push({
        id: randomId,
        email: req.body.email,
        pass: req.body.password,
      });
      res.send({ status: "OK: Registration was successfull." });
    }
  } else {
    res.send({ status: "Failed: data incorrect." });
  }
});

app.post("/login", (req, res) => {
  if ((req.body.email, req.body.password)) {
    const user = users.find(
      (v) =>
        v.email.toLowerCase() === req.body.email.toLowerCase() &&
        v.pass === req.body.password
    );
    if (user) {
      res.send({ status: "OK: Login successfull.", id: user.id });
    } else {
      res.send({ status: "Failed: Wrong email or password." });
    }
  } else {
    res.status(400).send({ status: "Failed: data incorrect." });
  }
});

app.get("/getsome/:id", (req, res) => {
  if (req.params.id) {
    res.send(courses.filter((v) => v.userid === req.params.id).slice(0, 8));
  } else {
    res.status(400).send({ status: "Failed: data incorrect." });
  }
});

app.get("/getall/:id", (req, res) => {
  if (req.params.id) {
    res.send(courses.filter((v) => v.userid === req.params.id));
  } else {
    res.status(400).send({ status: "Failed: data incorrect." });
  }
});

app.post("/add", (req, res) => {
  if (
    req.body.userid &&
    req.body.title &&
    req.body.image &&
    req.body.price.old &&
    req.body.price.new &&
    req.body.length &&
    req.body.params
  ) {
    courses.push({
      userid: req.body.userid,
      title: req.body.title,
      url: req.body.image,
      oldprice: req.body.price.old,
      newprice: req.body.price.new,
      parameters: {
        game: req.body.params.game || false,
        vidlength: req.body.length,
        beginner: req.body.params.beginner || false,
        cc: req.body.params.cc || false,
      },
    });
    res.send({ status: "OK: Course added successfully." });
  } else {
    res.status(400).send({ status: "Failed: data incorrect." });
  }
});

const port = 5000;

app.listen(port, () => console.log(`The server is running on port ${port}`));
