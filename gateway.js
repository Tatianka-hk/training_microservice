const express = require('express');
var cors = require("cors");
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
const axios = require("axios");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// Define routes for each service
const userService = "http://localhost:8001";
const itemService = "http://localhost:8002";
const orderService = "http://localhost:8003";

// Forward requests to respective service based on URL path
app.all("/:service/:endpoint", (req, res) => {

  switch (req.params.service) {
    case "user":
      axios({
        method: req.method,
        url: `${userService}/${req.params.endpoint}`,
        data: req.body,
        headers:req.headers,
        params:req.query
      })
        .then(response => {
          res.status(response.status).send(response.data);
        })
        .catch(error => {
          res.status(error.response.status).send(error.response.data);
        });
      break;
    case "cita":
      axios({
        method: req.method,
        url: `${itemService}/${req.params.endpoint}`,
        data: req.body,
        headers:req.headers,
        params:req.query
      })
        .then(response => {
          res.status(response.status).send(response.data);
        })
        .catch(error => {
          res.status(error.response.status).send(error.response.data);
        });
      break;
    case "prescription":
      axios({
        method: req.method,
        url: `${orderService}/${req.params.endpoint}`,
        headers:req.headers,
        data: req.body,
        params:req.query
      })
        .then(response => {
          res.status(response.status).send(response.data);
        })
        .catch(error => {
          res.send(error.response);
        });
      break;
    default:
      res.status(404).send({ error: "Service not found" });
  }
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Gateway listening on port ${port}`);
});