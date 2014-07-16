var util = require("util"),
    express = require("express"),
    app = express(),
    http = require('http').Server(app),
    io = require("socket.io")(http),

    //Application Modules
    models = require("./models"),
    services = require("./services");

var s_man;

//******************
app.get('/', function(req, res){
      res.sendfile(__dirname+'/frontend/templates/index.html');
});

//app.use(express.compress());
app.use(express.static(__dirname+"/frontend/assets", { maxAge: 1000 }));


function init() {
    services.init_services(app, io);

    console.log("init() fin.");
};


init();

exports.http = http

