define([], function () {

    var fStyles;

    return {
        current: {},
        fonts: {},
        fontStyles: function () {
            if (!fStyles) {
                fStyles = document.querySelector('#font-styles');
				fStyles = fStyles ? $(fStyles) : $('<style id="font-styles"></style>').appendTo($('head'));
            }
            return fStyles;
        },
    };

});