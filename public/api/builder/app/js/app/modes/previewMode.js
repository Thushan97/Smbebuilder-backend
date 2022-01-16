define(['services/htmlCleanerService'], function (htmlCleanerService) {

    var frame,
        self;

    return {
        activate: function () {
            self = this;
            $('.demo').css('display', 'none');
           $('#iframePreviewMode').css('display', 'block');
            $('#iframePreviewMode').addClass('active');
            frame = $('#iframePreviewMode').find('iframe').css('width', '100%');
			$('body').scrollTop(0,0).css('overflow', 'hidden');
            self.addButtonsBehavior();
            self.startPreview();
			var iframe = document.querySelector('#previeIframe');
			 $('#iframePreviewMode').find(".toggle-buttons a:last").trigger('click');
			frame.attr('scrolling', 'auto');
			/*var scrollContainer = iframe.contentDocument.querySelector('#Default');
		
			var scrollInner = iframe.contentDocument.querySelector('#scrolInnerContent');
			var scrollHeight = $(scrollInner).height();
			
					Ps.initialize(scrollContainer);
					//$(scrollContainer).css('height', scrollHeight);
				Ps.update(scrollContainer); */

			
        },
        addButtonsBehavior: function () {
            var devicesElements = $('#iframePreviewMode').find('.toggle-buttons').find('li>a');
            $(devicesElements).on('click', function (e) {
                e.preventDefault(e);
                var framewindow = $("#output iframe");
                $("#output iframe, #output").animate(
                    {
                        width: $(this).attr("data-width"),
                        height: $(this).attr("data-height")
                    }, 250);

                //framewindow.attr('scrolling', 'auto');
                $(devicesElements).removeClass("checked");
                $(this).addClass("checked");
				/*var iframe = document.querySelector('#previeIframe');
				var scrollContainer = iframe.contentDocument.querySelector('#Default');
				Ps.update(scrollContainer); 
		$(iframe).on('click', '.scroll', function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			  if (target.length) {
				scrollContainer.scrollTop( target.offset().top);
			
				Ps.update(scrollContainer); 
				return false;
			  }
			}
		  });*/
				
            });

           
        },
        startPreview: function () {
            var iframe_doc = $(frame).prop('contentDocument');
            iframe_doc.open();
            iframe_doc.write(htmlCleanerService.getCleanedHtml(false));
            iframe_doc.close();
			
        },
        unbind: function () {
			frame = $('#iframePreviewMode').find('iframe');
			var iframe_doc = $(frame).prop('contentDocument');
			//iframe_doc.write('');
			$('body').css('overflow', '');
            $('.demo').css('display', 'block');
            $('#iframePreviewMode').css('display', 'none');
            $('#iframePreviewMode').removeClass('active');
        }
    };
});