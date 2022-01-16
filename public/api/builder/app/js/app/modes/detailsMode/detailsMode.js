define(['elementsBehaviorHelper'],
function (elementsBehaviorHelper) {

    var self = {
        activate: function (element) {
            self.addHandlers2Elements();
        },
        addHandlers2Elements: function () {
            elementsBehaviorHelper.getElementsForEdit($('.demo').find('.box-layer'), 'detailsmode').off('click').on('click', elementsCssManipulation.start);
            $('span.drag i, button.settings-block i, button.remove-block i', $('.demo').find('.box-layer')).off('click').removeClass('tie-to-modal');
            $($('.demo').find('.box-layer')).prepend('<button class="settings-block  btn btn-primary btn-sm"><i class="fa fa-cogs"></i></button>');
            $($('.demo').find('.box-layer')).find('.settings-block').off('click').on('click', elementsCssManipulation.start);
            $('.demo').find('.tie-to-modal').off('mouseenter').on('mouseenter', function (event) {
                if (this.nodeName == 'IMG') {
                    $(this).addClass('my-outer-shadow');
                }
                else {
                    var calculatedWidth = 0;
                    var parentWidth = $(this).outerWidth();

                    $(event.currentTarget).children().each(function (item) {
                        calculatedWidth += $(this).outerWidth();
                    });

                    if (calculatedWidth !== parentWidth) {
                        return true;
                    }

                    $(this).addClass('my-outer-shadow');
                }

            }).off('mouseleave').on('mouseleave', function (event) {
                $(this).removeClass('my-outer-shadow');
            });
        },
        unbind: function () {
            $('#details-mode-window').hide();
            $('.demo').find('.box-layer').find('.settings-block').remove();
        }
    };

    return self
});