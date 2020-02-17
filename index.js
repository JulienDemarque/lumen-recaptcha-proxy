require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios").default;
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

app.post("/check-captcha", (req, res) => {
  axios
    .post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        response: req.body.response,
        secret: process.env.RECAPTCHA_SECRET_KEY
      }
    })
    .then(response => {
      console.log(response.data);
      res.json({ score: response.data.score });
    })
    .catch(err => console.warn(err));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
