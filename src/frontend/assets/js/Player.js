/**************************************************
** CONNECTION USER CLASS
**************************************************/
var User = function(id, name) {
    this.id = null;
    this.name = null;

    this.getLoginData = function() {
        return { name: this.name }
    }

    function init(id, name) {
        this.id = id;
        this.name = name;
    }

    init(id, name);
};

