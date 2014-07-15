/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
    remotePlayers,
    socket,
    room_manager;

var _DISCONNECTED = 0;
var _CONNECTED = 1;
var _LOGGED_IN = 2;

var SOCKET_STATE = _DISCONNECTED;
/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	localPlayer = new Player();

    room_manager = RoomGUIManager();
	// Start listening for events
    socket = io.connect();
	setEventHandlers();

    remotePlayers = [];
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	//window.addEventListener("keydown", onKeydown, false);
	//window.addEventListener("keyup", onKeyup, false);

	// Window resize
	//window.addEventListener("resize", onResize, false);
    socket.on("connect", onSocketConnected);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("loginResponse", onLoginResp);
    socket.on("lobbyClientsResponse", onClientsResponse);
    //socket.on("remove player", onRemovePlayer);

};

function onClientsResponse(data) {
    console.log(data);
    room_manager.updateLobbyClientList(data);
}
function getLobbyClients() {
    socket.emit("getLobbyClients");
}

function startLogin() {
    if(SOCKET_STATE==_CONNECTED) {
        localPlayer.name = $("#loginForm input").val();
        socket.emit("login", localPlayer.getLoginData());
    }
};

function onLoginResp(data) {
    console.log(data);
    if(SOCKET_STATE==_CONNECTED) {
        if(data.success) {
            room_manager.enableLobbyGUI();
            getLobbyClients();
            return;
        } else {
            console.log(data.msg);
        }
    } else {
        console.log("[onLoginResp]Invalid state for login");
    }
    room_manager.disableLobbyGUI();
}

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

function onSocketConnected() {
        console.log("Connected to socket server");
        room_manager.showLoginForm();
        SOCKET_STATE = _CONNECTED;
};

function onSocketDisconnect() {
        console.log("Disconnected from socket server");
        SOCKET_STATE = _DISCONNECTED;
        room_manager.showDisconnect();
};

function onNewPlayer(data) {
        console.log("New player connected: "+data.id);
        var newPlayer = new Player(data.x, data.y);
        newPlayer.id = data.id;
        remotePlayers.push(newPlayer);
};

function onMovePlayer(data) {
    var movePlayer = playerById(data.id);

    if (!movePlayer) {
        console.log("Player not found: "+data.id);
        return;
    };

    movePlayer.setX(data.x);
    movePlayer.setY(data.y);
};

function onRemovePlayer(data) {
    var removePlayer = playerById(data.id);

    if (!removePlayer) {
            console.log("Player not found: "+data.id);
                return;
    };

    remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};

function playerById(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
        if (remotePlayers[i].id == id)
            return remotePlayers[i];
    };

    return false;
};

/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
    if (localPlayer.update(keys)) {
            socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
    };
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the local player
	localPlayer.draw(ctx);
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
            remotePlayers[i].draw(ctx);
    };
};
