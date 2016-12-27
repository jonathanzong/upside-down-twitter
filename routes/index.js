var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

/* GET /i/ */
router.get('/i/*', function(req, res, next) {
  console.log(req.originalUrl);
  request({
      url: 'http://www.twitter.com' + req.originalUrl,
      headers: {
        host: 'twitter.com',
        referer: 'http://www.twitter.com' + req.originalUrl
      }
    }).pipe(res);
});

/* GET */
router.get('/*', function(req, res, next) {
  console.log(req.originalUrl);

  request({
      url: 'http://www.twitter.com' + req.originalUrl
    }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var $flip = $('<div class="twitter-flipper"></div>');
      $('body').wrap($flip);
      var $style = $('<style>.twitter-flipper{transform: rotate(180deg) !important;}</style>');
      $('head').append($style);
      // var $scroller = $('<script>$(document).scroll(function(){$(document).scrollTop()>=.9*$(document).height()?(console.log("ya dumb fuck"),$(document).scrollTop(.8*$(document).height())):$(document).scrollTop()<=1&&(console.log("gooooo"),$(document).scrollTop($(document).height()),$(document).scrollTop(0))});</script>');
      // $('body').append($scroller);
      res.send($.html());
    }
    else {
      console.error(error);
      // console.error(JSON.stringify(response));
      res.status(response ? response.statusCode : 500).send(error);
    }
  });
});

/* POST */
router.post('/*', function(req, res, next) {
  console.log(req.originalUrl);
  // var headers = JSON.parse(JSON.stringify(req.headers));
  // headers.host = 'twitter.com';
  // headers.origin = 'https://twitter.com';
  // request({
  //   url: 'https://www.twitter.com' + req.originalUrl,
  //   method: 'POST',
  //   followAllRedirects: true,
  //   headers: headers,
  //   form: req.body
  //   }, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     res.send(body);
  //   }
  //   else {
  //     console.error(response.statusCode);
  //     console.error(JSON.stringify(response));
  //     res.status(response.statusCode).send(error);
  //   }
  // });
  res.send("");
});

module.exports = router;
