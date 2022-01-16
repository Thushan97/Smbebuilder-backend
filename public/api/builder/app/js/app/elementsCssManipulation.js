define(['elementsBehaviorHelper', 'services/localStorageService'], function (elementsBehaviorHelper, localStorageService) {

    var elementToChange,
        oldValues = [],
        modalWindow,
        revertingChanges = false;

    var self = {

        start: function (event) {
            modalWindow = $('#modal-container-453162');
            event.stopPropagation();
            event.preventDefault();

            elementToChange = $(this).hasClass('settings-block') ? $(this).parent() : this;
            oldValues = [];

            self.setInputControlsValues(true, false);
            self.bindEvents();
            $('#modal-container-453162').modal('show');
        },
        setInputControlsValues: function (rememberOldValues, getValues) {

            // Find All regular inputs
            $(modalWindow).find('.layout-control').each(function () {
                var attribute = self.getAttributeToChange(this);
                var value = parseInt($(elementToChange).css(attribute));
                $(this).val(value);

                if (rememberOldValues) {
                    //remember old values
                    oldValues.push({
                        attr: attribute,
                        val: value
                    });
                }

            });

            // set color picker for background color input

            if (getValues) {
                revertingChanges = true;
                $(modalWindow).find('.demo2').colorpicker('setValue', self.getBgColor());
            }
            else {
                $(modalWindow).find('.demo2').colorpicker({
                    format: 'rgb',
                    color: self.getBgColor()
                });
            }
				
            if (rememberOldValues) {
                //remember old values
                oldValues.push({
                    attr: 'backgroundColor',
                    val: self.getBgColor()
                });
            }

            // set color picker for foreground color input
            if (getValues) {
                revertingChanges = true;
                $(modalWindow).find('.demo3').colorpicker('setValue', $(self.getLinksFromListOrReturnRegularElement()).css('color'));
            }
            else {
                $(modalWindow).find('.demo3').colorpicker({
                    format: 'rgb',
                    color: $(self.getLinksFromListOrReturnRegularElement()).css('color')
                });
            }

            if (rememberOldValues) {
                //remember old values
                oldValues.push({
                    attr: 'color',
                    val: $(self.getLinksFromListOrReturnRegularElement()).css('color')
                });
            }
        },
        getBgColor: function () {
            var bgColor = $(elementToChange).css('backgroundColor');
            if ($(elementToChange).find('.jumbotron').length > 0 && elementsBehaviorHelper.jumbatronIsEqualltoSection(elementToChange, $(elementToChange).find('.jumbotron')[0])) {
                bgColor = $(elementToChange).find('.jumbotron').css('backgroundColor');
            }
            return bgColor;
        },
        getLinksFromListOrReturnRegularElement: function () {
            if ($(elementToChange).get(0).tagName == 'UL') {
                var aElements = $(elementToChange).find('li>a');
                if (aElements.length > 0) {
                    return aElements;
                }
            }
            return elementToChange;
        },
        bindEvents: function () {

            // Binding regular input values changing to element attributes
            $(modalWindow).find('.layout-control').off('change').on('change', function () {
                var attr = self.getAttributeToChange(this);
                $(elementToChange).css(attr, $(this).val() + 'px');
            });

            // Binding background color input change to element bgColor
            $(modalWindow).find('.demo2').colorpicker().on('changeColor', function (ev) {
                if (!revertingChanges) {
                    if ($(elementToChange).find('.jumbotron').length > 0 && elementsBehaviorHelper.jumbatronIsEqualltoSection(elementToChange, $(elementToChange).find('.jumbotron')[0])) {
                        $(elementToChange).find('.jumbotron').css('backgroundColor', ev.color.toHex());
                    }
                    else {
                        $(elementToChange).css('backgroundColor', ev.color.toHex());
                    }
                }
                revertingChanges = false;
            });

            // Recognize where to change forecolor
            var elementColorToChange = self.getLinksFromListOrReturnRegularElement();

            // Binding forecolor change input to elements forecolor
            $(modalWindow).find('.demo3').colorpicker().on('changeColor', function (ev) {
                if (!revertingChanges) {
                    $(elementColorToChange).css('color', ev.color.toHex());
                }
                revertingChanges = false;
            });

            // reset or revert changes binding
            $(modalWindow).find('button:not(.close-this)').off('click').on('click', function (event) {
                if (event.currentTarget.textContent == 'Reset') {
                    self.resetChanges();
                } else {
                    self.revertChanges(elementToChange);
                }
                self.setInputControlsValues();
            });

            // On close nead to unbind events end destroy color pickers
            $(modalWindow).find('.close-this').off('click').bind('click', function (e) {
                self.unbindEvents();
                $(modalWindow).find('.demo2, .demo3').colorpicker('destroy');
                localStorageService.save();
            });
        },
        getAttributeToChange: function (input) {
            return input.id.substr(0, input.id.indexOf('New'))
        },
        revertChanges: function () {
            for (var i = 0; i < oldValues.length; i++) {
                $(elementToChange).css(oldValues[i].attr, oldValues[i].val);
                $(modalWindow).find('#New' + oldValues[i].attr).val(oldValues[i].val);

                if (oldValues[i].attr == 'backgroundColor') {
                    revertingChanges = true;
                    $(modalWindow).find('.demo2').colorpicker('setValue', oldValues[i].val);
                    if ($(elementToChange).find('.jumbotron').length > 0 && elementsBehaviorHelper.jumbatronIsEqualltoSection(elementToChange, $(elementToChange).find('.jumbotron')[0])) {
                        $(elementToChange).find('.jumbotron').css('backgroundColor', oldValues[i].val);
                    }
                }
                else if (oldValues[i].attr == 'color') {
                    $(self.getLinksFromListOrReturnRegularElement()).css('color', oldValues[i].val);
                    revertingChanges = true;
                    $(modalWindow).find('.demo3').colorpicker('setValue', oldValues[i].val);
                }
            }
        },
        resetChanges: function () {

            if ($(elementToChange).find('.jumbotron').length > 0 && elementsBehaviorHelper.jumbatronIsEqualltoSection(elementToChange, $(elementToChange).find('.jumbotron')[0])) {
                $(elementToChange).find('.jumbotron').attr('style', '');
            }
            else {
                $(elementToChange).attr('style', '');
            }

            $(elementToChange).find('.tie-to-modal').attr('style', '');
            $(elementToChange).find('li a, span').attr('style', '');
            self.setInputControlsValues(false, true);
        },
        unbindEvents: function () {
            $(modalWindow).find('.layout-control').off('change');
            $('.demo2, .demo3').off('changeColor');
            $(modalWindow).find('.close-this').off('click');
        },
    };

    return self;
});