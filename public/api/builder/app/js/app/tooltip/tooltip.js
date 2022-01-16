define(['modes/contentChangeIcon/changeIcon', 'services/eventListener', '../tooltip/linksEdit'], function (changeIcon, eventListener, linksEdit) {

    var iconsSelector = '[class*="fa-"]:not(.fa-ul, .settings-block .fa-cogs), [class*="mdi-"]:not(.md_up, .md_down)',
        linksEditableSelector = 'a:not(.importQbx, .m-help, .carousel-control,.go-to-content,.fa-chevron-left,.fa-chevron-right,[data-toggle]),button[href],input[href]',
        elementWorkWith,
        self,
        myTimeout,
        eventsAdded = false,
        mergedElements;

    return {
        activate: function () {
            self = this;

            self.subscribe();

            if (!eventsAdded) {
                eventAdded = true;
                eventListener.addListener('tooltipEvents', self.subscribe);
                eventListener.addListener('tooltipEventsOff', self.offEvents);
            }
        },

        subscribe: function () {
            jQuery.expr[':'].parents = function (a, i, m) {
                return jQuery(a).parents(m[3]).length < 1;
            };

            var icons = $('.demo').find(iconsSelector).filter(':parents(.btnForIFrameSrcChage)');
            mergedElements = $.merge(icons, $('.demo').find(linksEditableSelector));
            $(mergedElements).off('mousemove').on('mousemove', self.showTooltip).off('mouseleave').on('mouseleave', self.removeTooltip);
            $('.demo').find('.drag, .remove-block, .img-block, .m__move_arrow').find('[class*="fa-"]').off('mousemove').off('mouseleave');
            $('#buttonsTooltip').off('mousenter').on('mouseenter', function () { clearTimeout(myTimeout); }).off('mouseleave').on('mouseleave', self.removeTooltip);
            $('#showModalForLink,#changeIcon').off('click').on('click', self.openModal);
        },

        showTooltip: function (event) {
            elementWorkWith = $(this);
			
            var leftOffset = event.clientX;
            var topOffset = 40;

            if (typeof myTimeout !== 'undefined') {
                clearTimeout(myTimeout);
                $(mergedElements).removeClass('my-outer-shadow');
            }
            $(elementWorkWith).addClass('my-outer-shadow');

            var offset = $(elementWorkWith).offset();

            $('#changeIcon').show();
            $('#showModalForLink').show();

			var tag = elementWorkWith[0].tagName;
            if (tag == 'A' || tag == 'BUTTON' || tag == 'INPUT') {
                if ($(elementWorkWith).parent().parent().hasClass('dropdown-menu')) {
                    leftOffset = offset.left - $(elementWorkWith).width() / 2;
                    topOffset = 0;
                }

                if ($(elementWorkWith).children('[class*="fa-"], [class*="glyphicon-"], [class*="mdi-"]').length == 0) {
                    $('#changeIcon').hide();
                }

                $('#tooltipHrefBlock').text('href="' + $(elementWorkWith).attr('href') + '"');
                $('#tooltipHrefBlock').css({
                    'top': offset.top + $(elementWorkWith).outerHeight() + 25 + ((topOffset == 0) ? 8 : 0),
                    'left': leftOffset
                }).show();
            }
            else {
                $('#showModalForLink').hide();
                $('#tooltipHrefBlock').hide();
            }

            $('#buttonsTooltip').css({
                'top': offset.top + topOffset,
                'left': leftOffset
            }).show();

        },
        removeTooltip: function () {
            clearTimeout(myTimeout);
            myTimeout = setTimeout(function () {
                $('#buttonsTooltip').hide();
                $('#tooltipHrefBlock').hide();
                $(mergedElements).removeClass('my-outer-shadow');
            }, 1500);
        },
        openModal: function (e) {
            $('#buttonsTooltip').hide();
            $('#tooltipHrefBlock').hide();
            if ($(this).attr('id') == 'changeIcon') {
                changeIcon.iconsChooserEnter(elementWorkWith[0].tagName == 'A' ? $(elementWorkWith).children('[class*="fa-"], [class*="glyphicon-"], [class*="mdi-"]') : elementWorkWith);
            }
            else {
                linksEdit.show(elementWorkWith);
            }
        },
        offEvents: function () {
            $(mergedElements).off('mousemove').off('mouseleave');
            $('#buttonsTooltip').hide();
            $('#tooltipHrefBlock').hide();
        }
    };
});