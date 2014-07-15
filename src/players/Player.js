
var Player = function(client) {
    var id, name;
    var authenticated = false;

    function doLogin(data) {
        this.name = data.name;
        this.authenticated = true;
        return false;
    }

    function isAuthenticated() {
        return this.authenticated;
    }

    function getOnJoinData() {
        return { id: id }
    }

    function getLoginData() {
        return { name: name }
    }

    id = client.id;
    return {
            id: id,
            name: name,
            doLogin: doLogin,
            getLoginData: getLoginData,
            getOnJoinData: getOnJoinData,
            authenticated: authenticated,
            isAuthenticated: isAuthenticated,
    }
};

exports.Player = Player;

