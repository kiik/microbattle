/**************************************************
 ** LOBBY MANAGER
 ** FOR JOINING GAMES AND OTHER DATA VIEWING FUNCTIONS
 **************************************************/

var _S = {DISCONNECTED: 0,
    CONNECTED: 1,
    LOGGED_IN:2,
    INLOBBY: 3,
}

var LobbyManager = function(socket) {
    var joinedRoomId,
        joinedRoomData,
        localUser,
        SOCKET_STATE = _S.DISCONNECTED,
        GAME_STATE = _S.DISCONNECTED,
        gui;

    var joinRoom = function(id) {
        console.log("JOIN "+gui);
    }

    /**************************************************
     ** SOCKET EMITTERS
     **************************************************/
    var getRoomList = function() {
        if((SOCKET_STATE==_S.LOGGED_IN)&&(GAME_STATE==_S.INLOBBY)) {
            socket.emit("getRoomList");
        } else {
            console.log("[getRoomList]Bad states for this request");
        }
    }

    var getLobbyClients = function() {
        if((SOCKET_STATE==_S.LOGGED_IN)&&(GAME_STATE==_S.INLOBBY)) {
            socket.emit("getLobbyClients");
        } else {
            console.log("[getLobbyClients]Bad states for this request");
        }
    }

    var doLogin = function(data) {
        if(SOCKET_STATE==_S.CONNECTED) {
            socket.emit("login", { name: data });
        } else {
            console.log("[doLogin]Bad SOCKET_STATE for login");
        }
    }

    /**************************************************
     ** LOBBY FUNCTIONS
     **************************************************/
    var enterLobby = function() {
        if(SOCKET_STATE==_S.LOGGED_IN) {
            gui.displayLobby();
            GAME_STATE = _S.INLOBBY;
            getLobbyClients();
            getRoomList();
        }
    }


    /**************************************************
     ** SOCKET RESPONSE HANDLERS
     **************************************************/
    function onRoomListResp(data) {
        gui.repopulateRoomList(data);
    }

    function onLobbyClientsResp(data) {
        gui.updateLobbyClientList(data);
    }

    var onLoginResp = function(data) {
        if(SOCKET_STATE==_S.CONNECTED) {
            if(data.success) {
                localUser = new User(data.id, data.name);
                SOCKET_STATE=_S.LOGGED_IN;
                enterLobby();
                return;
            } else {
                console.log(data.msg);
            }
        } else {
            console.log("[onLoginResp]Invalid state for login");
        }
    }

    var onConnected = function() {
        if(SOCKET_STATE==_S.DISCONNECTED) {
            gui.showLoginForm();
            SOCKET_STATE=_S.CONNECTED;
        } else {
            console.log("UNHANDLED DISCONNECTION STATUS");
        }
    }

    var onDisconnect = function() {
        //TODO: handle disconnection while in game
        SOCKET_STATE = _S.DISCONNECTED;
        gui.hideAll();
    }


    /**************************************************
     ** INITIALIZATION
     **************************************************/
    function init(io) {
        gui = RoomGUIManager();

        io.on("connect", onConnected);
        io.on("disconnect", onDisconnect); //TODO: display loading screen whilst disconnected

        io.on("loginResp", onLoginResp);

        io.on("lobbyClientsResp", onLobbyClientsResp);
        io.on("roomListResp", onRoomListResp)
    }

    init(socket);
    return {
        joinRoom: joinRoom,
        localUser: localUser,
        doLogin: doLogin,
        SOCKET_STATE: SOCKET_STATE,
        GAME_STATE: GAME_STATE,
    }
}
