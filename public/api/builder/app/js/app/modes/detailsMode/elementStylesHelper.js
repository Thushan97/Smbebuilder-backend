define(['elementsBehaviorHelper'], function (elementsBehaviorHelper) {

    var self = {
        getAllStyles: function (element) {
            return {
                boxModelStyles: this.getStylesForBoxModel(element),
                borderRadiusStyles: this.getStylesForBorderRadius(element),
                colorStyles: this.getColorStyles(element),
				backgroundImg: this.getBackgroundImgStyles(element),
            }
        },
        getStylesForBoxModel: function (element) {
            return {
                paddingLeft: $(element).css('padding-left'),
                paddingRight: $(element).css('padding-right'),
                paddingTop: $(element).css('padding-top'),
                paddingBottom: $(element).css('padding-bottom'),
                marginLeft: $(element).css('margin-left'),
                marginRight: $(element).css('margin-right'),
                marginTop: $(element).css('margin-top'),
                marginBottom: $(element).css('margin-bottom'),
                borderLeftWidth: $(element).css('border-left-width'),
                borderRightWidth: $(element).css('border-right-width'),
                borderTopWidth: $(element).css('border-top-width'),
                borderBottomWidth: $(element).css('border-bottom-width')
            };
        },
        getStylesForBorderRadius: function (element) {
            return {
                borderTopRightRadius: $(element).css('borderTopRightRadius'),
                borderTopLeftRadius: $(element).css('borderTopLeftRadius'),
                borderBottomLeftRadius: $(element).css('borderBottomLeftRadius'),
                borderBottomRightRadius: $(element).css('borderBottomRightRadius')
            };
        },
		
		getBackgroundImgStyles: function (element) {
		 return {
              bgImage: $(element).classList
            
            };
        },
        getColorStyles: function (element) {
            return {
                bgColor: self.getBgColor(element),
                foreColor: $(self.getLinksFromListOrReturnRegularElement(element)).css('color'),
                opacity: $(element).css('opacity')
            };
        },
        getLinksFromListOrReturnRegularElement: function (element) {
            if ($(element).get(0).tagName == 'UL') {
                var aElements = $(element).find('li>a');
                if (aElements.length > 0) {
                    return aElements;
                }
            }
            return element;
        },
        getBgColor: function (element) {
            var bgColor = $(element).css('backgroundColor');
            if ($(element).find('.jumbotron').length > 0 && elementsBehaviorHelper.jumbatronIsEqualltoSection(element, $(element).find('.jumbotron')[0])) {
                bgColor = $(element).find('.jumbotron').css('backgroundColor');
            }
            return bgColor;
        },
		
		
  
    };
	

    return self;

});