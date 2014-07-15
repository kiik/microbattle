
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
    }
}
