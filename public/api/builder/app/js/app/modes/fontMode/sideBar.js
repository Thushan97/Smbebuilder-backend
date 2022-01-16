define(['modes/fontMode/variables'], function (variables) {

    var self = {
        sideBar : $('.font-settings'),
        init: function () {
            $('body').on('mousedown', function () {
                $('.control-list').hide();
            })

            $('.choose').on('click', function () {
                var list = $(this).parent().siblings('.control-list'),
					visible = list.is(':visible');

                $('.control-list').hide();
                visible ? list.hide() : list.show();
            }).on('mousedown', function (e) {
                e.stopPropagation(e);
            });

            $('.tag-list div').on('click', function () {
                var tagName = $(this).html(),
					currentSelect = tagName == 'body' ? '.font-body' : tagName;
                $('.tag_choosen span').html(tagName);
                $('#iframePreviewMode').find('iframe').contents().find('body').find('.font-tags .tag-outline').removeClass('tag-outline');
                variables.current = $('#iframePreviewMode').find('iframe').contents().find('body').find('.font-tags ' + currentSelect).addClass('tag-outline');
                self.sideBarRefresh();
                $('.tag-list').hide();
            }).on('mousedown', function (e) {
                e.stopPropagation();
            });
        },
        sideBarRefresh: function () {
            var currentFontSize = parseInt(variables.current.css('fontSize')),
				currentLineHeight = parseInt(variables.current.css('lineHeight')),
				currentLetterSpacing = parseInt(variables.current.css('letterSpacing'));

            $('.size-input[type=text]', $('.size-control', self.sideBar)).val(currentFontSize);
            $('.line-input[type=text]', $('.line-control', self.sideBar)).val(currentLineHeight);
            $('.spacing-input[type=text]', ('.spacing-control', self.sideBar)).val(currentLetterSpacing);

            $('.size-input.slider').slider('value', currentFontSize);
            $('.line-input.slider').slider('value', currentLineHeight);
            $('.spacing-input.slider').slider('value', currentLetterSpacing);
        },
        show: function () {
            self.sideBar.show();
        }
    };

    return self;
});