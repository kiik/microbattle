
var RoomGUIManager = function() {


    var hideAll = function() {
        $("#lobbyGUI").hide();
        $("#loginForm").hide();
    }

    var enableLobbyGUI = function() {
        this.hideAll();
        $("#lobbyGUI").show();
    }

    var disableLobbyGUI = function() {
        this.hideAll();
        $("#lobbyGUI").hide();
    }

    var showLoginForm = function() {
        this.hideAll();
        $("#loginForm").show();
    }

    var repopulateRoomList = function(rooms) {
        console.log(rooms);
        var room_list = $("#roomList");
        room_list.html("");
        if(rooms.length>0) {
            for(var i=0;i<rooms.length;i++) {
                var room = rooms[i];
                var html = '<div class="email-item clickable pure-g"><div class="pure-u-3-4"><h5 class="email-name">';
                html+=rooms.ownerId;
                html+='</h5><h4 class="email-subject">'+room.name+'</h4>';
                html+='<p class="email-desc">'+room.players+'</p>';
                html+='</div></div>';
                html = $(html);
                html.click(function(e) {
                    onRoomSelect(e, room.id);
                });
                room_list.append(html);
            }

        } else {
            room_list.html("No rooms found.");
        }
    }

    var updateLobbyClientList = function(players) {
        var elem = $("#lobbyPlayerList");
        elem.html("");
        for(var i=0;i<players.length;i++) {
            elem.append("<li><a href='#!'>"+players[i]+"</a></li>");
        }
    }

    var showDisconnect = function() {
        this.hideAll();
    }

    return {
        hideAll: hideAll,
        enableLobbyGUI: enableLobbyGUI,
        disableLobbyGUI: disableLobbyGUI,
        showLoginForm: showLoginForm,
        showDisconnect: showDisconnect,
        updateLobbyClientList: updateLobbyClientList,
        repopulateRoomList: repopulateRoomList,
    }
}
