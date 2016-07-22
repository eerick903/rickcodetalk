var express = require('express');
var router = express.Router();
var Models = require('../models/models');
var bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* For user registration. */
router.post('/register', function(req, res, next) {

	console.log(req.body);

	var user;

	Models.User.find({name:req.body.name}, function(err, user) {

		if(err) {

			res.send('Unknown error!');
		} else {

			if(user.length > 0) {

				// user already exists
				res.send('User already exists!');

			} else {

				// new user
				var newUser = new Models.User({name:req.body.name, password:bcrypt.hashSync(req.body.password)});

				newUser.save(function(err) {

					if(err) {

						res.send('Unknown error!');
					} else {

						res.send('Registered successfullu!');
					}
				});
			}
		}
	});

});

module.exports = router;
