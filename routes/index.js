var express = require('express');
var router = express.Router();

var request = require('request');

/* GET home page. */
router.get('/*', function(req, res, next) {
  console.log(req.originalUrl);
  request('http://www.twitter.com' + req.originalUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      // body = '<style>body{transform: rotate(180deg) !important;}</style>' + body;
      res.send(body);
    }
    else {
      console.err(error);
    }
  });
});

module.exports = router;
