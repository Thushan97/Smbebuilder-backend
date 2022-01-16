define(['modes/detailsMode/elementStylesHelper', 'services/eventListener'], function (elementStylesHelper, eventListener) {

    var styles,
        elementToChange,
        valueType;

    var self = {
        activate: function (element) {
            elementToChange = element;
            self.recreateElements();
        },
        setupControls: function () {
            self.toggleButtonsBehavior();
            $(".details-mode-border-radius-toggle-button:contains('px')").removeClass('active').removeClass('btn-success').addClass('btn-default');
            $(".details-mode-border-radius-toggle-button:contains('%')").addClass('active').addClass('btn-success').removeClass('btn-default');
            valueType = '%';
            self.createSlider(50);
            self.selectedBorderRadiusButtons();


            $("#showBorderRadius form").submit(function () {
                return false;
            });

          

            $('#showBorderRadius-value').off('keypress').on('keypress', function (e) {

                if (e.which == 13) {
                    return true;
                }

                var inputElement = $("#showBorderRadius-value")[0];


                if (e.which >= 48 && e.which <= 57) {

                    if (inputElement.selectionStart !== inputElement.selectionEnd) {
                        return true;
                    }
                    var value = $(inputElement).val();
                    var currentButton = $('.details-mode-border-radius-toggle-button.active').text();
                    if (currentButton == '%') {
                        if (value.length > 1) {
                            return false;
                        }
                    }
                    else {
                        if (value.length > 2) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;

            });

            $('#showBorderRadius-value').off('change').on('change', function (event) {
                var value = $(event.currentTarget).val();

                var currentButton = $('.details-mode-border-radius-toggle-button.active').text();

                if (currentButton == '%') {
                    if (value > 50) {
                        value = 50;
                    }
                    else if (value < 0) {
                        value = 0;
                    }
                }
                else {
                    if (value > 200) {
                        value = 200;
                    }
                    else if (value < 0) {
                        value = 0;
                    }
                }
                $('#showBorderRadius-slider').slider("option", "value", value);
                self.changeRadius(value);
            });
        },
        fill: function () {
            styles = elementStylesHelper.getStylesForBorderRadius(elementToChange);
            $('button[name=borderTopLeftRadius]').text(styles.borderTopLeftRadius);
            $('button[name=borderTopRightRadius]').text(styles.borderTopRightRadius);
            $('button[name=borderBottomRightRadius]').text(styles.borderBottomRightRadius);
            $('button[name=borderBottomLeftRadius]').text(styles.borderBottomLeftRadius);
        },
        toggleButtonsBehavior: function () {
            $('.details-mode-border-radius-toggle-button').off('click').on('click', function () {
                $('.details-mode-border-radius-toggle-button.btn-success').removeClass('active').removeClass('btn-success').addClass('btn-default');
                $(this).addClass('active').addClass('btn-success').removeClass('btn-default');
                $('#showBorderRadius-slider').slider('destroy');
                if ($(this).text() == 'px') {
                    valueType = 'px';
                    self.createSlider(200);
                }
                else {
                    valueType = '%';
                    self.createSlider(50);
                }
                $('#showBorderRadius-value').val(0);
            });
        },
        selectedBorderRadiusButtons: function () {
            $('#selected-border-radius button').off('click').on('click', function () {
                $(this).hasClass('pressed') ? $(this).removeClass('pressed') : $(this).addClass('pressed');
            });
        },
        createSlider: function (max) {
            $('#showBorderRadius-slider').slider({
                max: max,
                animate: true,
                slide: function (event, ui) {
                    self.changeRadius(ui.value);
                },
                change: function () {
                    // Save to Local storage
                    eventListener.emmitEvent('saveStylesModeState');
                }
            });
        },
        reset: function (element) {
            var stylesAttr = $(element).attr('style');
            if (typeof stylesAttr !== 'undefined') {
                stylesAttr = stylesAttr.replace(/border-top-left-radius:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-top-right-radius:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-bottom-right-radius:\s?\w*%?;/, '');
                stylesAttr = stylesAttr.replace(/border-bottom-left-radius:\s?\w*%?;/, '');
            }
            $(element).attr('style', stylesAttr);
            self.recreateElements();
        },
        recreateElements: function () {
            $('#selected-border-radius button.pressed').removeClass('pressed');
            $('#showBorderRadius-value').val(0);
            $('#showBorderRadius-slider').slider().slider('destroy');
            self.setupControls();
            self.fill();
        },
        changeRadius: function (value) {
            $('#showBorderRadius-value').val(value);
            $('#selected-border-radius button:not(.pressed)').each(function () {
                $(elementToChange).css($(this).attr('name'), value + valueType);
            });
            self.fill();
        }
    };
    return self;
});