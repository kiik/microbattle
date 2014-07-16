var util = require("util"),
    models = require("../models");


var RoomService = function(app, io) {

    var getRoomsData = function() {
        models.Room.find().exec(function(err, rooms) {
            if(err) {util.log(err);return [];}
        });
    }

    var onRoomListReq = function() {
        var id = this.id;
        models.Room.find().exec(function(err, rooms) {
            if(err) {util.log(err);return [];}
            io.to(id).emit("roomListResp", rooms);
        });
    };

    var onRoomDataReq = function(data) {
        var id = this.id;
        if(data.id) {
            models.Room.findOne({ _id: data.id }).exec(function(err, room) {
                if(err) {util.log(err);return [];}
                io.to(id).emit("roomDataResp", room);
            });
        }
    };

    this.registerHandlers = function(client) {
        client.on("getRoomList", onRoomListReq);
        client.on("getRoomData", onRoomDataReq);
    };

    var init = function() {
    };

    init();
    util.log("Initialized RoomService");
    return this
}

exports.RoomService = RoomService

