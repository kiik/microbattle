var util = require("util"),
    Player = require("./Player").Player;

var PlayerService = function(app, io) {
    var players = [];
    var io = io;

    var playerById = function(id) {
        var i;
        for (i = 0; i < players.length; i++) {
            if (players[i].id == id)
                return players[i];
        };
        return false;
    };

    var onClientLogin = function(data) {
        util.log("[PlayerService.login:"+this.id+"]Identified as: "+data.name);
        var pl = playerById(this.id);

        if (!pl) {
            util.log("[PlayerService]Player not found: "+this.id);
        }

        if(!pl.doLogin(data)) {
            io.to(this.id).emit("loginResponse", { success: true, msg: "" });
            return;
        } else {
            io.to(this.id).emit("loginResponse", { success: false, msg: "Unknown Error" })
        }
    }

    var onClientDisconnect = function() {
        util.log("[PlayerService]Player has disconnected: "+this.id);
        var removePlayer = playerById(this.id);

        if (!removePlayer) {
            util.log("[PlayerService]Player not found: "+this.id);
            return;
        }

        players.splice(players.indexOf(removePlayer), 1);
        io.emit("pl_left", {id: this.id});
    };

    var onLobbyClientsRequest = function() {
        var _players =  [];
        for(var i=0;i<players.length;i++) {
            pl = players[i];
            if(pl.isAuthenticated()) {
                _players.push(players[i].name);
            }
        }
        io.to(this.id).emit("lobbyClientsResponse", _players);
    };

    var onIOConnection = function(c) { // :param c: client object
        util.log("[PlayerService]New Player connected: "+c.id);
        c.on("disconnect", onClientDisconnect);
        c.on("login", onClientLogin);
        c.on("getLobbyClients", onLobbyClientsRequest);
        var pl = Player(c);

        io.emit("pl_joined", pl.getOnJoinData());

        var i, existingPlayer;
        for (i = 0; i < players.length; i++) {
            existingPlayer = players[i];
            this.emit("pl_joined", { id: existingPlayer.id });
        };
        players.push(pl);
    };


    var init = function(io) {
        io.on("connection", onIOConnection);
    };

    init(io)
    util.log("Initialized PlayerService");
    return this
}

exports.PlayerService = PlayerService
