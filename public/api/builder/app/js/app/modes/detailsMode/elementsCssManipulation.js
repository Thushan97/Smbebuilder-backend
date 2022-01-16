define(['elementsBehaviorHelper', 'services/localStorageService', 'modes/detailsMode/elementStylesHelper', 'modes/detailsMode/Tabs/borderRadiusTab', 'modes/detailsMode/Tabs/boxModelTab', 'modes/detailsMode/Tabs/backgroundTab', 'modes/detailsMode/Tabs/colorTab', 'services/eventListener', 'bootstrapColorpicker', 'colorpickerColor'],
    function(elementsBehaviorHelper, localStorageService, elementStylesHelper, borderRadiusTab, backgroundImageTab, boxModelTab, colorTab, eventListener) {

        var elementToChange,
            oldValues = [],
            settingsWindow,
            revertingChanges = false,
            allStyles,
            windowOpening = false;

        var self = {

            start: function(event) {


                event.stopPropagation();
                event.preventDefault();


                if ($('#details-mode-window').css('display') == 'block') {
                    localStorageService.save();
                }

                windowOpening = true;

                $('.demo').find('.mode-elements-column-hover').removeClass('mode-elements-column-hover');

                localStorageService.removeForStylesMode();
                settingsWindow = $('#details-mode-window');
                self.recreate(this);
            },

            recreate: function(element) {



                if ($(element).hasClass('settings-block')) {
                    elementToChange = $(element).parent();
                } else {
                    elementToChange = $(element);
                }
                $(elementToChange).addClass('mode-elements-column-hover');
                /*$(elementToChange).off('click').on('click', function(event){
                	event.preventDefault();
                	 event.stopPropagation();
                	 console.log($(elementToChange) + 'click')
                });
                */

                self.prepareSettingsWindow();
                if (windowOpening) {
                    windowOpening = false;
                    /*settingsWindow.css({
                        //top: (window.pageYOffset || document.documentElement.scrollTop) + 34,
                        //left: 160
						bottom: 30,
						top: 'auto',
						left: 40
                    });*/
                    self.saveToLocalStorage();
                }
                settingsWindow.show();
                settingsWindow.css({
                    //top: (window.pageYOffset || document.documentElement.scrollTop) + 34,
                    //left: 160
                    bottom: 0,
                    top: 'auto',
                    right: 49
                });

            },

            prepareSettingsWindow: function() {
                allStyles = elementStylesHelper.getAllStyles(elementToChange);

                boxModelTab.activate(elementToChange);
                /* borderRadiusTab.activate(elementToChange);*/
                colorTab.activate(elementToChange);
                backgroundImageTab.activate(elementToChange);

                self.setupSettingWindowBehavior();
            },
            setupSettingWindowBehavior: function(element) {
                /*$('#details-mode-window').draggable({
                    handle: '#details-mode-window-header'
                });*/

                var panelEls = $(document).find('.btn-customizer .dropup, .element-customizer .dropup, .section-customizer .dropup, .navbar-customizer .dropup, .well-customizer .dropup');
                panelEls.removeClass('open').find('.dropdown-toggle').attr('aria-expanded', 'false');
                /*if( $(elementToChange).is($(elementToChange).children()) ){
                		var element = $(this).parent();
                	}
                	else{
                		var element = $(elementToChange);
                	}*/

                var element = $(elementToChange);
                var offsetEl = $(element).offset();
                var elWidth = $(element).outerWidth();
                //console.log(element);

                var left = offsetEl.left;
                var windowEl = left + elWidth;

                // START HERE



                if ($(element).is('nav.navbar')) {

                    $('.navbar-customizer').removeClass('hide');

                    //check if btn has no primary class
                    /*if ($(element).hasClass('well')){
                    	console.log('element well');
                    	$('.section-customizer').removeClass('hide');
                    }
                    else {
                    	$(element).addClass('well');
                    	$('.section-customizer').removeClass('hide');
                    	console.log('element well not defined in this el');
                    }*/
                    $('.navbar-customizer .color-tool > li').off('click').on('click', function() {
                        //classes = currentElement.classList;
                        //var classes = $('.demo').find('btn-edit-material').attr('class');
                        el = $(element);
                        classes = $(el).attr('class');
                        el.css('background', '');
                        el.css('background-color', '');
                        var urlClass = $(this).attr('data-class');
                        var regex = new RegExp(/^navbar\-material\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        $(el).removeClass(makeRemoveClassHandler(/^navbar-material/));
                        if (urlClass) {
                            $(el).addClass('navbar' + urlClass);
                        } else {
                            $(el).addClass('navbar-material-white');
                            $(el).css('color', '#2b2b2b');
                        }
                        (function($) {
                            $.fn.contrastingText = function() {
                                var el = this,
                                    transparent;
                                transparent = function(c) {
                                    var m = c.match(/[0-9]+/g);
                                    if (m !== null) {
                                        return !!m[7];
                                    } else return false;
                                };
                                while (transparent(el.css('background-color'))) {
                                    el = el.parent();
                                }
                                parts = el.css('background-color').match(/[0-9]+/g);
                                this.lightBackground = !!Math.round(
                                    (
                                        parseInt(parts[0], 10) + // red
                                        parseInt(parts[1], 10) + // green
                                        parseInt(parts[2], 10) // blue
                                    ) / 765 // 255 * 3, so that we avg, then normalise to 1
                                );
                                if (this.lightBackground) {
                                    this.css('color', 'black');
                                } else {
                                    this.css('color', 'white');
                                }
                                return this;
                            };
                        }(jQuery));
                        $(el).on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        $(el).contrastingText();



                    });

                    el = $(element);

                    var urlClass = $(this).attr('data-class');
                    var regex = new RegExp(/^navbar\-material\-(.+)/);

                    function makeRemoveClassHandler(regex) {
                        return function(index, classes) {
                            return classes.split(/\s+/).filter(function(el) {
                                return regex.test(el);
                            }).join(' ');
                        }
                    }



                    var rgb = $(el).css('backgroundColor');
                    var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    var brightness = 5;

                    var r = colors[1];
                    var g = colors[2];
                    var b = colors[3];

                    var ir = Math.floor((255 - r) * brightness);
                    var ig = Math.floor((255 - g) * brightness);
                    var ib = Math.floor((255 - b) * brightness);

                    //$(el).css('color', 'rgb('+ir+','+ig+','+ib+')');
                    (function($) {
                        $.fn.contrastingText = function() {
                            var el = this,
                                transparent;
                            transparent = function(c) {
                                var m = c.match(/[0-9]+/g);
                                if (m !== null) {
                                    return !!m[7];
                                } else return false;
                            };
                            while (transparent(el.css('background-color'))) {
                                el = el.parent();
                            }
                            parts = el.css('background-color').match(/[0-9]+/g);
                            this.lightBackground = !!Math.round(
                                (
                                    parseInt(parts[0], 10) + // red
                                    parseInt(parts[1], 10) + // green
                                    parseInt(parts[2], 10) // blue
                                ) / 765 // 255 * 3, so that we avg, then normalise to 1
                            );
                            if (this.lightBackground) {
                                this.css('color', 'black');
                            } else {
                                this.css('color', 'white');
                            }
                            return this;
                        };
                    }(jQuery));
                    //document.addEventListener("transitionend", self.contrastingTexts, false);


                    $('#details-mode-window-color-background .colorpicker').on('mousedown', function() {
                        $(el).removeClass(makeRemoveClassHandler(/^navbar-material/));
                        $(el).off("transitionend").on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        console.log('colorpicker')
                    }).on('mouseup', function() {
                        $(el).off("transitionend").on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        $(el).contrastingText();
                    })

                    var navReset = $('#navbar-reset-button');
                    $(navReset).off('click').on('click', function() {
                        $(el).removeClass('navbar');
                        $(el).removeClass('navbarundefined');
                        $(el).removeClass(makeRemoveClassHandler(/^navbar-material/));
                        $(el).css('background-color', '');
                        $(el).css('color', '');

                        $(el).addClass('navbar navbar-material-white');

                    });

                    var fixedTopBtn = $('#fixed-nav-control-wrapper #navbar-fix');
                    var staticTopBtn = $('#fixed-nav-control-wrapper #navbar-stat');

                    $(fixedTopBtn).off('click').on('click', function() {
                        var headerNav = $(el).parent();
                        if (headerNav.is('header')) {
                            headerNav.removeClass('navbar-fixed-top');
                            headerNav.addClass('navbar-fixed-top');
                            $('body').removeClass('is-navbar-fixed-top');
                            $('body').addClass('is-navbar-fixed-top');
                            localStorageService.save();
                        }
                    });

                    $(staticTopBtn).off('click').on('click', function() {
                        var headerNav = $(el).parent();
                        if (headerNav.is('header')) {

                            headerNav.removeClass('navbar-fixed-top');
                            $('body').removeClass('is-navbar-fixed-top');
                            localStorageService.save();
                        }

                    });




                    // fixed top function

                    var $alignNavButtons = $(document).find('#leftNavBtn, #rightNavBtn');
                    var navUl = $(element).find('ul.nav.navbar-nav');
                    if ($(navUl).length < 2) {
                        $alignNavButtons.removeClass('hide');
                        $alignNavButtons.off('click').on('click', function(event) {
                            $(navUl).removeClass('navbar-right');
                            $(navUl).addClass($(this).attr('data-class'));

                        });
                    } else {
                        $alignNavButtons.addClass('hide');

                    }




                    $('#navbarPropsCancel').off('click').on('click', function() {

                        $('#navbar-customizer').addClass('hide');
                        settingsWindow.css({
                            bottom: '-200px',
                            right: '49px'
                        })

                    });

                } else {
                    $('.navbar-customizer').addClass('hide');
                    settingsWindow.css({
                        bottom: '-200px',
                        right: '49px'
                    })
                }
                if ($(element).is('p, h1, h2, h3, h4, h5, address, li, li a:not(.navbar li a), cite, blockquote')) {
                    var $elStylePanel = $(document).find('.element-customizer');
                    $('.element-customizer').removeClass('hide');
                    var $currentElement = $(element);
                    var $alignButtons = $(document).find('#leftTextBtntxt, #centerTextBtntxt, #rightTextBtntxt');
                    //var $leadBtn = $( document ).find( '#leadBtn' );
                    var $sizeButtons = $(document).find('#sizeBtn3xl, #sizeBtn2xl, #sizeBtnXl, #sizeBtnLg , #sizeBtnMd , #sizeBtnSm');
                    var $textButtons = $(document).find('#textXl, #textLg , #textMd , #textSm');
                    var $textSizePanel = $(document).find('#__w-text-sizes');
                    var $titleSizePanel = $(document).find('#__w-titles-sizes');
                    var $closePanelButton = $(document).find('#textPropsCancelEl');

                    var $display = $(document).find('#chosen');
                    var $display2 = $(document).find('#chosen2');
                    var $marginSlider = $(document).find('#__w-margin-slide');
                    var $marginSliderBottom = $(document).find('#__w-margin-slide-bottom');

                    var topMarg = $currentElement.css('marginTop').replace(/[^-\d\.]/g, '');
                    $marginSlider.val(0);
                    $marginSlider.val(topMarg);



                    $marginSlider.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            marginTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^margin\-top\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^margin-top-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('margin-top-' + newClass);

                    });
                    var bottomMarg = $currentElement.css('marginBottom').replace(/[^-\d\.]/g, '');
                    $marginSliderBottom.val(0);
                    $marginSliderBottom.val(bottomMarg);

                    $marginSliderBottom.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            marginTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^margin\-bottom\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^margin-bottom-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('margin-bottom-' + newClass);

                    });


                    function closeElStylePanel() {
                        $elStylePanel.addClass('hide');
                        $elStylePanel.find('.dropup').removeClass('open');
                        settingsWindow.css({
                            bottom: '-200px',
                            right: '49px'
                        })
                    }

                    $alignButtons.off('click').on('click', function() {
                        $currentElement.removeClass('text-align-left text-align-center text-align-right');
                        $currentElement.addClass($(this).attr('data-class'));
                    });

                    $sizeButtons.off('click').on('click', function() {
                        $currentElement.removeClass('headline-3xl headline-2xl headline-xl headline-lg headline-md headline-sm');
                        $currentElement.addClass($(this).attr('data-class'));

                    });
                    $textButtons.off('click').on('click', function() {
                        $currentElement.removeClass('text-xl text-lg text-md text-sm');
                        $currentElement.addClass($(this).attr('data-class'));

                    });

                    $sizeHC = $(document).find('#__w-title-sizes');
                    $sizeTC = $(document).find('#__w-text-sizes');
                    if ($(element).is('h1, h2, h3, h4, h5, h6')) {
                        $titleSizePanel.css('display', 'block');

                    } else {
                        $titleSizePanel.css('display', 'none');
                    }


                    if ($(element).is('p') || $(element).is('address') || $(element).is('blockquote') || $(element).is('cite') || $(element).is('ul li')) {
                        $textSizePanel.css('display', 'block');

                    } else {

                        $textSizePanel.css('display', 'none');


                    }

                    function closeElStylePanel() {
                        $elStylePanel.addClass('hide');
                        $elStylePanel.find('.dropup').removeClass('open');
                    }
                    $('#textPropsCancelEl').off('click').on('click', function() {
                        closeElStylePanel();
                    });


                } else {
                    $('.element-customizer').addClass('hide')
                    settingsWindow.css({
                        bottom: '-200px',
                        right: '49px'
                    })
                }

                //if( $(element).is('section .well')){
                if ($(element).is('.well-hero')) {

                    $('.well-customizer').removeClass('hide');

                    //check if btn has no primary class
                    /*if ($(element).hasClass('well')){
                    	console.log('element well');
                    	$('.section-customizer').removeClass('hide');
                    }
                    else {
                    	$(element).addClass('well');
                    	$('.section-customizer').removeClass('hide');
                    	console.log('element well not defined in this el');
                    }*/
                    $('.well-customizer .color-tool > li').off('click').on('click', function() {
                        //classes = currentElement.classList;
                        //var classes = $('.demo').find('btn-edit-material').attr('class');
                        el = $(element);
                        classes = $(el).attr('class');
                        el.css('background', '');
                        el.css('background-color', '');
                        var urlClass = $(this).attr('data-class');
                        var regex = new RegExp(/^well\-material\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        $(el).removeClass(makeRemoveClassHandler(/^well-material/));
                        $(el).addClass('well' + urlClass);
                        var rgb = $(el).css('backgroundColor');
                        var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                        var brightness = 5;

                        var r = colors[1];
                        var g = colors[2];
                        var b = colors[3];

                        var ir = Math.floor((255 - r) * brightness);
                        var ig = Math.floor((255 - g) * brightness);
                        var ib = Math.floor((255 - b) * brightness);

                        //$(el).css('color', 'rgb('+ir+','+ig+','+ib+')');
                        (function($) {
                            $.fn.contrastingText = function() {
                                var el = this,
                                    transparent;
                                transparent = function(c) {
                                    var m = c.match(/[0-9]+/g);
                                    if (m !== null) {
                                        return !!m[7];
                                    } else return false;
                                };
                                while (transparent(el.css('background-color'))) {
                                    el = el.parent();
                                }
                                parts = el.css('background-color').match(/[0-9]+/g);
                                this.lightBackground = !!Math.round(
                                    (
                                        parseInt(parts[0], 10) + // red
                                        parseInt(parts[1], 10) + // green
                                        parseInt(parts[2], 10) // blue
                                    ) / 765 // 255 * 3, so that we avg, then normalise to 1
                                );
                                if (this.lightBackground) {
                                    this.css('color', 'black');
                                } else {
                                    this.css('color', 'white');
                                }
                                return this;
                            };
                        }(jQuery));
                        //document.addEventListener("transitionend", self.contrastingTexts, false);
                        $(el).on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        $(el).contrastingText();

                        var textEls = $(el).find('i, p, h1, h2, h3, h4, h5, h6, li, blockquote, cite, address');
                        $(textEls).css('color', '');

                    });
                    var el = $(element);
                    var regex = new RegExp(/^well\-material\-(.+)/);

                    function makeRemoveClassHandler(regex) {
                        return function(index, classes) {
                            return classes.split(/\s+/).filter(function(el) {
                                return regex.test(el);
                            }).join(' ');
                        }
                    }

                    var wellReset = $(document).find('.well-customizer .reset-button');
                    $(wellReset).off('click').on('click', function() {
                        $(el).removeClass(makeRemoveClassHandler(/^well-material/));
                        if ($(el).hasClass('well')) {
                            console.log('element navbar');

                        } else {
                            $(el).addClass('well');
                            console.log('element not .well');
                        }
                    });

                    $('#wellPropsCancel').on('click', function() {
                        $('.well-customizer').addClass('hide');
                        settingsWindow.css({
                            bottom: '-200px',
                            right: '49px'
                        })
                    });
                } else {
                    $('.well-customizer').addClass('hide');
                    $('#details-mode-window').css({
                        bottom: '-200px'

                    })

                }
                if ($(element).is('.well')) {
                    //$('#details-mode-window #ui-accordion-accordion-styles-header-0').removeClass('hide');

                    $('#details-mode-window #bl-overlay').removeClass('hide');
                    $('#details-mode-window #bl-bg-image').removeClass('hide');
                    //$('#details-mode-window #bl-parallax').removeClass('hide');
                    $('.section-customizer').removeClass('hide');
                    $('#details-mode-window').css({
                        bottom: '0'
                    })

                    //check if btn has no primary class
                    if ($(element).hasClass('well')) {
                        console.log('element well');
                        $('.section-customizer').removeClass('hide');
                    } else {
                        $(element).addClass('well');
                        $('.section-customizer').removeClass('hide');
                        console.log('element well not defined in this el');
                    }
                    $('.section-customizer .color-tool > li').off('click').on('click', function() {
                        //classes = currentElement.classList;
                        //var classes = $('.demo').find('btn-edit-material').attr('class');
                        el = $(element);
                        classes = $(el).attr('class');
                        el.css('background', '');
                        el.css('background-color', '');
                        el.css('background-image', '');
                        var urlClass = $(this).attr('data-class');
                        var regex = new RegExp(/^well\-material\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }

                        var regexOV = new RegExp(/^ov\-(.+)/);

                        function makeRemoveClassHandlerOV(regexOV) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regexOV.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandlerOV(/^ov-/));

                        var regexBG = new RegExp(/^bg\-(.+)/);

                        function makeRemoveClassHandlerBG(regexBG) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regexBG.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandlerBG(/^bg-/));

                        $(el).removeClass(makeRemoveClassHandler(/^well-material/));
                        $(el).addClass('well' + urlClass);

                        /* try to change text color*/
                        var rgb = $(el).css('backgroundColor');
                        var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                        var brightness = 5;

                        var r = colors[1];
                        var g = colors[2];
                        var b = colors[3];

                        var ir = Math.floor((255 - r) * brightness);
                        var ig = Math.floor((255 - g) * brightness);
                        var ib = Math.floor((255 - b) * brightness);

                        //$(el).css('color', 'rgb('+ir+','+ig+','+ib+')');
                        (function($) {
                            $.fn.contrastingText = function() {
                                var el = this,
                                    transparent;
                                transparent = function(c) {
                                    var m = c.match(/[0-9]+/g);
                                    if (m !== null) {
                                        return !!m[7];
                                    } else return false;
                                };
                                while (transparent(el.css('background-color'))) {
                                    el = el.parent();
                                }
                                parts = el.css('background-color').match(/[0-9]+/g);
                                this.lightBackground = !!Math.round(
                                    (
                                        parseInt(parts[0], 10) + // red
                                        parseInt(parts[1], 10) + // green
                                        parseInt(parts[2], 10) // blue
                                    ) / 765 // 255 * 3, so that we avg, then normalise to 1
                                );
                                if (this.lightBackground) {
                                    this.css('color', 'black');
                                } else {
                                    this.css('color', 'white');
                                }
                                return this;
                            };
                        }(jQuery));
                        //document.addEventListener("transitionend", self.contrastingTexts, false);
                        $(el).on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        $(el).contrastingText();
                        var textEls = $(el).find('i, p, h1, h2, h3, h4, h5, h6, li, blockquote, cite, address');
                        $(textEls).css('color', '');
                        /* try to change text color*/


                    });
                    var regex = new RegExp(/^well\-material\-(.+)/);

                    function makeRemoveClassHandler(regex) {
                        return function(index, classes) {
                            return classes.split(/\s+/).filter(function(el) {
                                return regex.test(el);
                            }).join(' ');
                        }
                    }

                    var el = $(element);
                    var sectionReset = $(document).find('.section-customizer .reset-button');
                    $(sectionReset).off('click').on('click', function() {
                        $(el).removeClass(makeRemoveClassHandler(/^well-material/));
                        if ($(el).hasClass('well')) {
                            console.log('element well');
                            $(el).css('color', '');

                        } else {
                            $(el).addClass('well');
                            console.log('element not .well');
                        }
                    });

                    $currentElement = $(element)
                    var $marginSliderSection = $(document).find('#__w-margin-slide-section');
                    var $marginSliderBottomSection = $(document).find('#__w-margin-slide-bottom-section');

                    var topMargSection = $currentElement.css('paddingTop').replace(/[^-\d\.]/g, '');
                    $marginSliderSection.val(0);
                    $marginSliderSection.val(topMargSection);



                    $marginSliderSection.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            paddingTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^padding\-top\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^padding-top-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('padding-top-' + newClass);

                    });
                    var bottomMargSection = $currentElement.css('paddingBottom').replace(/[^-\d\.]/g, '');
                    $marginSliderBottomSection.val(0);
                    $marginSliderBottomSection.val(bottomMargSection);

                    $marginSliderBottomSection.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            paddingTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^padding\-bottom\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^padding-bottom-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('padding-bottom-' + newClass);

                    });


                    var $alignTextButtons = $(document).find('#leftTextBtn, #rightTextBtn, #centerTextBtn');
                    $alignTextButtons.off('click').on('click', function(event) {
                        $(element).removeClass('text-align-center text-align-right text-align-left');
                        var innerAligned = $(element).find('.text-align-center, .text-align-right, .text-align-left');
                        $(innerAligned).removeClass('text-align-center text-align-right text-align-left').css('text-align', '');
                        $(element).css('text-align', '');
                        $(element).addClass($(this).attr('data-class'));

                    });

                    $('#sectionPropsCancel').on('click', function() {
                        $('.section-customizer').addClass('hide');
                        settingsWindow.css({
                            bottom: '-200px',
                            right: '49px'
                        })
                    });
                } else {
                    $('.section-customizer').addClass('hide');
                    $('#details-mode-window').css({
                        bottom: '-200px',

                    })
                    //$('#details-mode-window #ui-accordion-accordion-styles-header-0').addClass('hide');
                    $('#details-mode-window #bl-overlay').addClass('hide');
                    $('#details-mode-window #bl-bg-image').addClass('hide');
                    $('#details-mode-window #bl-parallax').addClass('hide');
                }

                if ($(element).is('section')) {
                    //$('#details-mode-window #ui-accordion-accordion-styles-header-0').removeClass('hide');

                    $('#details-mode-window #bl-overlay').removeClass('hide');
                    $('#details-mode-window #bl-bg-image').removeClass('hide');
                    //$('#details-mode-window #bl-parallax').removeClass('hide');
                    $('.section-customizer').removeClass('hide');
                    $('#details-mode-window').css({
                        bottom: '0'
                    })

                    //check if btn has no primary class
                    if ($(element).hasClass('well')) {
                        console.log('element well');
                        $('.section-customizer').removeClass('hide');
                    } else {
                        $(element).addClass('well');
                        $('.section-customizer').removeClass('hide');
                        console.log('element well not defined in this el');
                    }
                    $('.section-customizer .color-tool > li').off('click').on('click', function() {
                        //classes = currentElement.classList;
                        //var classes = $('.demo').find('btn-edit-material').attr('class');
                        el = $(element);
                        classes = $(el).attr('class');
                        el.css('background', '');
                        el.css('background-color', '');
                        //el.css('background-image', '');
                        var urlClass = $(this).attr('data-class');
                        var regex = new RegExp(/^well\-material\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }

                        var regexOV = new RegExp(/^ov\-(.+)/);

                        function makeRemoveClassHandlerOV(regexOV) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regexOV.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandlerOV(/^ov-/));

                        var regexBG = new RegExp(/^bg\-(.+)/);

                        function makeRemoveClassHandlerBG(regexBG) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regexBG.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandlerBG(/^bg-/));

                        $(el).removeClass(makeRemoveClassHandler(/^well-material/));
                        $(el).addClass('well' + urlClass);

                        /* try to change text color*/
                        var rgb = $(el).css('backgroundColor');
                        var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                        var brightness = 5;

                        var r = colors[1];
                        var g = colors[2];
                        var b = colors[3];

                        var ir = Math.floor((255 - r) * brightness);
                        var ig = Math.floor((255 - g) * brightness);
                        var ib = Math.floor((255 - b) * brightness);

                        //$(el).css('color', 'rgb('+ir+','+ig+','+ib+')');
                        (function($) {
                            $.fn.contrastingText = function() {
                                var el = this,
                                    transparent;
                                transparent = function(c) {
                                    var m = c.match(/[0-9]+/g);
                                    if (m !== null) {
                                        return !!m[7];
                                    } else return false;
                                };
                                while (transparent(el.css('background-color'))) {
                                    el = el.parent();
                                }
                                parts = el.css('background-color').match(/[0-9]+/g);
                                this.lightBackground = !!Math.round(
                                    (
                                        parseInt(parts[0], 10) + // red
                                        parseInt(parts[1], 10) + // green
                                        parseInt(parts[2], 10) // blue
                                    ) / 765 // 255 * 3, so that we avg, then normalise to 1
                                );
                                if (this.lightBackground) {
                                    this.css('color', 'black');
                                } else {
                                    this.css('color', 'white');
                                }
                                return this;
                            };
                        }(jQuery));
                        //document.addEventListener("transitionend", self.contrastingTexts, false);
                        $(el).on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        $(el).contrastingText();
                        var textEls = $(el).find('i, p, h1, h2, h3, h4, h5, h6, li, blockquote, cite, address');
                        $(textEls).css('color', '');
                        /* try to change text color*/


                    });
                    var regex = new RegExp(/^well\-material\-(.+)/);

                    function makeRemoveClassHandler(regex) {
                        return function(index, classes) {
                            return classes.split(/\s+/).filter(function(el) {
                                return regex.test(el);
                            }).join(' ');
                        }
                    }

                    var regexBG = new RegExp(/^bg\-(.+)/);

                    function makeRemoveClassHandlerBG(regexBG) {
                        return function(index, classes) {
                            return classes.split(/\s+/).filter(function(el) {
                                return regexBG.test(el);
                            }).join(' ');
                        }
                    }
                    //var thisBgGradient = el.hasClass(makeRemoveClassHandlerBG(/^bg\-(.+)/));
                    if (el.hasClass(makeRemoveClassHandlerBG(/^bg\-(.+)/))) {
                        var rgb = $(el).css('backgroundColor');
                        var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                        var brightness = 5;

                        var r = colors[1];
                        var g = colors[2];
                        var b = colors[3];

                        var ir = Math.floor((255 - r) * brightness);
                        var ig = Math.floor((255 - g) * brightness);
                        var ib = Math.floor((255 - b) * brightness);

                        //$(el).css('color', 'rgb('+ir+','+ig+','+ib+')');
                        (function($) {
                            $.fn.contrastingText = function() {
                                var el = this,
                                    transparent;
                                transparent = function(c) {
                                    var m = c.match(/[0-9]+/g);
                                    if (m !== null) {
                                        return !!m[7];
                                    } else return false;
                                };
                                while (transparent(el.css('background-color'))) {
                                    el = el.parent();
                                }
                                parts = el.css('background-color').match(/[0-9]+/g);
                                this.lightBackground = !!Math.round(
                                    (
                                        parseInt(parts[0], 10) + // red
                                        parseInt(parts[1], 10) + // green
                                        parseInt(parts[2], 10) // blue
                                    ) / 765 // 255 * 3, so that we avg, then normalise to 1
                                );
                                if (this.lightBackground) {
                                    this.css('color', 'black');
                                } else {
                                    this.css('color', 'white');
                                }
                                return this;
                            };
                        }(jQuery));

                    } else {}
                    //document.addEventListener("transitionend", self.contrastingTexts, false);


                    $('#details-mode-window-color-background .colorpicker').on('mousedown', function() {
                        $(el).removeClass(makeRemoveClassHandler(/^well-material/));
                        $(el).off("transitionend").on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        console.log('colorpicker')
                    }).on('mouseup', function() {
                        $(el).off("transitionend").on("transitionend", function() {
                            $(el).contrastingText();
                        });
                        $(el).contrastingText();
                    })

                    var sectionReset = $(document).find('.section-customizer .reset-button');
                    $(sectionReset).off('click').on('click', function() {
                        $(el).removeClass(makeRemoveClassHandler(/^well-material/));
                        if ($(el).hasClass('well')) {
                            console.log('element well');
                            $(el).css('color', '');

                        } else {
                            $(el).addClass('well');
                            console.log('element not .well');
                        }
                    });

                    $currentElement = $(element)
                    var $marginSliderSection = $(document).find('#__w-margin-slide-section');
                    var $marginSliderBottomSection = $(document).find('#__w-margin-slide-bottom-section');

                    var topMargSection = $currentElement.css('paddingTop').replace(/[^-\d\.]/g, '');
                    $marginSliderSection.val(0);
                    $marginSliderSection.val(topMargSection);



                    $marginSliderSection.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            paddingTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^padding\-top\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^padding-top-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('padding-top-' + newClass);

                    });
                    var bottomMargSection = $currentElement.css('paddingBottom').replace(/[^-\d\.]/g, '');
                    $marginSliderBottomSection.val(0);
                    $marginSliderBottomSection.val(bottomMargSection);

                    $marginSliderBottomSection.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            paddingTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^padding\-bottom\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^padding-bottom-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('padding-bottom-' + newClass);

                    });


                    var $alignTextButtons = $(document).find('#leftTextBtn, #rightTextBtn, #centerTextBtn');
                    $alignTextButtons.off('click').on('click', function(event) {
                        $(element).removeClass('text-align-center text-align-right text-align-left');
                        var innerAligned = $(element).find('.text-align-center, .text-align-right, .text-align-left');
                        $(innerAligned).removeClass('text-align-center text-align-right text-align-left').css('text-align', '');
                        $(element).css('text-align', '');
                        $(element).addClass($(this).attr('data-class'));

                    });

                    $('#sectionPropsCancel').on('click', function() {
                        $('.section-customizer').addClass('hide');
                        settingsWindow.css({
                            bottom: '-200px',
                            right: '49px'
                        })
                    });
                }
                /*else {
                	$('.section-customizer').addClass('hide');
                	$('#details-mode-window').css({
                			bottom: '-200px',

                		})
                	//$('#details-mode-window #ui-accordion-accordion-styles-header-0').addClass('hide');
                	$('#details-mode-window #bl-overlay').addClass('hide');
                		$('#details-mode-window #bl-bg-image').addClass('hide');
                $('#details-mode-window #bl-parallax').addClass('hide');
                }*/

                if ($(element).is('button, .btn')) {
                    var $outlineButtons = $(document).find('#btnDng, #btnWrn, #btnSucc, #btnInf , #btnPrim, #btnWh, #btnBl');
                    var $sizeButtons = $(document).find('#btnXs, #btnMd, #btnLg');
                    var $roundButton = $(document).find('#btnRound');
                    var $roundNotButton = $(document).find('#btnNotRound');
                    $currentElement = $(element);

                    $('.btn-customizer').removeClass('hide');
                    settingsWindow.css({
                        bottom: '0',
                        right: '49px'
                    })
                    $('#btnRezetOutline').on('click', function() {
                        $(element).removeClass('btn-danger btn-info btn-primary btn-warning btn-success btn-outline btn-black btn-white');
                    });

                    var $marginSliderBtn = $(document).find('#__w-margin-slide-btn');
                    var $marginSliderBottomBtn = $(document).find('#__w-margin-slide-bottom-btn');

                    var topMargBtn = $currentElement.css('marginTop').replace(/[^-\d\.]/g, '');
                    $marginSliderBtn.val(0);
                    $marginSliderBtn.val(topMargBtn);



                    $marginSliderBtn.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            marginTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^margin\-top\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^margin-top-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('margin-top-' + newClass);

                    });
                    var bottomMargBtn = $currentElement.css('marginBottom').replace(/[^-\d\.]/g, '');
                    $marginSliderBottomBtn.val(0);
                    $marginSliderBottomBtn.val(bottomMargBtn);

                    $marginSliderBottomBtn.off('input').on('input', function() {
                        var valClass = $(this).val();
                        var marginAmount = $(this).val() + 'px'
                        var urlClass = $currentElement.attr('class');
                        $currentElement.css({
                            marginTop: ''
                        });
                        var el = $currentElement;
                        var regex = new RegExp(/^margin\-bottom\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        el.removeClass(makeRemoveClassHandler(/^margin-bottom-/));
                        var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass('margin-bottom-' + newClass);

                    });

                    $($roundButton).off('click').on('click', function() {
                        $(element).addClass('btn-round');
                        $($roundNotButton).removeClass('active');
                        $(this).addClass('active');
                    });
                    $($roundNotButton).off('click').on('click', function() {
                        $(element).removeClass('btn-round');
                        $($roundButton).removeClass('active');
                        $(this).addClass('active');
                    });

                    if ($(element).is('.btn-round')) {
                        $($roundNotButton).removeClass('active');
                        $($roundButton).addClass('active');

                    } else {
                        $($roundButton).removeClass('active');
                        $($roundNotButton).addClass('active');

                    }


                    $('#btnRezetSize').off('click').on('click', function() {
                        $(element).removeClass('btn-xs btn-md btn-lg');
                    });
                    $outlineButtons.off('click').on('click', function(event) {
                        $(element).removeClass('btn-danger btn-info btn-primary btn-warning btn-success btn-black btn-white');
                        $(element).css('background', '');
                        $(element).css('background-color', '');
                        $(element).css('color', '');
                        $(element).addClass($(this).attr('data-class'));
                        if ($(element).hasClass('btn-outline')) {} else {
                            $(element).addClass('btn-outline');
                        }
                    });
                    $sizeButtons.off('click').on('click', function(event) {
                        $(element).removeClass('btn-xs btn-md btn-lg');
                        $(element).css('padding', '');
                        $(element).addClass($(this).attr('data-class'));

                    });
                    //check if btn has no primary class
                    if ($(this).is('.btn-info')) {} else {
                        $(this).addClass('btn-info');
                    }
                    $('.btn-customizer .color-tool > li').off('click').on('click', function() {
                        //classes = currentElement.classList;
                        //var classes = $('.demo').find('btn-edit-material').attr('class');
                        el = $(element);
                        classes = $(el).attr('class');
                        $(element).css('background', '');
                        $(element).css('background-color', '');
                        $(element).css('color', '');

                        var urlClass = $(this).attr('class');
                        var regex = new RegExp(/^btn\-material\-(.+)/);

                        function makeRemoveClassHandler(regex) {
                            return function(index, classes) {
                                return classes.split(/\s+/).filter(function(el) {
                                    return regex.test(el);
                                }).join(' ');
                            }
                        }
                        $(el).removeClass(makeRemoveClassHandler(/^btn-material/));
                        $(el).removeClass('btn-white btn-outline btn-black');
                        $(el).addClass(urlClass);

                    });

                    el = $(element);
                    var regex = new RegExp(/^btn\-material\-(.+)/);

                    function makeRemoveClassHandler(regex) {
                        return function(index, classes) {
                            return classes.split(/\s+/).filter(function(el) {
                                return regex.test(el);
                            }).join(' ');
                        }
                    }
                    $('.colorpicker').on('mousedown', function() {
                        $(el).removeClass(makeRemoveClassHandler(/^btn-material/));
                    });

                    var buttonReset = $(document).find('.btn-customizer .reset-button');
                    $(buttonReset).off('click').on('click', function() {
                        $(el).removeClass('btn-white btn-outline btn-black');
                        $(el).removeClass(makeRemoveClassHandler(/^btn-material/));
                        if ($(el).is('.btn-info')) {} else {
                            $(el).addClass('btn-info');
                        }
                    });

                    $('#buttonPropsCancel').on('click', function() {
                        $('.btn-customizer').addClass('hide');
                        settingsWindow.css({
                            bottom: '-200px',
                            right: '49px'
                        })
                    });



                } else {
                    $('.btn-customizer').addClass('hide');
                    settingsWindow.css({
                        bottom: '-200px',
                        right: '49px'
                    })
                }
                if ($(element).is('section')) {
                    /*console.log(element);
                    	settingsWindow.css({
                    		//top: (window.pageYOffset || document.documentElement.scrollTop) + 34,
                    		top: offsetEl.top + 70,
                    		left: offsetEl.left + elWidth - 300,

                    	});*/

                } else
                if ($(element).is('nav.navbar') || elWidth > 600) {
                    /*console.log(element);
                    	settingsWindow.css({
                    		//top: (window.pageYOffset || document.documentElement.scrollTop) + 34,
                    		top: offsetEl.top + 70,
                    		left: offsetEl.left + elWidth / 2,

                    	});*/

                } else {


                    if (left + elWidth > 750) {
                        $('.section-customizer').addClass('hide');
                        /*console.log('left:' + left + elWidth);
                        	settingsWindow.css({
                        		//top: (window.pageYOffset || document.documentElement.scrollTop) + 34,
                        		top: offsetEl.top,
                        		left: offsetEl.left - 280,

                        	});*/




                    } else {

                        console.log('left:' + windowEl);
                        /*settingsWindow.css({
                        		//top: (window.pageYOffset || document.documentElement.scrollTop) + 34,
                        		top: offsetEl.top,
                        		left: offsetEl.left + elWidth + 20,

                        	});*/


                    }
                }
                $('#details-mode-window-minimize').off('click').on('click', self.windowMinimize);
                $('#details-mode-window-exit').off('click').on('click', function() {
                    $('#details-mode-window').hide();
                    $(elementToChange).removeClass('mode-elements-column-hover');
                    localStorageService.save();
                });
                $('#details-mode-window-reset').off('click').on('click', function() {
                    self.resetChanges();
                    self.saveToLocalStorage();
                });
                $('#details-mode-window-undo').off('click').on('click', function() {
                    eventListener.emmitEvent('undoStyles', [elementToChange]);
                })
                $('#details-mode-window-redo').off('click').on('click', function() {
                    eventListener.emmitEvent('redoStyles', [elementToChange]);
                });

            },
            windowMinimize: function() {
                var display = $('#details-mode-window-body').css('display');
                if (display == 'none') {
                    $('#details-mode-window-body').show();

                    $(this).text('-');
                } else {
                    $('#details-mode-window-body').hide();
                    $(this).text('+');
                }
            },
            resetChanges: function() {
                localStorageService.removeForStylesMode();
                if ($(elementToChange).find('.jumbotron').length > 0 && elementsBehaviorHelper.jumbatronIsEqualltoSection(elementToChange, $(elementToChange).find('.jumbotron')[0])) {
                    self.removeStyles($(elementToChange).find('.jumbotron'));
                } else {
                    self.removeStyles($(elementToChange));
                }
                $(elementToChange).find('.tie-to-modal').each(function() {
                    self.removeStyles(this);
                });
                $(elementToChange).find('li a, span').each(function() {
                    self.removeStyles(this);
                });
            },
            removeStyles: function(element) {
                boxModelTab.reset(element);
                borderRadiusTab.reset(element);
                colorTab.reset(element);
                backgroundImageTab.reset(element);
            },
            saveToLocalStorage: function() {
                localStorageService.saveForStylesMode($(elementToChange).outerHTML());
            }

        };

        eventListener.addListener('saveStylesModeState', self.saveToLocalStorage);
        eventListener.addListener('recreateStylesModal', self.recreate);
        eventListener.addListener('recreateStylesAll', self.start);

        return self;
    });
