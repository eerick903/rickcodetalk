var express = require('express');
var sockjs  = require('sockjs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var channel = require('./routes/channel');
var channelService = require('./js/channelService');
/*
var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
 
var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
});
*/

var app = express();

/*----------------*/
/*
var WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // TODO SOMEDAY
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + 
          ' Connection fron origin ' + 
          request.origin + ' rejected.');
        return;
    }
    
    //var connection = request.accept('sinedata', request.origin);

    var connection = request.accept();
    //observableSineWave(this, .1, 10);
    console.log("request");
    connection.on('message', function(message) {
        console.log(message);
        //connection.sendUTF(message.utf8Data);
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + 
           connection.remoteAddress + 
           ' disconnection. Reason: ' + reasonCode);
    });

});
*/
/*---------------------*/

var ws = require("nodejs-websocket")
 
// Scream server example: "hi" -> "HI!!!" 
var server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("text", function (str) {
        console.log("Received "+str)
        channelService.processWebSocketMessage(str, conn);
    })
    conn.on("error", function (str) {
        console.log("error Received "+str)
        //conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })

}).listen(8080)

/*
var http = require('http');

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
    conn.on('close', function() {});
});

var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(9999, '0.0.0.0');
*/
//sockjs_echo.installHandlers(app, {prefix:'/echo'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/channel', channel);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
