var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

var fs = require('fs');
var path = require('path');

function readModuleFile(path, callback) {
  try {
    var filename = require.resolve(path);
    fs.readFile(filename, 'utf8', callback);
  } catch (e) {
    callback(e);
  }
}


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

router.get('/*/status/*', function(req, res, next) {
  console.log(req.originalUrl);
  request({
      url: 'http://www.twitter.com' + req.originalUrl
    }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var $style = $('<style>body{transform: rotate(180deg);}</style>');
      $('head').append($style);
      res.send($.html());
    }
    else {
      console.error(error);
      // console.error(JSON.stringify(response));
      res.status(response ? response.statusCode : 500).send(error);
    }
  });
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
      var $style = $('<style>.twitter-flipper{transform: rotate(180deg);}</style>');
      $('head').append($style);
      $('meta[name=description]').attr('content', '˙ʎɹɐʇuǝɯɯoɔ ǝʌᴉl ǝɥʇ llɐ ɥʇᴉʍ ʎɹoʇs llnɟ ǝɥʇ ʇǝƃ \'sɔᴉʇᴉlod puɐ sʇɹods oʇ ʇuǝɯuᴉɐʇɹǝʇuǝ puɐ sʍǝu ƃuᴉʞɐǝɹq ɯoɹℲ');
      $('title').html('˙ƃuᴉuǝddɐɥ s,ʇɐɥʍ s,ʇI ˙ɹǝʇʇᴉʍʇ');
      readModuleFile(path.join(__dirname, 'include.html'), function (err, contents) {
        console.log(contents);
        var $scroller = $(contents);
        $('body').append($scroller);
        res.send($.html());
      });
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
