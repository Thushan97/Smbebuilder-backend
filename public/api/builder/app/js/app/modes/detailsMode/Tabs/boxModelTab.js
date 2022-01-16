define(['modes/detailsMode/elementStylesHelper', 'services/eventListener'], function (elementStylesHelper, eventListener) {

    var styles,
        elementToChange;

    var self = {
        activate: function (element) {
            elementToChange = element;
            self.fill();
        },
        fill: function () {

            styles = elementStylesHelper.getStylesForBoxModel(elementToChange);

            /*for (var key in styles) {
                var boxModelInput = $('#styles-mode-window-' + key);
                $(boxModelInput).val(styles[key]);
				
               $(boxModelInput).off('change').on('change', self.boxModelInputOnChange);
			  var prop = $(boxModelInput).prop('value');
			   console.log(prop);
            }*/
        },
        boxModelInputOnChange: function () {
            /*var id = $(this).attr('id');
            var propToChange = id.substr(id.lastIndexOf('-') + 1);
            $(elementToChange).css(propToChange, $(this).val());
            if (propToChange.indexOf('border') > -1) {
                propToChange = propToChange.substr(0, propToChange.lastIndexOf('Width'));
                propToChange += 'Style';
                $(elementToChange).css(propToChange, 'solid');
            }*/
            // Save to Local storage
            //eventListener.emmitEvent('saveStylesModeState');
        },
        reset: function (element) {
            var stylesAttr = $(element).attr('style');
            if (typeof stylesAttr !== 'undefined') {
                stylesAttr = stylesAttr.replace(/padding-top:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/padding-left:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/padding-right:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/padding-bottom:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/padding:(\s?\w*%?)*;/g, '');

                stylesAttr = stylesAttr.replace(/margin-top:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/margin-left:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/margin-right:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/margin-bottom:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/margin:(\s?\w*%?)*;/g, '');

                stylesAttr = stylesAttr.replace(/border-top-width:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-left-width:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-right-width:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-bottom-width:\s?\w*%?;/, '');

                stylesAttr = stylesAttr.replace(/border-top-style:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-left-style:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-right-style:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-bottom-style:\s?\w*%?;/, '');

                stylesAttr = stylesAttr.replace(/border-style:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-width:(\s?\w*%?)*;/g, '');
            }
            $(element).attr('style', stylesAttr);
            self.fill();
        },
        
    };
    return self;

});