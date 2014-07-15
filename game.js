var util = require("util"),
    express = require("express"),
    app = express(),
    http = require('http').Server(app),
    io = require("socket.io")(http),
    ServiceManager = require("./src/services").ServiceManager;

var s_man;





//******************
app.get('/', function(req, res){
      res.sendfile('./src/frontend/templates/index.html');
});

io.on("test", function() {console.log("TEst");})
//app.use(express.compress());
app.use(express.static(__dirname+"/src/frontend/assets", { maxAge: 1000 }));


function init() {

    s_man = ServiceManager(app, io);

    util.log("[init]Waiting for database connection...");

    console.log("init() fin.");
};



init();

http.listen(8000, function(){
      console.log('listening on *:8000');
});

