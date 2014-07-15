/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function() {
    var id, name;

    function getLoginData() {
        return { name: this.name }
    }

	return {
		id: id,
        name: name,
        getLoginData: getLoginData
	}
};
