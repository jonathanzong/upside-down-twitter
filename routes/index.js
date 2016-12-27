var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

/* GET */
router.get('/*', function(req, res, next) {
  console.log(req.originalUrl);
  request('http://www.twitter.com' + req.originalUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var $flip = $('<div class="twitter-flipper"></div>');
      $('body').wrap($flip);
      var $style = $('<style>.twitter-flipper{transform: rotate(180deg) !important;}</style>');
      $('head').append($style);
      var $scroller = $('<script>$(document).resize(function(){$(document).scrollTop($(document).height());});</script>')
      res.send($.html());
    }
    else {
      console.error(error);
    }
  });
});

/* POST */
router.post('/*', function(req, res, next) {
  console.log(req.originalUrl);
  request({
    url: 'http://www.twitter.com' + req.originalUrl,
    method: 'POST',
    followAllRedirects: true,
    headers: req.headers
    }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
    else {
      console.error(error + response.statusCode);
    }
  });
});

module.exports = router;
