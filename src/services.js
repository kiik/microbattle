var PlayerService = require("./players/players").PlayerService;
var RoomService = require("./rooms/rooms").RoomService;

var player_s, room_s;

function init_services(app, io) {
    console.log("[services]Initializing services.");

    player_s = PlayerService(app, io);
    room_s = RoomService(app, io);

    exports.player_s = player_s;
    exports.room_s = room_s;
}

exports.init_services = init_services;
exports.player_s = player_s;
exports.room_s = room_s;

