const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
