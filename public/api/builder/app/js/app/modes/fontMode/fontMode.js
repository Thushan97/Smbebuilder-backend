define(['services/htmlCleanerService', 'modes/fontMode/breakpoint', 'modes/fontMode/cssChanger', 'modes/fontMode/sideBar', 'modes/fontMode/variables', 'modes/fontMode/fontGetter', 'services/localStorageService'],
    function (htmlCleanerService, breakpoint, cssChanger, sideBar, variables, fontGetter, localStorageService) {

        var self,
			frameBody;

        return {
            activate: function () {
                self = this;
                //window.scrollTo(0,0);
                //$('.demo').css('display', 'none');
               // $('body').css({ 'overflow': 'hidden' });

				sideBar.show();
                frameBody = $('#iframePreviewMode').find('iframe').contents().find('body');

                self.subModesInit();
                self.createSliders();
                sideBar.init();
                //  self.addHandlers2nodes();
                self.tieControl2Current();
                fontGetter.getFonts();
                breakpoint.init();
                $('.sub-group').trigger('click');
				$('#lg-media-btn').trigger('click');
				self.resetBehaviour();

            },
            fontTagsInit: function () {
				var body = frameBody.find('.font-body');
				var demo = $('.demo');
                var demoVariables = $(demo).find('h1,h2,h3,h4,h5,h6,p')

				body.on('mouseenter', fontTagsEnterHandler).on('mouseleave', function () {
                    $(this).removeClass('mode-fonts-hover');
                }).on('click', fontTagsClickHandler);

				$('*', body).on('mouseenter', fontTagsEnterHandler).on('mouseleave', function () {
                    $(this).removeClass('mode-fonts-hover');
                }).on('click', fontTagsClickHandler);

				$(demoVariables).on('mouseenter', fontTagsEnterHandler).on('mouseleave', function () {
                    $(this).removeClass('mode-fonts-hover');
                }).on('click', fontTagsClickHandler);

				$(demoVariables).on('mouseenter', fontTagsEnterHandler).on('mouseleave', function () {
                    $(this).removeClass('mode-fonts-hover');
                }).on('click', fontTagsClickHandler);


                $(body).trigger('click');

                function fontTagsEnterHandler(e) {
                    if (!$(this).hasClass('tag-outline')) {
                        $(this).addClass('mode-fonts-hover');
                    }
                };

                function fontTagsClickHandler(e) {
                    e.preventDefault(e);
                    e.stopPropagation(e);

                    var currentFontFamily = $(e.currentTarget).css('font-family').replace(/\'/g, '');

                    var inputs = $('.font-settings .font-control').find('li');
                    var inputsLength = inputs.length;

                    inputs.each(function (index) {

                        if ($(this).text() == currentFontFamily) {
                            $(this).addClass('active');
                            return false;
                        }

                        if (inputsLength - 1 == index) {
                            $('.font-settings .font-control').find('.active').removeClass('active');
                        }
                    });

                    frameBody.find('.font-tags .tag-outline').removeClass('tag-outline');
                    variables.current = $(this).addClass('tag-outline').removeClass('mode-fonts-hover');
                    if (variables.current.hasClass('font-body')) {
                        $('.tag_choosen span').html('body');
                    } else {
                        $('.tag_choosen span').html(variables.current.get(0).tagName.toLowerCase());
                        frameBody.find('.font-body').addClass('mode-fonts-hover');
                    }
                    sideBar.sideBarRefresh();
					localStorageService.saveFonts();
                };
            },
            /*  addHandlers2nodes: function () {
                  var textNodes = self.getTextNodes();

                  $(textNodes).on('mouseenter', function () {
                      $(this).addClass('mode-elements-column-hover').on('click', function (e) {
                          e.preventDefault(e);
                          variables.current = $(this);
                          sideBar.sideBarRefresh();
                      })
                  }).on('mouseleave', function () {
                      $(this).removeClass('mode-elements-column-hover').off('click');
                  });


              },
              getTextNodes: function () {
                  var hasTextElements = [];
                  frame.contents().find('section *, footer *').each(
                      function () {
                          var textNodes = $(this).contents().filter(
                              function () {
                                  return this.nodeType === 3 && /\w/.test(this.nodeValue)
                              });

                          if (textNodes.length > 0) {
                              hasTextElements.push(this);
                          }
                      });

                  return hasTextElements;
              },*/
            tieControl2Current: function () {
                $('.control input[type=text]').on('change', textInputHandler);

                function textInputHandler(e) {
                    var val = parseInt($(this).val()),
                        minlimit, maxlimit, attr;

                    if ($(this).hasClass('spacing-input')) {
                        maxlimit = 30;
                        minlimit = -5;
                        attr = 'letter-spacing';
                    } else {
                        maxlimit = 120;
                        minlimit = 0;
                        attr = $(this).hasClass('size-input') ? 'font-size' : 'line-height';
                    }

                    if ((val > maxlimit) || (val < minlimit) || (val != val)) {
                        val = val < minlimit ? minlimit : maxlimit;
                    }
                    $(this).val(val);
                    $(this).siblings('.slider').slider('value', val);

                    cssChanger.changeCss(attr, val + 'px');
                }

                $('.incrase, .decrase', sideBar.sideBar).on('click', function (e) {
                    e.preventDefault(e);
                    var slider = $(this).parent().find('.slider'),
                        val = parseInt(slider.slider('value')),
                        attr = '';

                    $(this).hasClass('incrase') ? val++ : val--;

                    if (slider.hasClass('spacing-input')) {
                        attr = 'letter-spacing';
                    } else {
                        attr = slider.hasClass('size-input') ? 'font-size' : 'line-height';
                    }

                    slider.slider('value', val);
                    $(this).parent().find('input[type=text]').val(val);
                    cssChanger.changeCss(attr, val + 'px');
                })
            },

            createSliders: function () {
                $('.font-settings .slider:not(.spacing-input)').slider({
                    max: 120,
                    min: 8,
                    animate: true,
                    step: 1,
                    slide: function (event, ui) {
                        var val = ui.value,
                            attr = '';

                        $(this).parent().find('input[type=text]').val(val);
                        attr = $(this).hasClass('size-input') ? 'font-size' : 'line-height';
                        cssChanger.changeCss(attr, val + 'px');
                    }
                });

                $('.font-settings .slider.spacing-input').slider({
                    max: 30,
                    min: -5,
                    animate: true,
                    step: 1,
                    slide: function (event, ui) {
                        var val = ui.value,
                            attr = 'letter-spacing';

                        $(this).parent().find('input[type=text]').val(val);
                        cssChanger.changeCss(attr, val + 'px');
                    }
                });
            },

            subModesInit: function () {
                $('.sub-group').on('click', function () {
                    self.fontTagsInit();
                });

                /*  $('.sub-view').on('click', function () {
                      $('.font-tags').hide();
                      $('#iframePreviewMode').show();
                      self.addButtonsBehavior();
                  });*/
            },
			resetBehaviour: function() {
				$('#reset-all').on('click', resetAll);
				$('#reset-current').on('click', resetCurrent);

				function resetAll() { //added #font-media !!!
					$('#font-media, #font-styles, #font-face').text('');
					$('#iframePreviewMode').find('iframe').contents().find('head').find('#mediaStyles, #font-styles').text('');
					$('.font-settings li.active').removeClass('active');
					sideBar.sideBarRefresh();
					localStorageService.removeAllFonts();
				}

				function resetCurrent() {
					var media = breakpoint.getMedia();
					if (media.width == '100%') {
						console.log(media.width)
						$('#font-styles').text('');
						$('#iframePreviewMode').find('iframe').contents().find('head').find('#font-styles').text('');
						localStorageService.removeLgFonts();
					} else {
					$('#iframePreviewMode').find('iframe').contents().find('head').find('#mediaStyles, #font-face, #font-styles').text('')
					$('#font-media').text('');
					var fontStyleLG = $('#font-styles').text();
					String.prototype.replaceAll = function (find, replace) {
				var str = this;
				return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
			};

					string = fontStyleLG;
					string = string.replaceAll('!important', '');
					var fontFaceLG = $('#font-face').text();
					$('#iframePreviewMode').find('iframe').contents().find('head').find('#font-styles').text(string)
					$('#iframePreviewMode').find('iframe').contents().find('head').find('#font-face').text(fontFaceLG)
					localStorageService.removeSmFonts();
						var fontMedia = $('#font-media').text(),
							pre = '@media all and (min-width: ' + media.min + 'px) and (max-width: ' + media.width + 'px)';

						pre += media.orientation ? ' and (orientation: ' + media.orientation + ')' : '';
						if (fontMedia.indexOf(pre) < 0) {
							return false;
						}
						fontMedia = fontMedia.split('}}');
						fontMedia.sort(function (_1, _2) {
							if (_1.indexOf(pre) > -1) {
								return true;
							}
						})
						fontMedia.pop();
						fontMedia = fontMedia.join('}}');
						$('#font-media').text(fontMedia);
						$('#iframePreviewMode').find('iframe').contents().find('head').find('#mediaStyles').text(fontMedia);
					}
					$('.font-settings li.active').removeClass('active');
					sideBar.sideBarRefresh();

					localStorageService.saveFonts();
				}
			},
            unbind: function () {
                $('#iframePreviewMode').find('.toggle-buttons li>a').find('small').show();
				        $('#overlayFontMode').css('display', 'none');
                $('#iframePreviewMode').find('#breakpoint-all').hide();
                $('body').css({ 'overflow': 'visible' });
                $('#iframePreviewMode').find('.controls-wrap.text-center.navbar-fixed-top.font-breakpoint').css({
                    left: '0',
                    right: '0'
                });
                $('#iframePreviewMode').attr('style', 'display:none;  height:100%;');
                $('#iframePreviewMode').find('.toggle-buttons li>a').off('click');

                $('.control .ui-slider').slider('destroy');
                $('.incrase, .decrase').off('click');
				$('#reset-all, #reset-current').off('click');
                $('.control input[type=text]').off('change');
                $('.sub-group').off('click');
                if (frameBody) {
                    frameBody.find('.font-body-holder *').off('click');
                }
				$('.choose').off('click').off('mousedown');
				localStorageService.saveFonts();
            }
        };
    });
