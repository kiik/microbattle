var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/microb_dev');

var Room;

var roomSchema = mongoose.Schema({
    room: { type: String, index: true },
    status: String,
    numPlayers: Number,
    name: String,
    ownerId: String,

    players: [mongoose.Schema({
        id: String,
        name: String,
        status: String
        }, { _id: false })
        ]
});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("[core]Database connection open. Loading models...");

    Room = mongoose.model('Room', roomSchema);

    //var nPl = 3;
    //var players = [];
    //for(var i=0;i<nPl;i++) {
    //    players.push({id:"None", name:"Open", status:"None"})
    //}

    //var r = new Room({"name":"Public Room", "ownerId":"-1", "status": "open", "numPlayers":nPl, players:players})
    //console.log(r);

    exports.Room = Room;
    console.log("[Core]Models loaded.");
});

exports.Room = Room;
