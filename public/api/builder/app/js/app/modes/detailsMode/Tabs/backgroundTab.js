define(['modes/detailsMode/elementStylesHelper', 'elementsBehaviorHelper', 'services/eventListener'], function (elementStylesHelper, elementsBehaviorHelper, eventListener) {

    var styles,
        elementToChange;
   

    var self = {
        activate: function (element) {
            elementToChange = element;
          //self.fill();
        self.fill();
           
        },
		
		 fill: function () {

           
            var inputElementOv = $("#details-mode-window-background-image .ov-changer > li")[0];
                    var value = $(inputElementOv).attr('data-overlay');
					
					var inputElementBg = $("#details-mode-window-background-image .ov-changer > li")[0];
                    var value = $(inputElementBg).attr('data-background');
					
			$('.ov-changer > li a').off('click').on( 'click', function (event) {
			classes = elementStylesHelper.getBackgroundImgStyles(elementToChange);
					event.preventDefault(event);
				event.stopPropagation();	
				var el = elementToChange;
					var urlClass = $(this).attr('class');
				var regex = new RegExp(/^ov\-(.+)/);
				function makeRemoveClassHandler(regex) {
				  return function (index, classes) {
					return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
				  }
				}
				el.removeClass(makeRemoveClassHandler(/^ov-/));
				el.addClass(urlClass);


			});		

			$('#ov-remove').off('click').on( 'click', function (event) {
					event.preventDefault(event);
				event.stopPropagation();
				classes = elementStylesHelper.getBackgroundImgStyles(elementToChange);
				var el = elementToChange;
					var urlClass = $(this).attr('class');
				var regex = new RegExp(/^ov\-(.+)/);
				function makeRemoveClassHandler(regex) {
				  return function (index, classes) {
					return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
				  }
				}
				el.removeClass(makeRemoveClassHandler(/^ov-/));
				


			});	
			
			
			
			$('#blocksfixedbg').change(function(){
						
						var el = elementToChange;
					if($(this).is(":checked")) {
						el.addClass('bgfixed');
					} else {
						el.removeClass('bgfixed');
					}
				});
				
				$('#parallaxinit').change(function(){
						
						var el = elementToChange;
					if($(this).is(":checked")) {
						el.attr('data-stellar-background-ratio', '0.5');
						$.stellar('refresh');
					} else {
						el.removeAttr('data-stellar-background-ratio');
						$.stellar('refresh');
					}
				});
				$('#details-mode-window-header .dropdown #bl-pr-bg.dropdown-menu').on('click', function (event) {
					$(this).parent().toggleClass('open');
			});
			
			
            $('#details-mode-window-background-image .bg-changer > li a').off('click').on( 'click', function (event) {
				event.preventDefault(event);
				event.stopPropagation();
				classes = elementStylesHelper.getBackgroundImgStyles(elementToChange);
				console.log(classes);
				var el = elementToChange;
					var urlClass = $(this).attr('class');
				var regex = new RegExp(/^bg\-(.+)/);
				function makeRemoveClassHandler(regex) {
				  return function (index, classes) {
					return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
				  }
				}
				el.removeClass(makeRemoveClassHandler(/^bg-/));
				el.css('background-color', '');
				el.css('background-image', '');
				el.css('background-position', '');
				el.css('background-size', '');
				el.css('background-repeat', '');
				el.css('background-attachment', '');
				el.css('background-origin', '');
				el.css('background-clip', '');
				
				el.removeClass('cover');
				el.removeClass('bgp-tc');
				el.removeClass('bgs-cover');
				el.addClass(urlClass);
			
					
            });   
			
			$('#details-mode-window-background-image #bg-remove').on( 'click', function () {
     
				
				classes = elementStylesHelper.getBackgroundImgStyles(elementToChange);
		
				var el = elementToChange;
					var urlClass = $(this).attr('class');
				var regex = new RegExp(/^bg\-(.+)/);
				function makeRemoveClassHandler(regex) {
				  return function (index, classes) {
					return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
				  }
				}
			
				el.removeClass(makeRemoveClassHandler(/^bg-/));
				el.removeClass('cover');
				el.removeClass('bgp-tc');
				el.removeClass('bgs-cover');
			
					
            });
			$('#-bl-images_bs').on( 'click', 'ul li img' , function () {
									event.preventDefault(event);
										event.stopPropagation();
										var el = elementToChange;
										var bgData = $(this).attr('src');
										el.css( { 'background-image': 'url(' + bgData + ')' } );
										el.addClass('cover');
											
		
								
										var urlClass = $(this).attr('class');
									var regex = new RegExp(/^bgp\-(.+)/);
									function makeRemoveClassHandler(regex) {
									  return function (index, classes) {
										return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
									  }
									}
									console.log(makeRemoveClassHandler(/^bgp-/));
									$(el).removeClass(makeRemoveClassHandler(/^bgp-/));
									var regexBG = new RegExp(/^bg\-(.+)/);
											function makeRemoveClassHandlerBG(regexBG) {
											  return function (index, classes) {
												return classes.split(/\s+/).filter(function (el) {return regexBG.test(el);}).join(' ');
											  }
											}
											el.removeClass(makeRemoveClassHandlerBG(/^bg-/));
									$(el).addClass('bgp-cc')
									})
									
									$('#--bg-remove-image').off( 'click' ).on( 'click', function () {
									var el = elementToChange;
									el.css('background-image', '');
									el.css('color', '');
									el.css('background', '');
										
							} );
			
						
							
				$('#unsplash_images').on( 'click', 'ul li img' , function () {
									event.preventDefault(event);
										event.stopPropagation();
										var el = elementToChange;
										el.css( { 'background-image': 'url(' + this.attributes['big-img'].value + ')' } );
										el.addClass('cover');
											
		
								
										var urlClass = $(this).attr('class');
									var regex = new RegExp(/^bgp\-(.+)/);
									function makeRemoveClassHandler(regex) {
									  return function (index, classes) {
										return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
									  }
									}
									console.log(makeRemoveClassHandler(/^bgp-/));
									$(el).removeClass(makeRemoveClassHandler(/^bgp-/));
									$(el).addClass('bgp-cc')
									
									var regexBG = new RegExp(/^bg\-(.+)/);
											function makeRemoveClassHandlerBG(regexBG) {
											  return function (index, classes) {
												return classes.split(/\s+/).filter(function (el) {return regexBG.test(el);}).join(' ');
											  }
											}
											el.removeClass(makeRemoveClassHandlerBG(/^bg-/));
									$(el).addClass('bgp-cc')
									
									
							})
			
			

        },
    
        
       
      
        reset: function (element) {
           /* var stylesAttr = $(element).attr('style');
            if (typeof stylesAttr !== 'undefined') {
                
                stylesAttr = stylesAttr.replace(/background-image:\s?.*;/g, '');
            
            }
            $(element).attr('style', stylesAttr);
            */
        },
       
        changeBg: function () {
            /*  var inputElement = $("#details-mode-window-background-image .bg-changer > li")[0];
                    var value = $(inputElement).attr('data-background');
			console.log(value);*/
			classes = elementStylesHelper.getBackgroundImgStyles(elementToChange);
			var urlClass = this.attr('class'); 
			console.log(urlClass);
			//var thisbg = $(elementToChange).attr('style').replace( /background-image:\s?.*;/g,  'url('+stylesAttr+');'  );
			 //$(elementToChange).attr('style').replace( /background-image:\s?.*;/g,  'url('+stylesAttr+');'  );
			//attrOfElement = $(elementToChange).css('background-image').replace( /url\(|\)/g );
			//attrOfElement = $(elementToChange).css('background-image');
			//console.log(attrOfElement);
		
		
			elementToChange.removeClass('bg-*');
			elementToChange.addClass(urlClass);
			//var stylesAttr = $(elementToChange).attr('style');
			
			//stylesAttr = stylesAttr.replace( /background-image:\s?.*;/g,  'background-image:url('+urlAttr+');'  );
			
			//stylesAttr = stylesAttr.replace( /background-image:\/(?:\(['|"]?)(.*?)(?:['|"]?\))/g,  'background-image:url('+urlAttr+');'  );
			/*stylesAttr = stylesAttr.replace(/url\(['|"]?(http[^\)|^'|^"]+)['|"]?\)/g, 
			function(fullMatch, fullUrl) {
				var fileName = urlAttr;
				return 'url("' + fileName + '")';
			});
			console.log(stylesAttr);*/
			
			


			//$(stylesAttr).replace( /background\-image\:url\(\'.*?\'\)\;/,  'background-image:url('+urlAttr+');'  );
			//$(stylesAttr).replace( /background\-image\:url\(\'.*?\'\)\;/, '' );
			//console.log(stylesAttr);
			//$(elementToChange).attr('style').replace(/background\-image\:url\(\'.*?\'\)\;/, 'background-image:url('+urlAttr+');' );
			//console.log(style);
			//$(style).replace( /background-image:\/(?:\(['|"]?)(.*?)(?:['|"]?\))/g,  'background-image:url('+urlAttr+');'  );
			
			 /*styles = elementStylesHelper.getBackgroundImgStyles(elementToChange);
			var urlBg = styles.bgImage; //c URL
			
			$('#m-bg-url').text(styles.bgImage);
            var inputElement = $("#details-mode-window-background-image .bg-changer > li")[0];
                    var value = $(inputElement).attr('data-background');*/
			
           
         self.fill();
        },
		
	
		
    };

    return self;
});