define(['modes/detailsMode/elementStylesHelper', 'elementsBehaviorHelper', 'services/eventListener'], function (elementStylesHelper, elementsBehaviorHelper, eventListener) {

    var styles,
        elementToChange,
        startInterval;

    var self = {
        activate: function (element) {
            elementToChange = element;

            if (typeof startInterval !== 'undefined') {
                clearInterval(startInterval);
            }

            self.recreateElements();
            self.checkGradientVisibility();
        },
        checkGradientVisibility: function () {
            var opened = false;
            startInterval = setInterval(function () {

                if ($('#gradx_slider_info:visible').length > 0) {
                    opened = true;
                }
                else if (opened) {
                    opened = false;
                    // Save to Local storage
                    eventListener.emmitEvent('saveStylesModeState');
                }

            }, 1000);
        },
        setupControls: function () {
            styles = elementStylesHelper.getColorStyles(elementToChange);

            $('#details-mode-window-backgound-opacity-input').val(styles.opacity * 100);
            $('#details-mode-window-backgound-opacity').slider({
                max: 100,
                value: styles.opacity * 100,
                animate: true,
                slide: function (event, ui) {
                    self.changeOpacity(ui.value);
                },
                change: function () {
                    // Save to Local storage
                    eventListener.emmitEvent('saveStylesModeState');
                }
            });

            $('#details-mode-window-backgound-opacity-input').off('keypress').on('keypress', function (e) {
                if (e.which == 13) {
                    return true;
                }

                var inputElement = $("#details-mode-window-backgound-opacity-input")[0];

                if (e.which >= 48 && e.which <= 57) {
                    if (inputElement.selectionStart !== inputElement.selectionEnd) {
                        return true;
                    }

                    var value = $(inputElement).val();

                    if (value.lenght > 2) {
                        return false;
                    }
                    return true;
                }

                return false;
            });

            $('#details-mode-window-backgound-opacity-input').off('change').on('change', function () {
                var inputElement = $("#details-mode-window-backgound-opacity-input")[0];

                var value = $(inputElement).val();

                if (value > 100) {
                    value == 100;
                }
                else if (value < 0) {
                    value = 0;
                }

                $('#details-mode-window-backgound-opacity').slider("option", "value", value);
                self.changeOpacity(value);
            });
        },
        fill: function () {
            $('#details-mode-window-color-background').colorpicker({
                format: 'rgb',
                color: styles.bgColor,
				container: true,
				inline: true
            });
            $('#details-mode-window-color-foreground').colorpicker({
                format: 'rgb',
                color: styles.foreColor,
				container: true,
				inline: true
            });
			$('#bl-color-picker .dropdown-menu>*').on( 'click', function (event) {
					event.preventDefault(event);
					event.stopPropagation()
				});
				
			$('.colorpicker.colorpicker-visible').on('click').off('click', function(event){
					$('#bl-color-picker').toggleClass('open')
				});
        },
        backgroundChanged: function () {
            $('#details-mode-window-color-background').colorpicker().off('changeColor').on('changeColor', function (ev) {
                if ($(elementToChange).find('.jumbotron').length > 0 && elementsBehaviorHelper.jumbatronIsEqualltoSection(elementToChange, $(elementToChange).find('.jumbotron')[0])) {
                    $(elementToChange).find('.jumbotron').css('background', ev.color.toHex());
                }
                else {
                    $(elementToChange).css('background', ev.color.toHex());
					if($(elementToChange).is(('button, .btn'))){
						$(elementToChange).removeClass( 'btn-outline btn-danger btn-info btn-primary btn-warning btn-success btn-black btn-white' );
					}
                }
            });

            $('#details-mode-window-color-background').colorpicker().off('mousedown.colorpicker').on('mousedown.colorpicker', function (ev) {
			
                if ($(".colorpicker.dropdown-menu.colorpicker-visible").length > 0) {
                    // Save to Local storage
                    eventListener.emmitEvent('saveStylesModeState');
					$('#bl-color-picker.dropdown').addClass('open')
                }
            });
			$(function() {
    
					$('.demo> img').mousemove(function(e) {
						
						if(!this.canvas) {
							this.canvas = $('<canvas />')[0];
							this.canvas.width = this.width;
							this.canvas.height = this.height;
							this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
						}
						
						var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
						
						console.log('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);
						
						
					});
					
					
					
				});
		
        },
        foregroundChanged: function () {
		
            var elementColorToChange = self.getLinksFromListOrReturnRegularElement(elementToChange);
            $('#details-mode-window-color-foreground').colorpicker().off('changeColor').on('changeColor', function (ev) {
			
                $(elementColorToChange).css('color', ev.color.toHex());
				$('#bl-color-picker.dropdown').addClass('open')
            });	

            $('#details-mode-window-color-foreground').colorpicker().off('mousedown.colorpicker').on('mousedown.colorpicker', function (ev) {
                if ($(".colorpicker.dropdown-menu.colorpicker-visible").length > 0) {
                    // Save to Local storage
                    eventListener.emmitEvent('saveStylesModeState');
					$('#bl-color-picker.dropdown').addClass('open')
                }
            });
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
        reset: function (element) {
            var stylesAttr = $(element).attr('style');
            if (typeof stylesAttr !== 'undefined') {
                stylesAttr = stylesAttr.replace(/color:\s?.*;/g, '');
                stylesAttr = stylesAttr.replace(/background:\s?.*;/g, '');
                stylesAttr = stylesAttr.replace(/opacity:\s?.*;/g, '');
            }
            $(element).attr('style', stylesAttr);
            self.recreateElements();
        },
        recreateElements: function () {
            $('#details-mode-window-color-background').colorpicker().colorpicker('destroy');
            $('#details-mode-window-color-foreground').colorpicker().colorpicker('destroy');
            $('#details-mode-window-backgound-opacity').slider().slider('destroy');
            self.setupControls();
            self.fill();
            self.backgroundChanged();
            self.foregroundChanged();
        },
        changeOpacity: function (value) {
            $('#details-mode-window-backgound-opacity-input').val(value)

            $(elementToChange).css({
                opacity: value / 100
            });
        }
    };

    return self;
});