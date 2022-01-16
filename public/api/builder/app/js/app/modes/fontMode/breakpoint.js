define(['../../../toastr', 'modes/fontMode/sideBar', 'services/htmlCleanerService'], 
	function (toastr, sideBar, htmlCleanerService) {

    var currentMedia,
        frame,
        fontTags = '<div class="demo"><div class="font-tags"><div class="font-body-holder"><div class="font-body"><h1>Heading One H1</h1><h2>Heading Two H2</h2><h3>Heading Three H3</h3><h4>Heading Four H4</h4><h5>Heading Five H5</h5><p>Paragraph. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p></div></div></div></div>';
    var self = {
        init: function () {
            self.frameSettings();
            self.addButtonsBehavior();
        },
        frameSettings: function () {

            var iframePreviewModeContainer = document.getElementById('iframePreviewMode');
            //iframePreviewModeContainer.style.display = 'block';
            iframePreviewModeContainer.style.marginLeft = '240px';

            frame = iframePreviewMode.getElementsByTagName('iframe')[0];
            frame.style.width = '100%';

            var breakpointAll = document.getElementById('breakpoint-all');
            breakpointAll.style.display = 'table-cell';

           var breakPointsText = iframePreviewModeContainer.querySelectorAll('.toggle-buttons li>a small');
           for (var i = 0; i < breakPointsText.length; i++) {
               breakPointsText[i].style.display = 'none';
            }

            var breakPoints = iframePreviewMode.getElementsByClassName('font-breakpoint')[0];
            breakPoints.style.left='240px';
            breakPoints.style.right='0';
			
            $(frame).contents().find('body').html(fontTags);
			
			self.setValues2frame();
        },
		setValues2frame: function () {
			var fs = htmlCleanerService.getFontsAndStyles(),
				head = $(frame).contents().find('head');
			
			head.html('<link rel="stylesheet" href="css/bootstrap.min.css"><style>.tag-outline {outline: 2px solid rgb(116,122,115);} .mode-fonts-hover {-moz-box-shadow: inset 0 0 10px #5bc0de !important;-webkit-box-shadow: inset 0 0 10px #5bc0de !important;box-shadow: inset 0 0 10px #5bc0de !important;}html body{line-height:26px;}.font-body{padding:15px;}.font-body *{margin:15px 0;padding:5px;}</style><style id="font-styles"></style><style id="font-face"></style><style id="mediaStyles"></style>');
			String.prototype.replaceAll = function (find, replace) {
				var str = this;
				return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
			};

			string = fs[0];
			string = string.replaceAll('!important', '');
			var fFace = $('#font-face').html();
		//	head.find('#font-face').append( fs[1] );
		    head.find('#font-face').append( fFace );
			head.find('#font-styles').append( string );
			head.find('#mediaStyles').append( fs[2] );
		},
        addButtonsBehavior: function () {
            //var devicesElements = $('#iframePreviewMode').find('.toggle-buttons li>a');
			var smMediaBtn = $('#sm-media-btn');
			var lgMediaBtn = $('#lg-media-btn');
			 var iframePreviewModeContainer = document.getElementById('iframePreviewMode');
			 var overlayLgContainer = $('#overlayFontMode');
			 var mobOutput = $('#output');
			 
			smMediaBtn.off('click').on('click', function(){
					mobOutput.addClass('active')
					iframePreviewModeContainer.style.display = 'block';
					$(overlayLgContainer).css('display', 'block')
					$('body').css('overflow', 'hidden');
			})
			lgMediaBtn.off('click').on('click', function(){
					$(overlayLgContainer).css('display', 'none');
					iframePreviewModeContainer.style.display = 'none';
					mobOutput.removeClass('active');
					$('body').css('overflow', '');
			})
			overlayLgContainer.off('click').on('click', function(){
					$(overlayLgContainer).css('display', 'none');
					iframePreviewModeContainer.style.display = 'none';
					mobOutput.removeClass('active');
					$('body').css('overflow', '');
					lgMediaBtn.trigger('click')
			})
		
			
           var devicesElements = $('.font-settings').find('a.media-w-btns');
            devicesElements.on('click', function (e) {
				var el = $(this);
                if (el.hasClass('checked')) {
                    return false;
                }
                e.preventDefault(e);
                var width = el.attr("data-width"),
					height = el.attr("data-height");
                $("#output iframe, #output").animate(
                    {
                        width: width,
                        height: height
                    }, 150, function() {sideBar.sideBarRefresh()});

                devicesElements.removeClass("checked");
                el.addClass("checked");

                var infoScreen = width == '100%' ? ' at all' : ' only at ' + width + '&nbsp;&times;&nbsp;' + height;
                self.log.info('Click on text element to edit it for' + infoScreen + ' media widths', 'Info')
                self.setMedia(width, el.attr('data-orientation'));
            });

        },
        setMedia: function (width, orientation) {
            var min;
            switch (width) {
                case '320':
                    min = '0';
                    break;
                case '480':
                    min = '0';	
                    break;
                case '767':
                    min = '480';
                    break;
                case '991':
                    min = '768';
                    break;
                case '1199':
                    min = '992';
                    break;
                case '1350':
                    min = '1200';
                    break;
                case '1920':
                    min = '1350';
                    break;
            }
            currentMedia = {
				
					'width': width,
					'min': min,
					'orientation': orientation
				
            }
        },
        getMedia: function () {
            return currentMedia;
        },
        addStyles: function () {
            var getFont = $('#font-styles').text().replace(/(.demo \w*?,.font-body)/g, 'html body');
			String.prototype.replaceAll = function (find, replace) {
				var str = this;
				return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
			};

			string = getFont;
			string = string.replaceAll('!important', '');
			
            $(frame).contents().find('head').find('#font-styles').html(string);
        },
        addFontFace: function (styles) {
            $(frame).contents().find('head').find('#font-face').append(styles);
        },
        addMediaStyles: function () {
            $(frame).contents().find('head').find('#mediaStyles').html($('#font-media').text().replace(/(.demo \w*?,.font-body)/g, 'html body'));
        }
    };

    self.log = toastr;

    self.log.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    return self;
});