
var RoomGUIManager = function() {
    var selRoomElem;

    var hideAll = function() {
        $("#lobbyGUI").hide();
        $("#loginForm").hide();
    }

    var displayLobby = function() {
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

    var selectRoom = function(e, id) {
        var elem,
            tar = $(e.target);
        if(tar.hasClass("clickable")) {
            elem = tar;
        } else {
            elem = tar.parents(".email-item");
        }
        if(selRoomElem) {
            selRoomElem.removeClass("item-selected");
        }
        elem.addClass("item-selected");
        selRoomElem = elem;
    }

    var repopulateRoomList = function(rooms) {
        var room_list = $("#roomList");
        room_list.html("");
        if(rooms.length>0) {
            for(var i=0;i<rooms.length;i++) {
                var room = rooms[i];
                html = $(roomEntryTemp(room));
                html.click(function(e) {
                    selectRoom(e, room.id);
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
        displayLobby: displayLobby,
        disableLobbyGUI: disableLobbyGUI,
        showLoginForm: showLoginForm,
        showDisconnect: showDisconnect,
        updateLobbyClientList: updateLobbyClientList,
        repopulateRoomList: repopulateRoomList,
    }
}
