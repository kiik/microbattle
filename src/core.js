var mongo = require('mongodb');
mongo.connect('mongodb://0.0.0.0:27017/test')

var db = mongoose.connection, models_loaded = false;

var roomSchema = mongoose.Schema({
       room: { type: String, index: true },
       status: String,
       numPlayers: Number,

       //players: [mongoose.Schema({
       //      id: String,
       //      name: String,
        //     status: String
        //      }, { _id: false })]

});

exports.db = db
exports.models_loaded = models_loaded;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("[core]Database connection open. Loading models...");
    Room = mongoose.model("Room", roomSchema);
    console.log(Room);
    exports.Room = Room
    exports.models_loaded = true;
});

