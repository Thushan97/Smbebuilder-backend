define(['eventEmmiter'], function (ll) {

    var ee = new ll();

    return {
        addListener: function (nameOfListener, callback) {
            ee.addListener(nameOfListener, callback);
        },
        emmitEvent: function (nameOfListener, params) {
            ee.emitEvent(nameOfListener, params);
        }
    };

});