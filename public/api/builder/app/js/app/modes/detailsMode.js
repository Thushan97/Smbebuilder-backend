define(['elementsBehaviorHelper', 'elementsCssManipulation', 'bootstrapColorpicker', 'colorpickerColor' ], 
	function (elementsBehaviorHelper, elementsCssManipulation) {

    var self,
        elementWorkWith;

    return {
        activate: function (element) {
            self = this;
            elementWorkWith = typeof element === "undefined" ? $('.demo').find('.box-layer') : element;
            self.addHandlers2Elements();
        },
        addHandlers2Elements: function () {
            elementsBehaviorHelper.getElementsForEdit(elementWorkWith, 'detailsmode').off('click').on('click', elementsCssManipulation.start);
			$('span.drag i, button.settings-block i,  button.settings-block, button.remove-block i', elementWorkWith).off('click').removeClass('tie-to-modal');
            $(elementWorkWith).prepend('<button class="settings-block  btn btn-primary btn-sm"><i class="fa fa-cogs"></i></button>');
            $(elementWorkWith).prepend('<div class="btn-group"><button class="dropdown  btn btn-primary btn-sm"><i class="fa fa-cogs"></i></button>');
            $(elementWorkWith).find('.settings-block').off('click').on('click', elementsCssManipulation.start);
            $('.demo').find('.tie-to-modal').off('mouseenter').on('mouseenter', function (event) {

                if (this.nodeName == 'IMG') {
                    $(this).addClass('my-outer-shadow');
                } else {
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
        }
    };
});