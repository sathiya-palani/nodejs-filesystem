const express = require("express");
const app = express();
const fs = require("node:fs");
const path = require("path");
const { format } = require("date-fns");

// to create a server and timestamp 
// today shows the current date-time

app.get("/", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
  console.log("today", today);
  const filePath = `TimeStamp/${today}.txt`;
  console.log("filePath", filePath);

  // to create a text file

  fs.writeFileSync(filePath, `${today}`, "utf8");
  let data = fs.readFileSync(filePath, "utf8");
  try {
    res.status(200).send(data);
  } catch (error) {
    req.res(500).send("Internal server error");
  }
});

// to retrieve the text file

app.get("/getTextFiles", (req, res) => {
  const folderPath = "TimeStamp";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error ocured while listen files to directory ");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");

      res.status(200).json(textFiles);
    }
  });
});

// server runs

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
