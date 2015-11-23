var express = require('express');
var router = express.Router();
var Twit = require('twit');
var async = require('async');
var config = require('../config.js');

var T = new Twit({
  consumer_key:         config.twitter.consumer_key
  , consumer_secret:      config.twitter.consumer_secret
  , access_token:         config.twitter.access_token
  , access_token_secret:  config.twitter.access_token_secret
});

/* GET home page. */
router.get('/', function(req, res) {
  var cursor = -1;
  if (req.query.page) {
    cursor = req.query.page;
  }

  T.get('followers/list', { screen_name: config.twitter.user, count: 200, cursor: cursor },  function (err, data, response) {
    res.render('index', { followers: data.users, next: data.next_cursor, previous: data.previous_cursor });
  })
});

router.post('/', function(req, res) {

  //TODO: Figure out why it sends a string versus array
  var report_ids = [];
  if (typeof req.body.report === 'string') {
    report_ids = [req.body.report];
  }
  else {
    report_ids = req.body.report;
  }

  async.each(report_ids, function(user_id, callback) {
    console.log("Blocking user id: " + user_id);
    T.post('users/report_spam', {user_id: user_id}, function(err, data, response) {
      if (err) {
        callback(err);
      }
      callback();
    })
  }, function(err) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("All done!");
    }
    res.redirect('/');
  });
});

router.post('/block_export', function(req, res) {
  var report_ids = [];
  if (typeof req.body.report === 'string') {
    report_ids = [req.body.report];
  }
  else {
    report_ids = req.body.report;
  }


  res.send(report_ids.join("<br />"));
});

module.exports = router;
