"use strict";

var express = require('express');
var router = express.Router();
var channelService = require('../js/channelService');

//let channels = {};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Planning Poker');
});

router.post('/create', function(req, res, next) {

  //console.log(req.body.name);
  if(!req.body.name || req.body.name === '') {

    res.end(JSON.stringify({status:'F',reason:'Channel name cannot be empty!'}));

  } else if(channelService.isChannelExist(req.body.name)) {

    res.end(JSON.stringify({status:'F',reason:'Channel already exists!'}));
  } else {

    //channels[req.body.name] = {};
    channelService.initChannel(req.body.name);
    res.end(JSON.stringify({status:'S',reason:'Channel created!'}));

  }
});

router.get('/is_exist/:channelName', function(req, res, next) {

  //console.log(req.params.channelName);

  if(req.params.channelName && channelService.isChannelExist(req.params.channelName)) {

    res.end(JSON.stringify({status:'S'}));

  } else {

    res.end(JSON.stringify({status:'F',reason:'Channel does not exist!'}));

  }
  
});

router.post('/play/:channelName/:userName', function(req, res, next) {

  //console.log(req.params.channelName);

  if(!req.params.channelName || !channelService.isChannelExist(req.params.channelName)) {

    res.end(JSON.stringify({status:'F',reason:'Channel does not exist!'}));
  } else if(!req.params.userName || req.params.userName === '') {

    res.end(JSON.stringify({status:'F',reason:'User name cannot be empty!'}));
  } else {

console.log(req.body.value);
    if(req.body.value) {
      channelService.playCard(req.params.channelName, req.params.userName, req.body.value);
    }

    res.end(JSON.stringify({status:'S'}));

  }
  
});

router.post('/reset/:channelName', function(req, res, next) {

  //console.log(req.params.channelName);

  if(!req.params.channelName || !channelService.isChannelExist(req.params.channelName)) {

    res.end(JSON.stringify({status:'F',reason:'Channel does not exist!'}));
  }  else {

    //channels[req.params.channelName] = {};
    channelService.resetChannel(req.params.channelName);
    res.end(JSON.stringify({status:'S'}));

  }
  
});

router.delete('/leave/:channelName', function(req, res, next) {

  //console.log(req.params.channelName);

  if(!req.params.channelName || !channelService.isChannelExist(req.params.channelName)) {

    res.end(JSON.stringify({status:'F',reason:'Channel does not exist!'}));
  }  else {

    channelService.removeChannel(req.params.channelName);
    res.end(JSON.stringify({status:'S'}));

  }
  
});

router.get('/getResult/:channelName', function(req, res, next) {

  //console.log(req.params.channelName);

  if(!req.params.channelName || !channelService.isChannelExist(req.params.channelName)) {

    res.end(JSON.stringify({status:'F',reason:'Channel does not exist!'}));
  }  else {


    res.end(JSON.stringify({status:'S',result:channelService.getChannelResult(req.params.channelName)}));

  }
  
});

module.exports = router;
