const express = require('express');
const router = express.Router();
const {APP_NAME} = process.env;

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(APP_NAME);
  res.send(APP_NAME);
});

module.exports = router;
