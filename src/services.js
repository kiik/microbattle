var PlayerService = require("./players/players").PlayerService;
var RoomService = require("./rooms/rooms").RoomService;

var ServiceManager = function(app, io) {
    var pl_man = PlayerService(app, io),
        r_man = RoomService(app, io);

    return {
        player_s : pl_man,
        room_s : r_man,
    }
};

exports.ServiceManager = ServiceManager

