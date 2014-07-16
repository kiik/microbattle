/**************************************************
** GAME VARIABLES
**************************************************/
var socket,
    lobby;


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
    socket = io.connect();
    lobby = LobbyManager(socket);

	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {

};

function startLogin() {
    lobby.doLogin($("#loginForm input").val());
};

