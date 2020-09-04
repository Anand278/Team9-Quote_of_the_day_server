const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Promise = require("bluebird");
const mysql = require("mysql");
const add =  require("./addqoute");
const show = require("./showqoute");
const remove = require("./delete");



Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);


const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const upload = multer(); 


const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "",
  database: "dacdemo",
};


const dbadduser = require("./db.add.user");

app.get("/adduser", async (req, res) => {
  try {
    
    const input = req.query;

    await dbadduser.addUser(input);
    res.json({ message: "success" });
  } catch (err) {
    res.json({ message: "failure" });
  }
});


app.post("/adduser", async (req, res) => {
  try {
    const input = req.body; // before doing this

    await dbadduser.addUser(input);
    res.json({ message: "success post" });
  } catch (err) {
    res.json({ message: "failure post" });
  }
});

app.post("/auth-user", async (req, res) => {
  try {
    const input = req.body;

    await dbadduser.authenticateUser(input);
    res.json({ opr: true });
  } catch (err) {
    res.json({ opr: false });
  }
});

app.post("/sample", upload.none(), async (req, res) => {
  res.json(req.body);
});

 
app.post("/addqoute", async (req, res) => {
  try {
      // const input = req.query;
      const input = req.body;
      const resdata = await add.addqoute(input);
      const json = { message: "sucessfully inserted", Id: resdata };
      res.json(json);

  } catch (err) {
      const json = { message: "error" };
      res.json(json);
  }
});


app.get("/showqoute", async (req, res) => {
  try {
    const results = await show.showqoute();

    res.json(results);
  } catch (err) {
    const json = { message: "Failure" };
    res.json(json);
  }
});


app.post("/delete", async (req, res) => {
  try {

      const input = req.body; // before doing this
       await remove.removepp(input);
      // await removepp.delete(input);
      res.json({ message: "success post" });
  } catch (err) {
      res.json({ message: "failure post" });
  }
});

// started teh server.
app.listen(3000);
