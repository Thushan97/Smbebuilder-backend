define(['elementsBehaviorHelper', 'services/contentEditModeService'], 
	function (elementsBehaviorHelper, contentEditModeService) {

    var self,
        elementWorkWith,
        bgColorsForTag = fillBgColors();

    self = {
        activate: function () {
            self.unbindPreviousMode();
            $('body').off('mousemove').on('mousemove', self.demoMouseMove);
            $('#html-mode-hover-element').off('click').on('click', self.htmlEditorShow);
			$('#_elmmode').removeClass('hide');
			$('#blocks-mode-tools').addClass('hide');
        },

        demoMouseMove: function (event) {
            self.hideHoverDiv();
            var newElement = self.getElement(event);
            if (!$(newElement).hasClass('drag') && !$(newElement).hasClass('fa-arrows') && !$(newElement).hasClass('settings-block') && !$(newElement).is('.settings-block .fa') && !$(newElement).hasClass('m__move_arrow') && !$(newElement).hasClass('md_up') &&
			!$(newElement).hasClass('md_down') && !$(newElement).hasClass('remove-block') && !$(newElement).hasClass('fa-times') && $('.demo').find(newElement).length > 0) {
                if (newElement !== elementWorkWith) {
                    elementWorkWith = newElement;
                    self.setupHoverDiv();
                }
                self.showHoverDiv();
            }
        },

        getElement: function (event) {

            var elementFromPoint = document.elementFromPoint(event.clientX, event.clientY);

            if (elementFromPoint.tagName == 'A' && $(elementFromPoint).parent('li').length > 0) {
                elementFromPoint = $(elementFromPoint).parent().parent()[0];
            }
            else if ($(elementFromPoint).hasClass('panel-body') && $(elementFromPoint).parent().hasClass('panel')) {
                elementFromPoint = $(elementFromPoint).parent()[0];
            }
           /* else {
                elementFromPoint = self.getNeededElement(elementFromPoint);
            }*/

            return elementFromPoint;
        },

        getNeededElement: function (elementFromPoint) {


            var elemMargLeft = parseInt($(elementFromPoint).css('marginLeft'));
            var elemMargRight = parseInt($(elementFromPoint).css('marginRight'));
            var elemMargTop = parseInt($(elementFromPoint).css('marginTop'));
            var elemMargBottom = parseInt($(elementFromPoint).css('marginBottom'));

            var parentMargLeft = parseInt($(elementFromPoint).parent().css('marginLeft'));
            var parentMargRight = parseInt($(elementFromPoint).parent().css('marginRight'));
            var parentMargTop = parseInt($(elementFromPoint).parent().css('marginTop'));
            var parentMargBottom = parseInt($(elementFromPoint).parent().css('marginBottom'));


            var elemOuterHeight = $(elementFromPoint).outerHeight() - elemMargTop - elemMargBottom;
            var elemOuterWidth = $(elementFromPoint).outerWidth() - elemMargLeft - elemMargRight;

            var parentOuterHeight = $(elementFromPoint).parent().outerHeight() - parentMargTop - parentMargBottom;
            var parentOuterWidth = $(elementFromPoint).parent().outerWidth() - parentMargLeft - parentMargBottom;

            if (elemOuterHeight == parentOuterHeight && elemOuterWidth == parentOuterWidth) {
                self.getNeededElement($(elementFromPoint).parent());
            }
            else {
                return elementFromPoint;
            }
        },

        setupHoverDiv: function () {
            var propOfElement = self.getElementProperties();

            $('#html-mode-hover-element-child-left').text('');
            $('#html-mode-hover-element-child-right').text('');

            if (propOfElement.width >= 50 && propOfElement.width < 200) {
                $('#html-mode-hover-element-child-left').text('<' + propOfElement.tagName + '>');
                $('#html-mode-hover-element-child-right').text('</' + propOfElement.tagName + '>');
            }
            else if (propOfElement.width >= 200) {
                $('#html-mode-hover-element-child-left').text('<' + propOfElement.tagName + ' class="' + propOfElement.classList + '"' + '>');
                $('#html-mode-hover-element-child-right').text('</' + propOfElement.tagName + '>');
            }

            $('#html-mode-hover-element').css({
                height: propOfElement.height,
                width: propOfElement.width,
                "background-color": self.getBgColorByTagName(propOfElement.tagName),
                top: propOfElement.top,
                left: propOfElement.left
            });
        },

        getBgColorByTagName: function (tagName) {
            for (var i = 0; i < bgColorsForTag.length; i++) {
                if (bgColorsForTag[i].tagName == tagName) {
                    return bgColorsForTag[i].bgColor;
                }
            }
        },

        getElementProperties: function () {
            var tagName = elementWorkWith.tagName;
            var classList = elementWorkWith.className;
            var width = $(elementWorkWith).outerWidth();
            var height = $(elementWorkWith).outerHeight();
            var marginTop = parseInt($(elementWorkWith).css('marginTop'));

            var offset = $(elementWorkWith).offset();
            var top = offset.top;
            var left = offset.left;

            return {
                tagName: tagName.toLowerCase(),
                classList: classList,
                width: width,
                height: height,
                top: top,
                left: left
            };
        },

        hideHoverDiv: function (event) {
            $('#html-mode-hover-element').hide();
        },

        showHoverDiv: function () {
            $('#html-mode-hover-element').show();
        },

        unbindPreviousMode: function () {
            elementsBehaviorHelper.getElementsForEdit($('.demo').find('.box-layer'), 'contentmode').off('click').off('mouseenter');
        },

        htmlEditorShow: function () {
            var t = {
                currentTarget: elementWorkWith
            };
            contentEditModeService.prepare2show(t);
        },
        unbind: function () {
            $('body').off('mousemove');
			$('#_elmmode').addClass('hide');
			$('#blocks-mode-tools').removeClass('hide');
        }
    };

    function fillBgColors() {
        return [
            {
                tagName: 'h1',
                bgColor: 'rgba(178, 231, 37, 0.501961)'
            },
            {
                tagName: 'h2',
                bgColor: 'rgba(0, 174, 239, 0.501961)'
            },
            {
                tagName: 'h3',
                bgColor: 'rgba(243, 115, 155, 0.501961)'
            },
            {
                tagName: 'h4',
                bgColor: 'rgba(255, 102, 255, 0.501961)'
            },
            {
                tagName: 'p',
                bgColor: 'rgba(0, 174, 239, 0.501961)'
            },
            {
                tagName: 'div',
                bgColor: 'rgba(243, 115, 155, 0.501961)'
            },
            {
                tagName: 'a',
                bgColor: 'rgba(255, 102, 255, 0.501961)'
            },
            {
                tagName: 'img',
                bgColor: 'rgba(198, 12, 70, 0.501961)'
            },
            {
                tagName: 'ol',
                bgColor: 'rgba(255, 102, 255, 0.501961)'
            },
            {
                tagName: 'li',
                bgColor: 'rgba(178, 231, 37, 0.501961)'
            },
            {
                tagName: 'ul',
                bgColor: 'rgba(198, 12, 70, 0.501961)'
            },
            {
                tagName: 'strong',
                bgColor: 'rgba(255, 102, 255, 0.501961)'
            },
            {
                tagName: 'span',
                bgColor: 'rgba(230, 97, 36, 0.501961)'
            },
            {
                tagName: 'input',
                bgColor: 'rgba(243, 115, 155, 0.501961)'
            },
        ];
    };
    return self;
});