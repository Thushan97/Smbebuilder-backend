define(['elementsBehaviorHelper', 'mediumEditor' ], function (elementsBehaviorHelper) {

    var self, editorhtml;

	var self = {
			
        makeElementsDraggable: function () {
            self = this;

            $(".sidebar .box-layer").draggable({
				//appendTo: '.appendix',
				appendTo: 'body',
                connectToSortable: '.demo',
                placeholder: '.placeholder',
                helper: function(){
                var dom = [];
                 
                dom.push("<div style=\"opacity:1;height:150px;width:300px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;background: #cfcfcf;	box-shadow: 5px 5px 10px rgba(50,50,50, .5);-moz-box-shadow: 5px 5px 10px rgba(50,50,50, .5);-webkit-box-shadow: 5px 5px 10px rgba(50,50,50, .5);\">",
                         "</div>");
                 
                return $(dom.join(''));
            },
                handle: '.drag',
				//zIndex: 9999,
				tolerance: 'pointer',
                //containment: '.demo',
                //refreshPositions: true,
				//cursorAt: {left: 100, top: 0},
                scroll: true,
				revert: 'invalid',
                start: self.startHandler,
                drag: self.dragHandler,
                stop: self.stopHandler
            });
        },
        dragHandler: function (event, ui) {
          //ui.helper.width(200);
         // ui.helper.height(150);
		 // ui.placeholder.height('70px')
		   /*ui.helper.css({
				'z-index' : '10000',
				'position' : 'absolute',
				'overflow' : 'hidden',
				//'width' : '150px',
				//'height' : '50px',
					 
		  });*/
		
		//   var st = parseInt($(this).data("startingScrollTop"));
     // ui.position.top -= $(this).parent().scrollTop() - st;
		   
			
        },
        startHandler: function (event, ui) {
			$(this).addClass('hideWhenDrag');
			$('.demo-wrapper').css('overflow', 'visible');
				 $('.sidebar').animate({
                            marginLeft: "0px",
                            opacity: "1"
                        }, 5);
            $('.info-tip').css('display', 'none');
			//$(this).data("startingScrollTop",$(this).parent().scrollTop());
			// hide BLOCKs modal
			//$('#m__add-block').modal('hide');
			//$('.demo .box-layer').addClass('drag-margin-holder');

        },
        stopHandler: function (event, ui) {
		$('.demo-wrapper').css('overflow', 'hidden');
			setTimeout(function() { $('.sidebar').animate({
                            marginLeft: "290px",
                            opacity: "1"
                        }, 300);
				}, 500)
			
		
			//$('.demo .ui-draggable').removeClass('ui-draggable');
			//$('.demo .box-layer').removeClass('drag-margin-holder');
			$('.demo .box-layer').removeClass('hideWhenDrag');
            var demo = $('.demo');
            var scriptdata = $(demo).find('.script-data').html();
            var scriptbox = $('#myScripts').html();
			
			if (localStorage) {
                //Set the name, age and colour items
                localStorage.setItem('jsitem', scriptdata);
            }
                //Alert the user to upgrade their browser
            else {
               // alert('Local storage not supported. Please get a proper browser');
            }
            $(scriptbox).append(scriptdata);
            $(demo).find('.script-data').remove();
			
			
        }
    };
	return self;
});