var util = require("util"),
    models = require("../models");


var RoomService = function(app, io) {

    var getRoomsData = function() {
        models.Room.find().exec(function(err, rooms) {
            if(err) {util.log(err);return [];}
        });
    }

    var onRoomListRequest = function() {
        var id = this.id;
        models.Room.find().exec(function(err, rooms) {
            if(err) {util.log(err);return [];}
            io.to(id).emit("roomListResp", rooms);
        });
    };

    this.registerHandlers = function(client) {
        client.on("getRoomList", onRoomListRequest);
    };

    var init = function() {
    };

    init();
    util.log("Initialized RoomService");
    return this
}

exports.RoomService = RoomService

