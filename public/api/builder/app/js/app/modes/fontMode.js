define(['services/htmlCleanerService', 'modes/fontMode/breakpoint'], function(htmlCleanerService, breakpoint) {
	
	var self,
		frame,
		tagCtrl,
		fontCtrl,
		sizeCtrl,
		lineCtrl,
		spacingCtrl,
		current,
		fonts,
		sideBar,
		frameStyles,
		fontMedia,
		fontStyles;
	
	return {
		activate: function() {
			self = this;
            $('.demo').css('display', 'none');
			self.getControls();
			self.subModesInit();
			self.createSliders();
			self.sideBarInit();
			self.tieControl2Current();
			self.frameSettings();
			
			self.addHandlers2nodes();
			self.getFonts();
			
			$('.sub-group').trigger('click')
			sideBar.show();
			breakpoint.init();
			if (!fontMedia) {
				fontMedia = $('<style id="font-media"></style>').appendTo($('head'));
			}
			if (!fontStyles) {
				fontStyles = $('<style id="font-styles"></style>').appendTo($('head'));
			}
		},
		sideBarInit: function() {
			$('body').on('mousedown', function() {
				$('.control-list').hide();
			})
		
			$('.choose').on('click', function() {
				var list = $(this).parent().siblings('.control-list'),
					visible = list.is(':visible');
					
				$('.control-list').hide();
				visible ? list.hide() : list.show();
			}).on('mousedown', function(e) {
				e.stopPropagation(e);
			});
			
			$('.tag-list div').on('click', function() {
				var tagName = $(this).html(),
					currentSelect = tagName == 'Body' ? '.font-body' : tagName;
				
				$('.tag_choosen span').html(tagName);
				$('.font-tags .tag-outline').removeClass('tag-outline');
				current = $('.font-tags ' + currentSelect).addClass('tag-outline');
				self.sideBarRefresh();
				$('.tag-list').hide();
			}).on('mousedown', function(e) {
				e.stopPropagation(e);
			});
		},
		fontTagsInit: function() {
			var body = $('.font-tags .font-body');
			
			body.on('mouseenter', fontTagsEnterHandler).on('mouseleave', function() {
				$(this).removeClass('mode-elements-column-hover');
			}).on('click', fontTagsClickHandler);
			
			$('*', body).on('mouseenter', fontTagsEnterHandler).on('mouseleave', function() {
				$(this).removeClass('mode-elements-column-hover');
			}).on('click', fontTagsClickHandler);
			
			body.trigger('click');
			
			function fontTagsEnterHandler(e) {
				if (!$(this).hasClass('tag-outline')) {
					$(this).addClass('mode-elements-column-hover')
				}
			};
			
			function fontTagsClickHandler(e) {
				e.preventDefault(e);
				e.stopPropagation(e);
				current = $(this);
				$('.font-tags .tag-outline').removeClass('tag-outline');
				current.addClass('tag-outline').removeClass('mode-elements-column-hover');
				var currentTagName = current.hasClass('font-body') ? 'Body' : current.get(0).tagName.toLowerCase();
				if (currentTagName != 'Body') {
					$('.font-tags .font-body').addClass('mode-elements-column-hover');
				}
				$('.tag_choosen span').html(currentTagName);
				self.sideBarRefresh();
			};
			
			$('.font-tags').show();
		},
		frameSettings: function() {
			frame = $('#iframePreviewMode').find('iframe').css('width', '100%').attr('scrolling', 'yes');
			var iframe_doc = $(frame).prop('contentDocument');
            iframe_doc.open();
            iframe_doc.write(htmlCleanerService.getCleanedHtml(false));
            iframe_doc.close();
			
			frame.contents().find('head').append('<style>.mode-elements-column-hover {-moz-box-shadow: inset 0 0 10px #5bc0de !important;-webkit-box-shadow: inset 0 0 10px #5bc0de !important;box-shadow: inset 0 0 10px #5bc0de !important;}</style>');
			frameStyles = $('<style></style>').appendTo(frame.contents().find('head'));
		},
        addButtonsBehavior: function () {
            var devicesElements = $('#iframePreviewMode').find('.toggle-buttons').find('li>a');
            $(devicesElements).on('click', function (e) {
                e.preventDefault(e);
                $("#output iframe, #output").animate(
                    {
                        width: $(this).attr("data-width"),
                        height: $(this).attr("data-height")
                    }, 150);

                $(devicesElements).removeClass("checked");
                $(this).addClass("checked");
            });

            $(".toggle-buttons a:last").trigger('click');
        },
		addHandlers2nodes: function() {
			var textNodes = self.getTextNodes();
			
			$(textNodes).on('mouseenter', function() {
				$(this).addClass('mode-elements-column-hover').on('click', function(e) {
					e.preventDefault(e);
					current = $(this);
					self.sideBarRefresh();
				})
			}).on('mouseleave', function() {
				$(this).removeClass('mode-elements-column-hover').off('click');
			});
			
			
		},
		getTextNodes: function() {
			var hasTextElements = [];
			frame.contents().find('section *, footer *').each(
				function(){
					var textNodes = $(this).contents().filter(
						function() {
							return this.nodeType === 3 && /\w/.test(this.nodeValue)
						});
						
					if (textNodes.length > 0) {
						hasTextElements.push(this);
					}
			});
			
			return hasTextElements;
		},
		getControls: function() {
			sideBar = $('.font-settings');
			tagCtrl = $('.tag-select', sideBar);
			fontCtrl = $('.font-control', sideBar);
			sizeCtrl = $('.size-control', sideBar);
			lineCtrl = $('.line-control', sideBar);
			spacingCtrl = $('.spacing-control', sideBar);
		},
		tieControl2Current: function() {	
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
				
				if (( val > maxlimit) || (val < minlimit) || (val != val)) {
					val = val < minlimit ? minlimit : maxlimit;
				}
				$(this).val(val);
				$(this).siblings('.slider').slider('value', val);
				
				self.changeCss(attr, val + 'px');
			}
			
			$('.incrase, .decrase', sideBar).on('click', function(e) {
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
				self.changeCss(attr, val + 'px');
			})
		},
		getFonts: function() {
			$.ajax('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD0rzoVRUZr_z4soNzi407LsRmg8VC8WCo')
				.done(function(e){
					fonts = e.items;
					self.createFontList();
				}).fail(function(e){
					
				})
		},
		createFontList: function() {
			for (var i = 0; i < fonts.length; i++) {
				//fontStyles.append('\n@font-face{\nfont-family:\'' + fonts[i].family + '\';\nsrc: url(' + fonts[i].files.regular + ');\n}');
				fontCtrl.append('<label><input name="fonts" type="radio" title="' + fonts[i].files.regular + '"/>' + fonts[i].family + '</label>');
			}
			
			$('label', fontCtrl).on('click', function() {
				if ($(this).is(':checked')) {
					return false;
				}
				
				var newFont = $(this).text(),
					source = $(this).children().attr('title'),
					regSource = new RegExp(source + '');
				
				if (!regSource.test(fontStyles.text())) {
					fontStyles.prepend('\n@font-face{\nfont-family:' + newFont + ';\nsrc: url(' + source + ');}')
				}
				self.changeCss('font-family', newFont);
			})
		},
		createSliders: function() {
			$('.slider:not(.spacing-input)', sideBar).slider({
				max: 120,
				min: 8,
				animate : true,
				step: 1,
				slide: function(event, ui) {
					var val = ui.value,
						attr = '';
					
					$(this).parent().find('input[type=text]').val(val);
					attr = $(this).hasClass('size-input') ? 'font-size' : 'line-height';
					self.changeCss(attr, val + 'px');
				}
			});
			
			$('.slider.spacing-input', sideBar).slider({
				max: 30,
				min: -5,
				animate : true,
				step: 1,
				slide: function(event, ui) {
					var val = ui.value,
						attr = 'letter-spacing';
					
					$(this).parent().find('input[type=text]').val(val);
					self.changeCss(attr, val + 'px');
				}
			})
		},
		sideBarRefresh: function() {
			var currentFontSize = parseInt(current.css('fontSize')),
				currentLineHeight = parseInt(current.css('lineHeight')),
				currentLetterSpacing = parseInt(current.css('letterSpacing'));
				
			$('.size-input[type=text]', sizeCtrl).val(currentFontSize);
			$('.line-input[type=text]', lineCtrl).val(currentLineHeight);
			$('.spacing-input[type=text]', spacingCtrl).val(currentLetterSpacing);
			
			$('.size-input.slider').slider('value', currentFontSize);
			$('.line-input.slider').slider('value', currentLineHeight);
			$('.spacing-input.slider').slider('value', currentLetterSpacing);
		},
		subModesInit: function() {
			$('.sub-group').on('click', function() {
				$('#iframePreviewMode').hide();
				self.fontTagsInit();
			})
			
			$('.sub-view').on('click', function() {
				$('.font-tags').hide();
				$('#iframePreviewMode').show();
				self.addButtonsBehavior();
			})
		},
		changeCss: function (attr, val) {
			var media = breakpoint.getMedia();
			media.width == '100%' ? self.changeCommonCss(attr, val) : self.changeMediaCss(attr, val, media);
		},
		changeMediaCss: function(attr, val, media) {
			var pre = '@media screen and (max-width: ' + media.width + 'px)',
				cssMedia,
				styles,
				create = false,
				createStyle = false;
				tag = current.hasClass('font-body') ? '' : current.get(0).tagName.toLowerCase(),
				reg = new RegExp('.demo ' + tag + ',.font-body ' + tag + '{(.*\\s?})*', 'g');
			
			if (media.orientation) {
				pre += ' and (orientation: ' + media.orientation + ')'
			}
			
			var preIndex = fontMedia.text().indexOf(pre), end = '';
				
			if (preIndex >= 0) {
				if (preIndex != fontMedia.text().lastIndexOf('@')) {
					end = '';
				}
				
				var regMedia = new RegExp('@media screen and \\(max-width: ' + media.width + 'px\\)(.*\\s?)*' + end, 'g');
				cssMedia = fontMedia.text().match(regMedia) + '';
				styles = cssMedia.match(reg);
				if (styles) {
					styles += '';
				} else {
					styles = '.demo ' + tag + ',.font-body ' + tag + '{}';
					createStyle = true;
				}
			} else {
				cssMedia = '\n' + pre + '{}';
				styles = '.demo ' + tag + ',.font-body ' + tag + '{}';
				create = createStyle = true;
			}
			
			if (styles.indexOf(attr) < 0) {
				styles = styles.replace(/}/, attr + ':' + val + ';}');
			} else {
				var regAttr = new RegExp(attr + '\\s?:\\s?\\w*;');
				styles = styles.replace(regAttr, attr + ':' + val + ';')
			}
		
			if (createStyle) {
				regLastOccurence = new RegExp('}(\\s?)*' + end + '$', 'g');
				lastOccurence = cssMedia.match(regLastOccurence);
				cssMedia = cssMedia.replace(regLastOccurence, styles + lastOccurence);
			} else {
				cssMedia = cssMedia.replace(reg, styles);
			}
			
			create ? fontMedia.append(cssMedia) : fontMedia.text( fontMedia.text().replace(regMedia, cssMedia) );
		},
		changeCommonCss: function(attr, val) {
			var reg, styles, create = false,
				tag = current.hasClass('font-body') ? '' : current.get(0).tagName.toLowerCase();
			
			reg = new RegExp('.demo ' + tag + ',.font-body ' + tag + '{(.*\\s?})*', 'g');
			styles = fontStyles.text().match(reg)
			if (styles) {
				styles += '';
			} else {
				styles = '\n.demo ' + tag + ',.font-body ' + tag + '{}';
				create = true;
			}
			
			if (styles.indexOf(attr) < 0) {
				styles = styles.replace(/}/, attr + ':' + val + ';}');
			} else {
				var regAttr = new RegExp(attr + '\\s?:\\s?\\w*;');
				styles = styles.replace(regAttr, attr + ':' + val + ';')
			}
				
			create ? fontStyles.append(styles) : fontStyles.text( fontStyles.text().replace(reg, styles) );
		},
		unbind: function () {
		    $('.font-tags, .font-breakpoint').hide();
		}
	}
})