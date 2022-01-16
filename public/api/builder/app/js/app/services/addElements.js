define(['services/eventListener', 'services/localStorageService', 'services/videoEmbedService'], function (eventListener, localStorageService, videoEmbedService) {

    function addRemoveButtons() {
        $('.demo').find('.box-layer').each(function () {
            if ($(this).find('.remove-block').length == 0) {
                $(this).prepend('<button class="remove-block btn btn-danger btn-sm" title="remove block"><i class="fa fa-times"></i></button>');
            }
        });

        $('.demo').find('.box-layer').find('.remove-block').off('click').on('click', function () {
            if($(this).parent().hasClass('navbar-fixed-top')){
							if($('body').hasClass('is-navbar-fixed-top')){
										$('body').removeClass('is-navbar-fixed-top');
									}
						}
			$(this).parent().remove();
			
            localStorageService.save();
        });
    };

    function addDraggableSpans() {
        $('.demo').find('.box-layer').each(function () {
            if ($(this).find('span.drag').length == 0) {
                $(this).prepend('<span style="font-size:17px; line-height:20px; letter-spacing:0;" class="drag"><i style="font-size:16px; line-height:10px; letter-spacing:0;" class="fa fa-arrows"></i></span>');
            }
        });
    };
		function addSettingsBtn() {
       $('.demo').find('.box-layer').each(function () {
            if ($(this).find('button.settings-block').length == 0) {
			
                $(this).prepend('<button class="settings-block  btn btn-default btn-material-grey-300 btn-raised btn-sm"><i class="fa fa-cogs"></i></button>');
            }
        });
		console.log('settbtn')
		
    };
	
	  function addMovableSpans() {
        $('.demo').find('.box-layer').each(function () {
            if ($(this).find('span.m__move_arrow').length == 0) {
                $(this).prepend('<span style="font-size:28px;  letter-spacing:0;" class="m__move_arrow"><i  class="mdi-hardware-keyboard-arrow-up md_up"></i> <i class="mdi-hardware-keyboard-arrow-down md_down"></i></span>');
            }
			
        });
		
		 $('.demo').find('.box-layer').find('.m__move_arrow i.md_up').off('click').on('click', function () {
		 
            var section = $(this).parent().parent();
			var prevSection = $(section).prev();
			$(section).insertBefore(prevSection);
			$('html, body').animate({
				scrollTop: parseInt($(section).offset().top)
			}, 600);
			$.stellar('refresh');
            localStorageService.save();
        });
		 $('.demo').find('.box-layer').find('.m__move_arrow i.md_down').off('click').on('click', function () {
            var section = $(this).parent().parent();
			var nextSection = $(section).next();
			$(section).insertAfter(nextSection);
			$('html, body').animate({
				scrollTop: parseInt($(section).offset().top)
			}, 600);
			$.stellar('refresh');
            localStorageService.save();
        });
    };

    function wrapIframe() {
        $('.demo').find('.box-layer').find('iframe').each(function () {
            if ($(this).parent().parent().find('.btnForIFrameSrcChage').length == 0) {
                $(this).parent().parent().prepend("<button class='btn btn-sm btn-primary btnForIFrameSrcChage'><i class='fa fa-video-camera'></i>    Change Video</button>");
            }
            $(this).parent().parent().find('button').off('click').on('click', function (event) {
                event.preventDefault(event);
                var iframeParent = $(this).parent();
                var videoSrc = $(iframeParent).find('iframe').attr('src');

                $('#video-url-data').val(videoSrc);
                $('#video-change-modal').find('textarea').val('');
                $('#video-change-modal').modal('show');

                $('#save-video-url').off('click').on('click', function () {

                    var newSrc;

                    if ($('#video-change-modal').find('li.active').find('a').attr('href') == '#showVideoHtml') {

                        var textAreaValue = $('#video-change-modal').find('textarea').val();

                        if (textAreaValue != '') {
                            $(iframeParent).find('iframe').replaceWith(textAreaValue);
                            newSrc = $(iframeParent).find('iframe').attr('src');
                        }
                    }
                    else {
                        newSrc = $('#video-url-data').val();
                    }

                    if (newSrc != '') {
                        var finalSrc = videoEmbedService.convertMedia(newSrc);
                        $(iframeParent).find('iframe').attr('src', finalSrc);
                    }

                    if (videoSrc !== finalSrc) {
                        localStorageService.save();
                    }

                    $('#video-change-modal').modal('hide');
                });
            });
        });
    };

    eventListener.addListener('addRemoveButtons', addRemoveButtons);
    eventListener.addListener('addDaggableSpans', addDraggableSpans);
    eventListener.addListener('addMovableSpans', addMovableSpans);
    eventListener.addListener('wrapIframe', wrapIframe);
	 eventListener.addListener('addSettingsBtn', addSettingsBtn);
});