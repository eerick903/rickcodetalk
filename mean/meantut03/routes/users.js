var express = require('express');
var router = express.Router();
var Models = require('../models/models');
var bcrypt = require('bcrypt-nodejs');

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	{ usernameField: 'name' },
	function(username, password, done) {

		console.log('username : ' + username);
		console.log('password : ' + password);

		Models.User.findOne({ name: username }, function(err, user) {
			
			console.log(user);

			if (err) { 
				console.log(err);
				return done(err); 
			}
			if (!user) {
				console.log('Incorrect username');
				return done(null, false, { message: 'Incorrect username.' });
			}

			bcrypt.compare(password, user.password, function(err, res) {
			    
			    if(err || res == false) {

			    	console.log('Incorrect password');
					return done(null, false, { message: 'Incorrect password.' });
			    } else {

			    	console.log('Name and password Ok!');
					return done(null, user);
			    }
			});
		});
	}
	));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
	passport.authenticate('local', { 
		successRedirect: 'successLogin',
		failureRedirect: 'failedLogin'})
	);

router.get('/successLogin', function(req, res, next) {
	res.json({status:'S'});
});

router.get('/failedLogin', function(req, res, next) {
	res.json({status:'F'});
});

router.get('/dashboard', authCheck, function(req, res, next) {

	res.send('Here is the landing page!');
});

function authCheck(req, res, next) {

	console.log(req.user);
	if(req.user) {

		next();
	} else {

		res.json({status:'F'});
	}
}

router.get('/logout', function(req, res, next) {

	req.logout();
	res.send('logout!');
});



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
