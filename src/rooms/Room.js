var mongoose = require('mongoose');

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

exports.roomSchema = roomSchema
