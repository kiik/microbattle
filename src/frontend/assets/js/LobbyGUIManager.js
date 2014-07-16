
var RoomGUIManager = function() {
    var selRoomElem,
        joinedRoomItem,
        joinedRoomWindow,
        room_select_enabled = true;


    /**************************************************
    ** MISCELLANEOUS GUI FUNCTIONS
    **************************************************/
    var showDisconnect = function() {
        this.hideAll();
    }

    var hideAll = function() {
        $("#lobbyGUI:visible, #loginForm:visible").hide();
    }


    /**************************************************
    ** UNAUTHENTICATED STATUS GUI FUNCTIONS
    **************************************************/
    var showLoginForm = function() {
        this.hideAll();
        $("#loginForm").show();
    }


    /**************************************************
    ** LOBBY GUI FUNCTIONS
    **************************************************/
    var showRoom = function(room) {
        $("#main").html(roomContentTemp(room));
    }

    var disableRoomSelection = function() {
        $("#roomList").css("opacity", "0.5");
        room_select_enabled = false;
    }

    var enableRoomSelection = function() {
        $("#roomList").css("opacity", "unset");
        room_select_enabled = true;
    }

    var getRoomSelectStatus = function() {
        return room_select_enabled;
    }

    var setJoinedRoom = function() {

    }

    var selectRoom = function(e, id) {
        var elem,
            tar = $(e.target);
        testvar = e;
        if(tar.hasClass("clickable")) {
            elem = tar;
        } else {
            elem = tar.parents(".email-item");
        }

        if(selRoomElem!=elem) {
            if(selRoomElem) {
                selRoomElem.removeClass("item-selected");
            }
            elem.addClass("item-selected");
            selRoomElem = elem;
        }

        return selRoomElem.prop("id");
    }

    var repopulateRoomList = function(rooms, callback) {
        var room_list = $("#roomList");
        room_list.html("");
        if(rooms.length>0) {
            for(var i=0;i<rooms.length;i++) {
                var room = rooms[i];
                html = $(roomEntryTemp(room));
                html.click(function(e) {
                    callback(e);
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

    var displayLobby = function() {
        this.hideAll();
        $("#lobbyGUI").show();
    }

    var disableLobbyGUI = function() {
        this.hideAll();
        $("#lobbyGUI").hide();
    }


    return {
        hideAll: hideAll,
        displayLobby: displayLobby,
        disableLobbyGUI: disableLobbyGUI,
        showLoginForm: showLoginForm,
        showDisconnect: showDisconnect,
        updateLobbyClientList: updateLobbyClientList,
        repopulateRoomList: repopulateRoomList,
        selectRoom: selectRoom,
        setJoinedRoom: setJoinedRoom,
        disableRoomSelection: disableRoomSelection,
        enableRoomSelection: enableRoomSelection,
        getRoomSelectStatus: getRoomSelectStatus,
        showRoom: showRoom,
    }
}
