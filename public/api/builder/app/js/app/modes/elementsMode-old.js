define(['elementsBehaviorHelper',  '../../../imageService/imageService', 'services/localStorageService',  'elementsCreators/modalCreator', 'services/videoEmbedService', 'services/createMapScript', 'tooltip/tooltip', 'services/eventListener', 'services/editableElements', 'modes/detailsMode/elementsCssManipulation', 'bootstrapColorpicker', 'colorpickerColor' ],
function (elementsBehaviorHelper, imageService, localStorageService,  modalCreator,  videoEmbedService, createMapScript,  tooltip, eventListener,  editableElements, elementsCssManipulation) {

    var self,
	myTimeout,

        elementsTooltipTimeout,
        currentCol,
        currentElement,
		elementWorkWith,
        drag;



    return {
        activate: function (element) {
		self = this;
		elementWorkWith = typeof element === "undefined" ? $('.demo').find('.box-layer') : element;


            self.unbindPreviousMode();
			self.createCloneBtn();
			//self.createFormBtn();
			self.makeImageResizable();
			editableElements.on();
						
            self.makeElementsSortable();
			//self.addTooltipToColumns();
			self.makeElementsDraggableWidgets();
            self.addTooltipToElements();
          // self.addModalEvents();
		  // self.makeElementsTrashable();
		  self.makeUlsortable();
		  createMapScript.startMap();
		  tooltip.activate();
		  //self.addTooltipToLinksAndIcons();

		  editableElements.off();
		  self.elementStyleActivate();
		  //self.textEditorToggle();
		self.runUnsplashApi();
		 //self.createLinkToggle();




        },
        unbindPreviousMode: function () {
            elementsBehaviorHelper.getElementsForEdit($('.demo').find('.box-layer'), 'contentmode').off('click').off('mouseenter');
			$('#elements-mode').addClass('hide');
			$('#virtual-editor-btn').addClass('hide');
			$('#elemets-tool-wrapper').removeClass('hide');
        },   
		
		runUnsplashApi: function(){
							var url = 'https://api.unsplash.com/photos/';
							//var apikey = 'b5eb4078124730c00d30d2178fd09a492bb672f3fb710e0bc253809d673fc980';
							var apikey = imageService;
							var $input = $( '#unsplash_search_input' );
							var $searchButton = $( '#unsplash_search_button' );
							var $unsplashContainer = $( '#unsplash_images ul' );
							var $loadMore = $( '#unsplash_load_more' );
							var $removeBg = $( '#bg-remove-unsplash' );
							var currentPage = 1;
							var searchedValue = '';
							var $unsplashContainerLi = $( '#unsplash_images ul li' );
							
							if( apikey == ''){
								var $message = '<p style="padding:20px 20px; text-align:center;">BETA/ this feature works in beta mode</small> Please insert your unsplash.com  API KEY in to the file: /imageService/imageService.js  ' +
								' <a id="infoSplashBtn"   style="color:#fff; cursor:pointer;">Learn more</a></p>'
								//' <a id="infoSplashBtn" data-toggle="modal" data-target="#myModalSplashInfo"  style="color:#fff">Learn more</a></p>'
								$unsplashContainer.html($message)
								var infoBtn = $('#infoSplashBtn')
								infoBtn.on('click', function(event){
									event.preventDefault(event);
									$('#myModalSplashInfo').modal('show')
								})
							}
							
							else{
			function runUnsplash(){
				
				 			$unsplashContainer.html( ' ' );				
							function readUnsplashApi(){
							var uri = url;
									if ( searchedValue ) {
								uri += 'search?client_id=' + apikey + '&per_page=50&page=' + currentPage + '&query=' + searchedValue;
								} else {
									uri += '?client_id=' + apikey + '&per_page=50&page=' + currentPage;
								}
								$.getJSON( uri, function ( data ) {
									data.forEach( function ( item ) {
										$unsplashContainer.append( '<li class="__w-mas-col col-md-12"><img src="' + item.urls.thumb + '" big-img="' + item.urls.regular + '" ></img><a href="' + item.user.portfolio_url + '" title="' + item.user.name + '" tagret="_blank" class="unsplash-author"> Author: <span class="u-s-profile-user"><img src="' + item.user.profile_image.small + '"/></span>' + item.user.name + '</a></li>' );
									} )
									
								
									
									
								});
							}
							
							$input.on('focus', function(){
								$(this).attr('placeholder', '')
							}).off('focus', function(){
								$(this).attr('placeholder', 'type search tag')
							})
							
							  $searchButton.off( 'click' ).on( 'click', function () {
								$unsplashContainer.html( '' );
								searchedValue = $input.val();
								currentPage = 1;
								readUnsplashApi();

							} );

							$loadMore.off( 'click' ).on( 'click', function () {
								currentPage += 1;
								readUnsplashApi();
							} );
							
							$removeBg.off( 'click' ).on( 'click', function () {
								elementToChange.css('background-image', '');
							} );
							readUnsplashApi();
			
			}
				if ($($unsplashContainerLi).length == 0) {
					runUnsplash();
				}
			}
		},
			createFormBtn: function(){
			
				
					var demoWrapper = $(document).find('.demo')
					var form = $('.demo').find('form.contact-form');
					var formInput = $('#EmailAdmin');
					var btnText = $('#EmailBtnText');	
					
					
				
				
					function addNewFormControl(){

						$(form).off('mouseover').on('mouseenter', function(){ 
							var currentBlock = $(this);	
							var formHiddenInput = $(this).find('input.EmailUs');
								var formBtnText = $(currentBlock).find('button');
							var wTop = $(this).outerHeight();
							var formBtn = $(demoWrapper).find('#formBlockBtn')
							if(formBtn.length > 0 ){
								formBtn.remove();
							}	
							var formBlockBtn = '<span id="formBlockBtn" style=" position:absolute; left:50%; top:30%; margin-left:-20px; z-index:1400"><button data-toggle="tooltip" data-placement="left" 	 data-original-title="Edit admin email" class="btn btn-white btn-fab"  title="Edit admin email"><i class="mdi-communication-email"></i></button></span>'; 
							$(this).append(formBlockBtn);
							//$(formBlockBtn).css('bottom', wTop + 40 + 'px;')
							//console.log('wTop' + wTop + 'px')
							var addFormClick = $(demoWrapper).find('#formBlockBtn .btn');
							$(addFormClick).click( function(event){
							formInput.val(' ');
							btnText.val(' ');
							formInput.val(formHiddenInput.val())
							btnText.val(formBtnText.text())
							console.log(formBtn.text())
								event.stopPropagation();
								event.preventDefault();
								$('#modalFormEdit').modal('show')
								$('#email_id_add').off('click').on('click', function(){
									formHiddenInput.val(formInput.val())
									formBtnText.text(btnText.val());
									localStorageService.save();
									$('#modalFormEdit').modal('hide')
								})
								
							});
							
							
						 });
						
					}

					addNewFormControl();
				
				
			},
		
		createCloneBtn: function(){
			
				$(document).ready(function(){
					var demoWrapper = $(document).find('.demo')
					var block = $(demoWrapper).find('section')
					function addNewBlock(){

						$(block).on('mouseenter', function(){ 
							var currentBlock = $(this);
							var wTop = $(window).scrollTop() + $(this).outerHeight();
							var addBtn = $(demoWrapper).find('#addBlockBtn')
							if(addBtn.length > 0 ){
								addBtn.remove();
							}
							var addBlockBtn = '<span id="addBlockBtn" style="position:absolute; left:auto; right:10px; bottom:10px; z-index:1400"><button class="btn btn-white btn-xs "  title="clone section"><i class="fa fa-copy"></i></button></span>'; 
							$(this).append(addBlockBtn);
							//$(addBlockBtn).css('top', wTop + 50 + 'px;')
							var addBtnClick = $(demoWrapper).find('#addBlockBtn .btn');
							$(addBtnClick).click( function(event){
								event.stopPropagation();
								event.preventDefault();
								
								if($( '.sortableCols' ).data( 'ui-sortable' )){
								$('.sortableCols').sortable("destroy")
								$(currentBlock).clone(true, true).insertAfter(currentBlock);
								self.makeElementsSortable();
								$(addBtn).remove();
								localStorageService.save();
								}
									else{ 	
									$(currentBlock).clone(true, true).insertAfter(currentBlock); 
									$(addBtn).remove();
									localStorageService.save();
								}
							})
						 })
					}

					addNewBlock();
				});
				
			},
		
		
		   makeElementsDraggable: function () {
                $(".sidebar .box-layer").draggable({
				//appendTo: '.appendix',
				appendTo: 'body',
                connectToSortable: '.demo',
                placeholder: '.placeholder2',
                helper: function(){
                var dom = [];
                 
                dom.push("<div style=\"opacity:1;height:100px;width:200px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;background: #ccc;	box-shadow: 5px 5px 10px rgba(50,50,50, .5);-moz-box-shadow: 5px 5px 10px rgba(50,50,50, .5);-webkit-box-shadow: 5px 5px 10px rgba(50,50,50, .5);\">",
                         "</div>");
                 
                return $(dom.join(''));
            },
                handle: '.drag',
				zIndex: '9999',
				tolerance: 'pointer',
                containment: 'demo',
                refreshPositions: true,
				//cursorAt: {left: 100, top: 0},
                scroll: false,
				revert: 'invalid',
                start: function (event, ui) {
			$(this).addClass('hideWhenDrag');
			$('.demo-wrapper').css('overflow', 'visible');
				 $('.sidebar').animate({
                            marginLeft: "0px",
                            opacity: "1"
                        }, 30);
            $('.info-tip').css('display', 'none');
			$(this).data("startingScrollTop",$(this).parent().scrollTop());
			// hide BLOCKs modal
			//$('#m__add-block').modal('hide');
			$('.demo .box-layer').addClass('drag-margin-holder');
        },
                drag: function (event, ui) {
          //ui.helper.width(200);
         // ui.helper.height(150);
		   
		   ui.helper.css({
				'z-index' : '10000',
				'position' : 'absolute',
				'overflow' : 'hidden',
				//'width' : '150px',
				//'height' : '50px',
					 
		  });
		
		   var st = parseInt($(this).data("startingScrollTop"));
      ui.position.top -= $(this).parent().scrollTop() - st;
		   
			
        },
                stop: function (event, ui) {
		$('.demo-wrapper').css('overflow', 'hidden');
			setTimeout(function() { $('.sidebar').animate({
                            marginLeft: "290px",
                            opacity: "1"
                        }, 300);
				}, 500)
			
		
			//$('.demo .ui-draggable').removeClass('ui-draggable');
			$('.demo .box-layer').removeClass('drag-margin-holder');
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
            });
        },

		createLinkToggle: function(){
			$(document).ready( function(){
				var linkAnchorToggle = '<div class=\"panel panel-body\"> <div class=\"togglebutton\"><label>Anchor link <input type=\"checkbox\" id=\"changeAnchor\" name=\"changeAnchor\"><span class=\"toggle\"></span></label></div></div>';
				$('#link-change-modal .modal-body').append(linkAnchorToggle);
			});
			
			

		},
		makeImageResizable: function(){
			
			var img = $('.demo').find('img');
			var imgWrapperOld = $('.demo').find('.img-wrapper');
			$(imgWrapperOld).children().unwrap();
						/*var img = $('.demo').find('img');
						console.log(img);
						var imgWrapper = $(img).parent();
						if ($(imgWrapper).hasClass('img-wrapper-inner')){
							console.log('img-wrapper find');
						}
						else{
							
							$(img).wrap('<div class="img-wrapper-inner"></div>');
						}*/
				
		},

		/* STYLES */
		elementStyleActivate: function () {
		/* var elementToFired = elementsBehaviorHelper.getElementsForEdit(elementWorkWith, 'elementsmode');
		 elementToFired.unbind('click', elementsCssManipulation.start).bind('click', elementToFired, elementsCssManipulation.start); */
		 	var isheaderNavFixed = $('.demo').find('header');
									if(isheaderNavFixed.is('navbar-fixed-top')){
										$('body').addClass('is-navbar-fixed-top');
									}
		 elementsBehaviorHelper.getElementsForEdit(elementWorkWith, 'elementsmode').unbind('click', elementsCssManipulation.start).bind('click', elementsCssManipulation.start);

			$('span.drag i, button.settings-block i, button.remove-block i', elementWorkWith).off('click').removeClass('tie-to-modal');
        //$(elementWorkWith).prepend('<button class="settings-block  btn btn-default btn-material-grey-300 btn-raised btn-sm"><i class="fa fa-cogs"></i></button>');
			 var settBtn = $( elementWorkWith ).find( '.settings-block' );
			if ( settBtn.length == 0 ) {
                $( elementWorkWith ).prepend( '<button class="settings-block  btn btn-default btn-material-grey-300 btn-raised btn-sm"><i class="fa fa-cogs"></i></button>' );
            }
           // $(elementWorkWith).prepend('<div class="btn-group"><button class="dropdown  btn btn-primary btn-sm"><i class="fa fa-cogs"></i></button>');
            $(elementWorkWith).find('.settings-block').off('click').on('click', elementsCssManipulation.start);


        },

		/* end STYLES */


		makeUlsortable: function(){
			var ulNotNav = $('.demo').find('ul:not(.nav.navbar-nav, .social-links)')
				if( $(ulNotNav).parent().is('.ul-sortable-wrapper')){

				}
				else{ 
				//$(ulNotNav).wrap('<div class="ul-sortable-wrapper"></div>');
				//$(ulNotNav).children().children().wrapInner('<span></span>');
				//$('.ul-sortable-wrapper').children().children().unwrap();
				//$('.ul-sortable-wrapper').children().unwrap();
				}

			var ulElemement = $('.demo').find('ul');
			//ulElemement.sortable('option','sort', null);
			ulElemement.sortable({
				start: function (event, ui) {

						if (event.ctrlKey){

							$clone = ui.item.clone().insertBefore(ui.item);
							$clone.css({
								position:"",
								opacity: "",
								zIndex: "",
								width: "",
								height: "",
								cursor: "",
								});
						}
						$('body').css('cursor', '');
						//self.addTooltipToElements();
						self.elementStyleActivate();
					},
			});
		},
		
		addPlaceholder: function(){
			var target = $('.demo').find('.sortableCols').children();
			var placeholder = '<span class="plchld" style="display:block; width:100%; height:10px; background:blue;"></span>'; $(target).off('mouseover').on('mouseover', function(event){ $(placeholder).insertBefore($(this))}).on('mouseleave', function(){$('.demo').find('.plchld').remove()});
		
		},
        makeElementsSortable: function () {
			var isReceive = false;
            //$(".demo").find("div[class*='col-']").css('min-height', '20px');
            $(".demo").find("div[class*='col-']").addClass('sortableCols');

            var findColRow = $(".demo").find(".row .sortableCols .row:not(.row .sortableCols .row .sortableCols .row)");
            $(findColRow).parent().removeClass("sortableCols")

		/*	if ($(findColChildren).is('.row')){
				$(this).parent().removeClass("sortableCols");
			}*/

            $(".demo").find("section>.left").addClass('sortableCols');
            $(".demo").find("section>.right").addClass('sortableCols');

			 var ulElemementSort = $( '.demo' ).find( '.sortableCols' );

                ulElemementSort.sortable({
                    connectWith: ".sortableCols",
                    cursor: "move",
                    opacity: .65,
                    placeholder: 'placeholder2',
					helper: "clone",
					
				
					 /* helper: function(){
                var dom = [];

                dom.push("<div style=\"opacity:1;height:50px;width:100px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;background: #ccc;	box-shadow: 5px 5px 10px rgba(50,50,50, .5);-moz-box-shadow: 5px 5px 10px rgba(50,50,50, .5);-webkit-box-shadow: 5px 5px 10px rgba(50,50,50, .5);\">",
                         "</div>");

                return $(dom.join(''));
            },*/
			
					sort: function( event, ui ) {
		
					},

                    start: function (event, ui) {
					/* clone ctrl+shift+drag */
					if (event.ctrlKey){
						$clone = ui.item.clone(true, true).insertBefore(ui.item);
						$clone.css({
								position:"",
								opacity: "",
								zIndex: "",
								width: "",
								height: "",
								cursor: "",
								display: ""
								});
						$('body').css('cursor', '');
						self.elementStyleActivate();
					}
						
						
					$(".demo").find('.sortableCols').addClass('drag-active');
					$('.demo-wrapper').css('overflow', 'visible');
					var currentElement;

							
							
				
						placeholderHeight = ui.helper.outerHeight() ;
						ui.placeholder.css({visibility: 'visible'})
						$('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
			
					ui.item.unbind("click");
					
					$('.demo').addClass('is-sortable');
						sorting = true;
                        drag = true;
					
					var thisHeight = $(ui.item).height();
					var thisWidth = $(ui.item).width();
					ui.placeholder.css({visibility: 'visible', border : '1px solid yellow'});
					ui.placeholder.height(placeholderHeight);
				//ui.placeholder.css({baclground: 'blue', height: '10px'});
                        $(".demo").find('.sortableCols').children().off('mouseenter');
                        $("#element-mode-tooltip").hide();
                        $("#element-mode-element-manipulation-tooltip").hide();
				
                    },
					over: function(event, ui) {
						
						ui.placeholder.css({visibility: 'visible',  background: 'blue', height: '5px'});
						//ui.placeholder.css('min-width', '100%');
						
					},
					change: function(event, ui) {
							ui.placeholder.css({baclground: 'blue', height: '10px'});
							ui.placeholder.stop().height(0).animate({
								height: ui.item.height()// + 15
							}, 300);
							
							placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));
							
							$(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight ).animate({
								height: 0
							}, 300, function() {
								$(this).remove();
								placeholderHeight = ui.item.height();
								$('<div class="slide-placeholder-animator" data-height="' + placeholderHeight / 2 + '"></div>').insertAfter(ui.placeholder);
							});
							
							
						},
        
					update: function(event, ui) {
						sorting: false
						//
					
					},
					receive: function(event, ui) {
						var sourceList = ui.sender;
						var targetList = $(this);
						function isEmpty( el ){
							  return !$.trim(el.html())
						  }
						
						if ($(targetList).is('.hovered')){
								$(targetList).removeClass('hovered')
						}	
						 if (isEmpty($(sourceList))) {
						  console.log('empty')
							  $(sourceList).addClass('hovered')
						  }
					},
                    stop: function (event, ui) {
					ui.placeholder.stop().height(0).animate({
								height: ui.item.height()// + 15
							}, 300);
							
							placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));
							
							$(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight + 15).animate({
								height: 0
							}, 300, function() {
								$(this).remove();
								placeholderHeight = ui.item.height();
								$('<div class="slide-placeholder-animator" data-height="' + placeholderHeight / 2 + '"></div>').insertAfter(ui.placeholder);
							});
							
						$(".slide-placeholder-animator").remove();
						//$(".placeholder2").remove();
						
                        drag = false;
						//sorting = false;
							//handle.bind('click', self.elementStyleActivate());
                       /* self.addTooltipToElements();
						self.elementStyleActivate();*/
							//var handle = $(ui.item);
							$(".demo").find('.sortableCols').removeClass('drag-active');
					
					$('.demo-wrapper').css('overflow', 'hidden');
								
						self.addTooltipToElements();
						self.elementStyleActivate();
						$('.demo').removeClass('is-sortable');
					
					
                    }
					
						  
                });
				
						



        },

textEditorToggle: function(){
			/*$('#tooltip-manipulation-button-editor').on('click', function(){
				$('.sortableCols').sortable('disable');
			});
			editableElements.on();*/
			/*$('a').on('click', function(event){
				event.preventDefault();
				event.stopPropagation();

			});*/
			
				
			
			$('.blocks-mode-tools').removeClass('hide');
			var editToggle = $('#btn-edit-mode');
			var dragToggle = $('#btn-drag-mode');
			var sort = $('.demo').find('.sortableCols');
			var ulElemement = $('.demo').find('ul');
				
			
			if($( sort ).data( 'ui-sortable' ) || $(ulElemement ).data( 'ui-sortable' )){
				
				editToggle.off('click').on('click', function(){
					toggleEditMode();
					$('#sidebar_blocks_tab_btn').trigger('click');
					
					});
			}
			
			function toggleEditMode(){
			
		
			if($( sort ).data( 'ui-sortable' ) || $(ulElemement ).data( 'ui-sortable' )){
					$(sort).sortable('destroy');
					ulElemement.sortable('destroy');
					editableElements.on();
					
					$(editToggle).addClass('active');
					$(dragToggle).removeClass('active');
					$(dragToggle).off('click').on('click', function () {
							editableElements.off();
							self.makeElementsSortable();
							self.makeUlsortable();
							$(editToggle).removeClass('active');
							$(dragToggle).addClass('active');
							//$(elComponentsPanel).removeClass('hide');
							
					});
					$('#widgets_bs_trigger').bind('click', function () {
							editableElements.off();
							self.makeElementsSortable();
							self.makeUlsortable();
							$(editToggle).removeClass('active');
							$(dragToggle).addClass('active');
							//$(elComponentsPanel).removeClass('hide');
							
					});
				}
					
			}
		
						
			
},
		makeElementsDraggableWidgets: function(){
			$('.md-widget-elements').on('mousedown', function(event) { event.preventDefault() });
			self = this;
			 $(".md-widget-elements .md-widget-wrapper-drag:not(.map)").draggable({
				appendTo: '.appendix',
				//appendTo: 'body',
                connectToSortable: '.sortableCols',
               //placeholder: 'placeholder2',
			    placeholder: 'test-placeholder',
			    //placeholder:'.ui-sortable-placeholder',
                helper: function(){
                var dom = [];
				  dom.push( "<div class=\"test-placeholder\" style=\"opacity:1;height:60px; border:1px solid #0c0c0c; width:60px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;background: #2b2b2b;	box-shadow: 5px 5px 10px rgba(50,50,50, .5);-moz-box-shadow: 5px 5px 10px rgba(50,50,50, .5);-webkit-box-shadow: 5px 5px 10px rgba(50,50,50, .5); display:block\">",
											 "</div>" );

                return $(dom.join(''));
            },
                //handle: '.md-widget-wrapper-drag',
				zIndex: '9999',
				//tolerance: 'pointer',
                //containment: 'demo',
                //containment: false,
				//	refreshPositions: true,
				//cursorAt: {left: 100, top: 0},
                 scroll: true,
                revert: 'invalid',
				//delay: 40,
				start: function (event, ui) {
					//ui.placeholder.height(ui.item.children().height());
					//$('.sidebar-toggle').trigger('click')
					 $('.sidebar').animate({
                            marginLeft: "0px",
                            opacity: "1"
                        }, 5);
					$(".demo").find('.sortableCols').addClass('drag-active');
					
					$('.demo-wrapper').css('overflow', 'visible');
				 
						 $(ui.helper).css("left", event.clientX - $(ui.helper).offset().left - 240);
						$(ui.helper).css("top", event.clientY - $(ui.helper).offset().top);
						
						
					
				},

                drag:  function (event, ui) {
				$('.demo').addClass('is-sortable');
					var sortPlacehold = $('.demo').find('.placeholder2');
					sortPlacehold.css('width' , '100%')
					/*$('.sidebar').animate({
                            marginLeft: "0px",
                            opacity: "1"
                        }, 20);*/
				},
			/*	over: function() {
				   $('.test-placeholder').stop().animate({
					   height: 0,
					   width: '100%'
				   }, 400);
				},
				change: function() {
				   $('.test-placeholder').stop().animate({
					   height: 50
				   }, 400);
				},*/
                stop: function (event, ui) {
				setTimeout(function() { $('.sidebar').animate({
                            marginLeft: "290px",
                            opacity: "1"
                        }, 300);
				}, 500)
				$(".demo").find('.sortableCols').removeClass('drag-active');
				$('.demo').removeClass('is-sortable');
				$('.test-placeholder').css('display', 'none');
					$('.demo .drag-handle').remove();
					$('.demo').find('.row-flex').removeClass('row-flex');
					$('.demo .md-element-layer.hide').removeClass('hide').addClass('ui-draggable');
					$('.demo .md-element-layer').unwrap();
					tooltip.activate();
				var thisDraggable = $('.demo').find('.ui-draggable')
				$(thisDraggable).addClass('editable').attr('contenteditable', 'true').attr('data-medium-element', 'true').removeClass('ui-draggable');
					 currentVideo = $('.demo').find('.embed-video-layer');
					 if (currentVideo.length == 1){
						$('.demo .text-micro').remove();
						 $(currentVideo).attr('src', 'https://youtu.be/l3pUdCXoUdU');
						 var videoSrc = $(currentVideo).attr('src');
						  $('#video-url-data').val(videoSrc);
							$('#video-change-modal').find('textarea').val('');
							$('#video-change-modal').modal('show');
							 $('#save-video-url').off('click').on('click', function () {

                    var newSrc;

                    if ($('#video-change-modal').find('li.active').find('a').attr('href') == '#showVideoHtml') {

                        var textAreaValue = $('#video-change-modal').find('textarea').val();

                        if (textAreaValue != '') {
                            $(currentVideo).replaceWith(textAreaValue);
                            newSrc = $(currentVideo).attr('src');
                        }
                    }
                    else {
                        newSrc = $('#video-url-data').val();
                    }

                    if (newSrc != '') {
                        var finalSrc = videoEmbedService.convertMedia(newSrc);
                        $(currentVideo).attr('src', finalSrc);
                    }

                    if (videoSrc !== finalSrc) {
                        localStorageService.save();
                    }

                    $('#video-change-modal').modal('hide');
                });

					 }
					  	else{
							$('.demo .embed-video-layer').removeClass('embed-video-layer');
						}
					$('.demo .embed-video-layer').removeClass('embed-video-layer');

					currentImg = $('.demo').find('img.md-element-layer');
					console.log(currentImg.length);
					if (currentImg.length == 1){

						oldImgSrc = $(currentImg).attr('src');
						$('#img-change-modal').modal('show');
						$('#img-url-data').val(oldImgSrc);
						$('#img-change-modal').find(".chooseImage").removeClass('active');
						$('#img-change-modal').find(".chooseImage[src='" + oldImgSrc.substring(oldImgSrc.indexOf('images/')) + "']").addClass('active');
						$('#img-change-modal').find('.chooseImage').off('click').on('click',
							function () { $('#img-change-modal').find('.chooseImage').removeClass('active');
										$(this).addClass('active');
										});

					$('#save-img-url').off('click').on('click',
						function (event) {
								event.preventDefault(event);
								event.stopPropagation();

								var activeTabId = $('#img-change-modal').find('li.active>a').attr('href');

								var newImgSrc = '';

								if (activeTabId == '#showImgUrl') {
									newImgSrc = $('#img-url-data').val();
								}
								else {
									var choosenImage = $('#img-change-modal').find('.chooseImage.active');

									if (choosenImage.length > 0) {
										newImgSrc = $(choosenImage).attr('src');
									}
									else {
										newImgSrc = oldImgSrc;
									}
								}

								if (oldImgSrc !== newImgSrc) {
									$(currentImg).attr('src', newImgSrc);
									localStorageService.save();
								}

								$('#img-change-modal').modal('hide');

								});

						}

						else{
							$('.demo .md-element-layer').removeClass('md-element-layer');
						}
					$('.demo .md-element-layer').removeClass('md-element-layer');
					$('.demo .text-micro').remove();
					self.addTooltipToElements();
					self.elementStyleActivate();
					//self.createFormBtn();
				},
            });
			//.disableSelection();
		},







	/*makeElementsTrashable: function(){
			$('#md-trash').droppable({
					accept: ':not(.md-widget-wrapper-drag)',
					activeClass: "md-hightlight",
					hoverClass: "md-hightlight-hover",
					tolerance: 'touch',
					drop: function (event, ui) {
							 $(this).addClass( 'md-hightlight' );

						},
					over: function(event, ui) {
						ui.draggable.remove();
					},
					out: function(event, ui) {
						ui.draggable.mouseup(function () {
							var top = ui.draggable.data('orgTop');
							var left = ui.draggable.data('orgLeft');
							ui.position = { top: top, left: left };
						});
					},
				});
			},
		*/

        addTooltipToColumns: function () {
            $("#element-mode-tooltip").off('mouseenter').on('mouseenter', function () {
			clearTimeout(myTimeout);
			}).off('mouseleave').on('mouseleave', function () {
				$('.demo').find('.sortableCols').removeClass('mode-elements-column-hover2');
				$("#element-mode-tooltip").hide();
			});



            $('.demo').find('.sortableCols').off('mouseenter').on('mouseenter', function () {
				
			
				$("#element-manipulation-tooltip-right").css('opacity', '1');
				$("#element-manipulation-tooltip-left").css('opacity', '1');
                $('.demo').find('.sortableCols').removeClass('mode-elements-column-hover2');
				$('.demo').find('.sortableChildren').removeClass('sortableChildren');
				$('.demo').find('.row.hoveredSortable').removeClass('hoveredSortable');
                $(this).addClass('mode-elements-column-hover2');
				var thisCols = $('.demo').find('.sortableCols');

				var thisColsFindRow = $('.sortableCols').children();

				if ( $(thisColsFindRow).is('.row')){
					$(thisColsFindRow).removeClass('sortableCols');
					$(thisColsFindRow).removeClass('mode-elements-column-hover2');
				}

				/*$(thisColsParent).removeClass('sortableCols');
				$(thisColsParent).removeClass('mode-elements-column-hover');
				$(thisColsParent).removeClass(' sortableChildren');*/

				//check if this cols inside col>row => remove tooltip
				/*if (thisColsParent.lenght > 0){
				console.log(thisColsParent);
					$(thisColsParent).removeClass('mode-elements-column-hover');
				}*/
				var thisColNew = $('.demo').find('.mode-elements-column-hover2');
				$(thisColNew).parent().children().addClass('sortableChildren');

				if ( $(thisColNew).is('.row .sortableChildren:first-child')) {
			
					$("#element-manipulation-tooltip-left").css('opacity', '0');
				}
				else{
					$("#element-manipulation-tooltip-left").css('opacity', '1');
				}
				if ( $(thisColNew).is('.row .sortableChildren:last-child')) {
				
					$("#element-manipulation-tooltip-right").css('opacity', '0');
				}
				else{
					$("#element-manipulation-tooltip-right").css('opacity', '1');
				}
				
				if ( $(thisColNew).is(".row .sortableChildren .row:not(.row .sortableChildren .row .sortableChildren )")){
					$("#element-manipulation-tooltip-right").css('opacity', '0');
					$("#element-manipulation-tooltip-left").css('opacity', '0');
				}
           

				$("#element-mode-tooltip").show();


				var thisColNext = $(thisColNew).next();
				var thisColPrev = $(thisColNew).prev();

					$('#element-manipulation-tooltip-right').unbind('click').bind('click', function(){

						$(thisColNew).insertAfter($(thisColNext));
						$('.demo').find('.sortableChildren').removeClass('sortableChildren');
					});
					$('#element-manipulation-tooltip-left').unbind('click').bind('click', function(){

						$(thisColNew).insertBefore($(thisColPrev));
						$('.demo').find('.sortableChildren').removeClass('sortableChildren');
					});


                if (!drag) {
                    currentCol = this;
                    if (typeof myTimeout !== 'undefined') {
                        clearTimeout(myTimeout);
                    }
                    var elWidth = $(this).outerWidth();
                    var elHeight = $(this).outerHeight();
                    var offset = $(this).offset();
                    $('#element-mode-tooltip').show();
                    $('#element-mode-tooltip').css({
                        //'width': elWidth,
                        'top': offset.top - 28,
                        'left': offset.left - 7
                    });
					/*$('#element-manipulation-tooltip-left').css('left', offset.left);
					$('#element-manipulation-tooltip-right').css('margin-left', offset.left + elWidth);*/
                }

            }).off('mouseleave').on('mouseleave', self.removeTooltip);

          // hide add elements button
		   /*$('#element-mode-add-element').off('click').on('click', function () {
                $('#add-element').modal('show');
                $("#element-mode-tooltip").hide();
            });*/
        },
        addModalEvents: function () {


			/*$('#add-element').find('.box.box-element').off('click').on('click', function () {
                $('#add-element').find('.box.box-element').removeClass('active');
                $(this).addClass('active');
            });

            $('#elements-mode-add-element-save').off('click').on('click', function () {
                var elementToAdd = $('#add-element').find('.box-element.active .view').html();
                $(currentCol).prepend(elementToAdd);
                self.addTooltipToElements();
                $('#add-element').modal('hide');
            });*/
        },
        addTooltipToElements: function () {
			
            $("#element-mode-element-manipulation-tooltip").off('mouseenter').on('mouseenter', function () {
			clearTimeout(elementsTooltipTimeout); }).off('mouseleave').on('mouseleave', function () {
			$("#element-mode-element-manipulation-tooltip").hide();
			});

			//$(".demo").find('ul.navbar-nav li, .panel, .panel-body, .card, .card-block').children().off('mouseenter').on('mouseenter', function (event) {
			
			

			var elementsHover =  $(".demo").find('.sortableCols:not(.row), .navbar-brand, .navbar-nav li, ul').children().not('input, .sortableCols, strong, b, span, .sortableCols>*>strong, .sortableCols>*>span, .sortableCols>*>b, ul, .form-group, .form-group button'),
			elementsHover2 = $(".demo").find('.sortableCols>div:not(.well) '),
			elementsHover3 = $(".demo").find('.sortableCols li, .sortableCols li a');
			
		
		
			
            $(elementsHover, elementsHover2).off('mouseenter').on('mouseenter', function (event) {
                //currentElement = this;
				event.stopPropagation(event);
				event.preventDefault(event);
				 hoverElement = $(event.target);
			if ($(hoverElement).is('.navbar-nav li a') ){
				currentElement = $(this).parent();
				console.log(currentElement)
			}
			if ($(hoverElement).is('input') ){
				currentElement = $(this).closest('form');
				console.log(currentElement)
			}
		
			
			else{currentElement = $(event.target);}

               
                
				
				var resizeDetect = $(currentElement).parent().hasClass('ui-wrapper');
				if(resizeDetect.length > 1 && $(currentElement).is('img')){
					$(currentElement).resizable('destroy');
					$(currentElement).parent().draggable('destroy');
				}
			

				/* try closest dom traversing */
					(function (ELEMENT, PREFIX) {
						ELEMENT.matches = ELEMENT.matches || ELEMENT[PREFIX + 'MatchesSelector'] || function (selector) {
							var
							element = this,
							elements = (element.document || element.ownerDocument).querySelectorAll(selector),
							index = 0;

							while (elements[index] && elements[index] !== element) ++index;

							return elements[index] ? true : false;
						};

						ELEMENT.closest = ELEMENT.closest || function (selector) {
							var node = this;

							while (node) {
								if (node.matches(selector)) return node;
								else node = node.parentElement;
							}

							return null;
						};
					})(
						Element.prototype,
						(this.getComputedStyle && [].join.call(getComputedStyle(document.documentElement, '')).match(/-(moz|ms|webkit)-/) || [])[1]
					);


					// var elems = $(event.target.parentNode).parentsUntil('.demo');
					 var elems = $(currentElement);

					 //var newElemes = elems.closest('section');
					 console.log(elems);
					  nodenames = [];

							$(elems).each( function(){
							var text = this.nodeName;
								/*if (this.id) {
									text += '#' + this.id;
								}

								if (this.className && this.className.replace(/[ ]/g, '')) {
									text += '.' + this.className.replace(/[ ]{1,}/g, '.')
								}*/
								//nodenames.push(text);
								//console.log(nodenames.reverse().join(' > '));
								$('#md-tagNameTooltip').text('<'+text+'>');
							});
								// do something with the anchor


				/* try closest dom traversing */
				//$('.demo').find('.draggable-span-tooltip').remove();
				//$('.demo').find('.manipulation-sortable-widget').children().unwrap();

				$('.demo').find('.hoveredSortable').removeClass('hoveredSortable');
                $(currentElement).addClass('hoveredSortable');

               // $(currentElement).wrap('<div class="manipulation-sortable-widget"></div>');




                if (typeof elementsTooltipTimeout !== 'undefined') {
                    clearTimeout(elementsTooltipTimeout);
                }

                var elWidth = $(this).outerWidth();
                var elHeight = $(this).outerHeight();
                var offset = $(this).offset();
                var zIndex = $(this).zIndex();

                /*$('#element-mode-element-manipulation-tooltip').css({
                    'top': offset.top  + 20 - ($(this).outerHeight()),
                    'left': offset.left - 25 + ($(this).outerWidth())
                });*/

				if ($(this).is('.navbar li a')){
						$('#element-mode-element-manipulation-tooltip').css({
						//'top': offset.top + ($(this).outerHeight() /3),
						'width': elWidth,
						'top': offset.top - 20,
						'left': offset.left  ,
						//'width': ($(this).outerWidth()),
						//'height': ($(this).outerHeight()),
						'z-index':($(this).zIndex() + 1),
					});
				}
				else{
					$('#element-mode-element-manipulation-tooltip').css({
						//'top': offset.top + ($(this).outerHeight() /3),
						'width': elWidth,
						'top': offset.top - 27,
						'left': offset.left  ,
						//'width': ($(this).outerWidth()),
						//'height': ($(this).outerHeight()),
						'z-index':($(this).zIndex() + 1),
					});
				}
             
				/*if($(currentElement).is('img, img.card-img-top')){
					//$('#element-mode-element-manipulation-edit').addClass('hide');
					//$('#element-mode-element-manipulation-resize').removeClass('hide');
				}
				
				else{
					//$('#element-mode-element-manipulation-edit').removeClass('hide');
						}*/
						
						//('#element-mode-element-manipulation-resize').addClass('hide');
			
				$('#element-mode-element-manipulation-edit').off('click').on('click', function(){
				//$('.sortableCols').sortable("destroy")
				if ($(currentElement).is('.navbar-nav li a') ){
				var parent = $(currentElement).parent()
				$(parent).clone(true).insertAfter(parent);
				
			}
			else{ 	
				$(currentElement).clone(true).insertAfter(currentElement);
			}
							
								//$('.sortableCols').sortable("refresh")
								//self.makeElementsSortable();
								//localStorageService.save();
					
				})
				
	/*if ($(currentElement).is('form')){
				$('#element-mode-element-manipulation-tooltip').removeClass('hide');
			}
*/
			if ($(currentElement).is('img, iframe, form')){
				$('#element-mode-element-manipulation-props').removeClass('hide');
			}
			
			else{
				$('#element-mode-element-manipulation-props').addClass('hide');
			}
			   $('#element-mode-element-manipulation-tooltip').show();
            }).off('mouseleave').on('mouseleave', self.removeElementsTooltip);

		/*	$('#element-mode-element-manipulation-edit').off('click').on('click', function () {
			console.log('edit click');
				$('.sortableCols').sortable('disable');
				editableElements.on();
				var ulElemement = $('.demo').find('ul');
			ulElemement.sortable('disable');
				$(currentElement).focus();
			});
*/

			$('#element-mode-element-manipulation-resize').off('click').on('click', function () {
			
				
			$('.sortableCols').sortable('destroy');
			$(currentElement).wrap('<div class="img-wrapper-inner"></div>');
			$('.img-wrapper-inner').prepend('<button id="btn-save-resizable" class="btn btn-success btn-xs"><i class="fa fa-edit"> 	SAVE</i></button>');
				$('img-wrapper-inner').draggable({
					containment: 'img-wrapper'
				});
				//$('.img-wrapper-inner').attr('style', '');
				$(currentElement).resizable();
				$('.img-wrapper-inner').delegate( '#btn-save-resizable', 'click', function () {
					console.log('clicked');
							//var newWrapperStyles = $('.img-wrapper-inner').find('.ui-wrapper').attr('style');
							//console.log(newWrapperStyles);
							//	$('.img-wrapper-inner').attr('style', newWrapperStyles);
							$(currentElement).resizable('destroy');
							
							
							$(currentElement).removeClass('img-responsive');
							$(this).remove();
							$(currentElement).unwrap('<div class="img-wrapper-inner"></div>');
							self.makeElementsSortable();
							self.makeUlsortable();
							
					
				});
			});
			
		
					
					
			var editableTrigger = $('.demo').find('p, h1, h2, h3, h4, h5, h6, li a, ul li, .btn, a, button, bloquote, address');
			var elComponentsPanel = $(document).find('#bl-widgets-components');
			
			var ulElemement = $('.demo').find('ul');
			
			$(editableTrigger).off('dblclick').on('dblclick', function () {
				if($( '.sortableCols' ).data( 'ui-sortable' ) || ulElemement.data( 'ui-sortable' )){
				$('.sortableCols').sortable('destroy');
				ulElemement.sortable('destroy');
			}
					editableElements.on();
					$(elComponentsPanel).addClass('hide');
					
					
					$(currentElement).focus();
					$(currentElement).addClass( 'highlighted' );
					window.setTimeout(function() {
						$(currentElement).removeClass('highlighted');
					}, 300);
					
					
					$('#btn-text-editor-activate').addClass('active');
					$('#btn-drag-activate').removeClass('active').off('click').on('click', function () {
							editableElements.off();
							self.makeElementsSortable();
							self.makeUlsortable();
							$('#btn-text-editor-activate').removeClass('active');
							$(this).addClass('active');
							$(elComponentsPanel).removeClass('hide');
					
							editableElements.off();
							self.makeElementsSortable();
							self.makeUlsortable();
							$('#btn-text-editor-activate').removeClass('active');
							$(elComponentsPanel).removeClass('hide');
							
					});
						
				

			});	
					$('#btn-text-editor-activate:not(.active)').off('click').on('click', function () {
				if($( '.sortableCols' ).data( 'ui-sortable' ) || ulElemement.data( 'ui-sortable' )){
				$('.sortableCols').sortable('destroy');
				ulElemement.sortable('destroy');
			}
					editableElements.on();
					$(elComponentsPanel).addClass('hide');
					
					$(editableTrigger).addClass( 'highlighted' );
					window.setTimeout(function() {
						$(editableTrigger).removeClass('highlighted');
					}, 300);
					
					
					$(this).addClass('active');
					$('#btn-drag-activate').removeClass('active').off('click').on('click', function () {
							editableElements.off();
							self.makeElementsSortable();
							self.makeUlsortable();
							$('#btn-text-editor-activate').removeClass('active');
							$(this).addClass('active');
							$(elComponentsPanel).removeClass('hide');
					
							editableElements.off();
							self.makeElementsSortable();
							self.makeUlsortable();
							$('#btn-text-editor-activate').removeClass('active');
							$(elComponentsPanel).removeClass('hide');
							
					});
						
				

			});	
			
			$('#btn-drag-activate:not(.active)').off('click').on('click', function () {
				
				$('#btn-text-editor-activate').addClass('active');
				editableElements.off();
				self.makeElementsSortable();
				self.makeUlsortable();
				$('#btn-text-editor-activate').removeClass('active');
				$(this).addClass('active');
				$(elComponentsPanel).removeClass('hide');
				editableElements.off();
				self.makeElementsSortable();
				self.makeUlsortable();
				$('#btn-text-editor-activate').removeClass('active');
				$(elComponentsPanel).removeClass('hide');
			});	
			
			/*old editable with button trigger */
			/*$('#element-mode-element-manipulation-edit').off('click').on('click', function () {
				
				
					$('.sortableCols').sortable('destroy');
					editableElements.on();
					
					var ulElemement = $('.demo').find('ul');
					ulElemement.sortable('destroy');
					$(currentElement).focus();
					$(currentElement).addClass( 'highlighted' );
					window.setTimeout(function() {
						$(currentElement).removeClass('highlighted');
					}, 200);
					$(this).addClass('hide');
					$('#btn-save-editable').removeClass('hide').off('click').on('click', function () {
							editableElements.off();
							self.makeElementsSortable();
							self.makeUlsortable();
							$('#btn-save-editable').addClass('hide');
							$('#element-mode-element-manipulation-edit').removeClass('hide');
					});
				

			});*/


			//$('#element-mode-element-manipulation-props').off('click').on('click', function (event) {
		/*	$(currentElement).off('click').on('click', function (event) {
				$(this).unbind('mouseleave mouseenter');
				elementsBehaviorHelper.getElementsForEdit(elementWorkWith, 'elementsmode');
				elementsCssManipulation.start();
			//console.log('trigger el click')
				
			})*/


			$('#element-mode-element-manipulation-props').off('click').on('click', function () {

			if ($(currentElement).is('form.contact-form')){
			
				var demoWrapper = $(document).find('.demo')	
					var form = $(this),
					formInput = $('#EmailAdmin'),
					btnText = $('#EmailBtnText'),
					formBtnText = $(currentElement).find('button');
					
							var formHiddenInput = $(currentElement).find('input.EmailUs');
								
						
							
							formInput.val(' ');
							btnText.val(' ');
							formInput.val(formHiddenInput.val())
							btnText.val(formBtnText.text())
							
								event.stopPropagation();
								event.preventDefault();
								$('#video-change-modal').modal('hide');
								$('#modalFormEdit').modal('show');
								
								$('#email_id_add').off('click').on('click', function(){
									formHiddenInput.val(formInput.val())
									formBtnText.text(btnText.val());
									localStorageService.save();
									$('#modalFormEdit').modal('hide')
								})
								
							
			}

			var currentVideo = $(currentElement).find('iframe');
			//var currentVideo = $(currentElement);
			//if (currentVideo.length > 0 || $(currentElement).is('iframe')){
			//if ($(currentElement).is('iframe')){
			if ($(currentElement).is('iframe')){

				 var videoSrc = $(currentElement).attr('src');
							$('#video-url-data').val(' ');
						  $('#video-url-data').val(videoSrc);
							//$('#video-change-modal').find('textarea').val(' ');
							
							$('#video-change-modal').modal('show');
							 $('#save-video-url').off('click').on('click', function () {

                    var newSrc;

                    if ($('#video-change-modal').find('li.active').find('a').attr('href') == '#showVideoHtml') {

                        var textAreaValue = $('#video-change-modal').find('textarea').val();

                        if (textAreaValue != '') {
                            $(currentElement).replaceWith(textAreaValue);
                            newSrc = $(currentVideo).attr('src');
                        }
                    }
                    else {
                        newSrc = $('#video-url-data').val();
                    }

                    if (newSrc != '') {
                        var finalSrc = videoEmbedService.convertMedia(newSrc);
                        $(currentElement).attr('src', finalSrc);
                    }

                    if (videoSrc !== finalSrc) {
                        localStorageService.save();
                    }

                    $('#video-change-modal').modal('hide');
				});
			}
			else{
				$('#video-change-modal').modal('hide');
			}
			if ($(currentElement).is('img')){

					$('#video-change-modal').modal('hide');
					oldImgSrc = $(currentElement).attr('src');
						$('#img-change-modal').modal('show');
						$('#img-url-data').val(oldImgSrc);
						$('#img-change-modal').find(".chooseImage").removeClass('active');
						$('#img-change-modal').find(".chooseImage[src='" + oldImgSrc.substring(oldImgSrc.indexOf('images/')) + "']").addClass('active');
						$('#img-change-modal').find('.chooseImage').off('click').on('click',
							function () { $('#img-change-modal').find('.chooseImage').removeClass('active');
										$(this).addClass('active');
										});

					$('#save-img-url').off('click').on('click',
						function (event) {
								event.preventDefault(event);
								event.stopPropagation();

								var activeTabId = $('#img-change-modal').find('li.active>a').attr('href');
								
								var newImgSrc = '';

								if (activeTabId == '#showImgUrl') {
									newImgSrc = $('#img-url-data').val();
								}
								else {
									var choosenImage = $('#img-change-modal').find('.chooseImage.active');

									if (choosenImage.length > 0) {
										newImgSrc = $(choosenImage).attr('src');
									}
									else {
										newImgSrc = oldImgSrc;
									}
								}

								if (oldImgSrc !== newImgSrc) {
									$(currentElement).attr('src', newImgSrc);
									localStorageService.save();
									
								}

								$('#img-change-modal').modal('hide');

							});

						}
			//createMapScript.initMap();
				//check if is it map
				if ($(currentElement).hasClass('map-layer')){
					$('#gMapLoader').modal('show');
					

					$(currentElement).css({
						height: '100vh',
						position: 'fixed',
						background: '#ddd',
						top: '0',
						right: 'auto',
						left: '50%',
						zIndex: '10000',
						width: '50%',

					});

					function recreateMapInit(){
							var currentMap = $('.demo').find('.map-layer');
					  var curMapId = currentMap.children().attr('id');


					//  currentMap.children().attr('id', newMapId);
					  var mapHeightInput = $('#mapHeightInput');

					  var mapHeight = currentMap.children().attr('data-map-height');
					  currentMap.children().css({
						height: mapHeight,

					});
					  $(mapHeightInput).on('change', function(){
						var mapHeightVal = $('#mapHeightInput').val();
						$(currentMap).children().attr('data-map-height', mapHeightVal);
						console.log(mapHeightVal);
						$(currentMap).css({
								height: '100vh',
								background: '#ddd',
							});
							$(currentMap).children().css({
								height: mapHeightVal + 'px',
							});
					  });
					  currentMap.css({
						height: '100vh',
						position: 'fixed',
						top: '0',
						right: 'auto',
						left: '50%',
						zIndex: '10000',
						width: '50%',

					});

					 //this function append height of the map to #userstyles

					  var newMapElement = document.getElementById(curMapId);



		var geocoder = new google.maps.Geocoder();
		var input = document.getElementById('location');
		var searchform = document.getElementById('form1');
		var place;
		autocomplete = new google.maps.places.Autocomplete(input);
		var infowindow = new google.maps.InfoWindow();
			/*autocomplete = new google.maps.places.Autocomplete(input,
				{ types: ['(cities)'] }
			);*/

		//Google Map variables
		var map;
		 var marker = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.DROP,
			anchorPoint: new google.maps.Point(0, 0)
		  });

		//Add listener to detect autocomplete selection
		google.maps.event.addListener(autocomplete, 'place_changed', function () {
			marker.setVisible(false);
			place = autocomplete.getPlace();
						if (!place.geometry) {
				  window.alert("Autocomplete's returned place contains no geometry");
				  return;
				}

				console.log(place.geometry.location);

			// If the place has a geometry, then present it on a map.
				if (place.geometry.viewport) {
				  map.fitBounds(place.geometry.viewport);
				} else {
				  map.setCenter(place.geometry.location);
				  map.setZoom(12);  // Why 17? Because it looks good.
				}
				marker.setIcon(/** @type {google.maps.Icon} */({
				  url: place.icon,
				  size: new google.maps.Size(71, 71),
				  origin: new google.maps.Point(0, 0),
				  anchor: new google.maps.Point(17, 34),
				  scaledSize: new google.maps.Size(35, 35)
				}));
				marker.setPosition(place.geometry.location);

				console.log(place.geometry.location);

				marker.setVisible(true);
				var address = '';
				if (place.address_components) {
				  address = [
					(place.address_components[0] && place.address_components[0].short_name || ''),
					(place.address_components[1] && place.address_components[1].short_name || ''),
					(place.address_components[2] && place.address_components[2].short_name || '')
				  ].join(' ');
				}
				infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
				infowindow.open(map, marker);

			//console.log();

		});


		//Add listener to search
		searchform.addEventListener("submit", function() {

			var newlatlong = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
			map.setCenter(newlatlong);
			console.log(newlatlong);
			marker.setPosition(newlatlong);
			map.setZoom(12);
			var latData = place.geometry.location.lat();
		var lngData = place.geometry.location.lng();
			console.log(lngData);
		$(newMapElement).attr('data-map-lat', latData);
		$(newMapElement).attr('data-map-lng', lngData);

			//create map user script
			createNewMapScript();
			$('#gMapLoader').modal('hide');
			var parentWidth = $(currentMap).parent().width();
			var offset = $(currentMap).parent().offset();
			console.log(offset);
			/*$(currentMap).animate({
				left: '0',
				top: '0',
			  }, 300);*/
			  //$(currentMap).css('position', 'relative');
			  var mapHeight = currentMap.children().attr('data-map-height');
			  $( currentMap).animate({
					position: 'relative',
					height: '"' + mapHeight + '"' ,
					width: '"' + parentWidth + '"',
					left: offset.left + parentWidth ,
					top: offset.top,
					right: 'auto'
			  },{

				specialEasing: {
				  top: "linear",
				  left: "linear"

				},
				complete: function() {
				  $( currentMap).attr('style', '');
				}
			  },3000);



	});

	function createNewMapScript(){


				var gmap =  $('.demo').find('.map-layer').children().attr('id');
				var gmapData =  $('.demo').find('.map-layer').children();
				console.log(gmap);
				if (gmap.length > 0){
					//var mapID =  $(gmap).attr('id');
					var latNewData = $(gmapData).attr('data-map-lat');
					var lngNewData = $(gmapData).attr('data-map-lng');
					var mapSetHeight = $(gmapData).attr('data-map-height');
				var mapRenderUserScripts = $('#userMapScripts');
				console.log(mapRenderUserScripts);

				/*
					try to enject styleSheets

					'\n(function($){var currMap = document.getElementById("' + gmap + '");\n' +
					  'var mapHeight = $("#'  + gmap + '").children().attr(\'data-map-height\');\n' +
					  '$("#'  + gmap + '").children().css(\'height\', mapHeight + \'px\');\n})(window.jQuery);'+

				*/

			var newMapScriptCode =  	'$(\"#' + gmap + '\").css(\'height\', \'' + mapSetHeight + 'px\');\n' +
			'var geocoder = new google.maps.Geocoder();\n' +
								'var infowindow = new google.maps.InfoWindow();\n' +
								'function initialize() {\n' +
										'var latlng = new google.maps.LatLng( ' + latNewData + ',' + lngNewData + ' );\n' +
										'var myOptions = { \n' +
									'zoom: 8,\n' +
									'center: latlng,\n' +
									'mapTypeId: google.maps.MapTypeId.ROADMAP\n' +
								'};\n' +
								'var map = new google.maps.Map(document.getElementById("'+ gmap + '"),\n' +
										'myOptions);\n' +
									'geocodeLatLng(geocoder, map, infowindow);\n' +
								'}\n' +

								'var geocoder = new google.maps.Geocoder();\n' +
								'var infowindow = new google.maps.InfoWindow();\n' +


									'function geocodeLatLng(geocoder, map, infowindow) { \n' +
										'var latlngData = \'' + latNewData + ',' + lngNewData + '\';  \n' +
										'console.log("data:" + latlngData);\n' +
										'var latlngStr = latlngData.split(\',\', 2);\n' +
										'var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};\n' +
										'console.log(latlng);\n' +
										'geocoder.geocode({\'location\': latlng}, \n' +
										'function(results, status) { \n' +
											'if (status === google.maps.GeocoderStatus.OK) { \n' +
												'if (results[1]) { map.setZoom(12); \n' +
													'var marker = new google.maps.Marker({\n' +
														'position: latlng, \n' +
														'map: map \n' +
													'}); \n' +
												'infowindow.setContent(results[1].formatted_address); \n' +
												'infowindow.open(map, marker); \n' +
											'} \n' +
												'else { console.log(\'No results found\'); } } \n' +
														'else { console.log(\'Geocoder failed due to: \' + status ); } \n' +
										'}); \n' +

								'}\n' +
								'google.maps.event.addDomListener(window, "load", initialize);\n' ;


			console.log(newMapScriptCode);
			mapRenderUserScripts.html(newMapScriptCode);



			}

	};

		//Reset the inpout box on click
		input.addEventListener('click', function(){
			input.value = "";
		});

		input.addEventListener('change', function(){
			$('#MapButton').removeClass('disabled');
		});


		function initialize() {
		  var myLatlng = new google.maps.LatLng(51.517503,-0.133896);

		  var mapOptions = {
			zoom: 12,
			center: myLatlng,
			mapTypeControl: true,
				mapTypeControlOptions: {
				  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				  mapTypeIds: [
					google.maps.MapTypeId.ROADMAP,
					google.maps.MapTypeId.TERRAIN
				  ]
				}
		  }
		  map = new google.maps.Map(newMapElement, mapOptions);
	// console.log(newMapElement);
		  marker = new google.maps.Marker({
			  position: myLatlng,
			  map: map,
			  title: 'Main map'
		  });

		};

		//initialize(newMapId);
			initialize();

		//google.maps.event.addDomListener(window, 'load', initialize);


							//END map function

					};
					recreateMapInit();
				}


				/*if($(currentElement).is('a')){
				$('.demo').find('.linkeditable').removeClass('.linkeditable');
				$(currentElement).addClass('linkeditable');
				thisLink = $('.demo').find('.linkeditable');
					$('#element-manipulation-tooltip-link').removeClass('hide');
						$('#element-manipulation-tooltip-link').on('click' , function(){
											console.log(thisLink);
											$('#link-change-modal').modal('show');
												var oldLink = $(thisLink).attr('href');
												$('#link-data').val(oldLink);

												$('#save-link').off('click').on('click', function () {
													$(thisLink).attr('href', $('#link-data').val());
													$('#link-change-modal').modal('hide');
												});
											});
				}
					else {
							if($('#element-manipulation-tooltip-link').is('hide')) {}
								else {$('#element-manipulation-tooltip-link').addClass('hide')}
						}*/
				/* IF ELEMENT IS BTN */
		//	if (currentBtn.length > 0 || $(currentElement).hasClass('btn')){
			if (  $(currentElement).hasClass('btn')){
			thisIsBtn = $(currentElement);
			console.log(thisIsBtn);
				//$('#element-manipulation-tooltip-link').removeClass('hide');
				//	$('#element-mode-element-manipulation-tooltip').css('opacity', '0');
				$('.demo').find('.btneditmaterial').removeClass('btneditmaterial');
					$('.btn-customizer').addClass('show');
					console.log(currentElement);
					$(thisIsBtn).addClass('btneditmaterial');
					//curentElement.addClass('btn-edit-material');
					var thisel = $('.demo').find('.btneditmaterial');
					if ($(thisel).is('.btn-primary')){
										console.log('element btn-primary');

									}
									else {
										$(thisel).addClass('btn-primary');
										console.log('element btn-primary not defined in this el');
									}

					

					/*$('.btn-customizer .color-tool > li').bind( 'click', function () {
							//classes = currentElement.classList;
							//var classes = $('.demo').find('btn-edit-material').attr('class');
							el = $('.demo').find('.btneditmaterial');
							classes = $(el).attr('class');

								var urlClass = $(this).attr('class');
								var regex = new RegExp(/^btn\-material\-(.+)/);
								function makeRemoveClassHandler(regex) {
								  return function (index, classes) {
									return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
								  }
								}
								$(el).removeClass(makeRemoveClassHandler(/^btn-material/));
								$(el).addClass(urlClass);
								$('.btn-customizer .reset-button').off('click').on('click', function(){
									$(el).removeClass(makeRemoveClassHandler(/^btn-material/));
									if ($(el).is('.btn-primary')){
										console.log('element btn-primary');

									}
									else {
										$(el).addClass('btn-primary');
										console.log('element not btn-primary');
									}
								});
					});*/


					//
					// BUTTON CLASS CHANGER
					$('#buttonPropsCancel').on('click', function(){



						//$('#btnMdProps').modal('hide');
						$('.btn-customizer').removeClass('show');
						/*console.log(currentElement);
								$(function(){
									$('.elementPropWrapper').children().unwrap();
								});
							$('#element-mode-element-manipulation-tooltip').css('opacity', '1');*/
					});

				}
				var currentBtn = $(currentElement).find('.btn');
		//	if (currentBtn.length > 0 || $(currentElement).hasClass('btn')){
			if (currentBtn.length > 0 ){
				//$('#element-manipulation-tooltip-link').removeClass('hide');
				//	$('#element-mode-element-manipulation-tooltip').css('opacity', '0');
				$('.demo').find('.btneditmaterial').removeClass('btneditmaterial');
					$('.btn-customizer').addClass('show');
					console.log(currentElement);
					$(currentBtn).addClass('btneditmaterial');
					//curentElement.addClass('btn-edit-material');
					thisel = $('.demo').find('.btneditmaterial');
					if ($(thisel).is('.btn-primary')){
										console.log('element btn-primary');

									}
									else {
										$(thisel).addClass('btn-primary');
										console.log('element btn-primary not defined in this el');
									}

					/*$(currentElement).wrap('<div class="elementPropWrapper"></div>');

					$('.elementPropWrapper').css({
						height: '100vh',
						padding: '150px 50px',
						position: 'fixed',
						background: '#fff',
						top: '0',
						right: 'auto',
						left: '50%',
						zIndex: '10001',
						width: '50%',

					});*/

					/*$('.btn-customizer .color-tool > li').off('click').on( 'click', function () {
							//classes = currentElement.classList;
							//var classes = $('.demo').find('btn-edit-material').attr('class');
							el = $('.demo').find('.btneditmaterial');
							classes = $(el).attr('class');



								//var el = $(currentElement);

									var urlClass = $(this).attr('class');
								var regex = new RegExp(/^btn\-material\-(.+)/);
								function makeRemoveClassHandler(regex) {
								  return function (index, classes) {
									return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
								  }
								}
								$(el).removeClass(makeRemoveClassHandler(/^btn-material/));
								$(el).addClass(urlClass);
								$('.btn-customizer .reset-button').off('click').on('click', function(){
									$(el).removeClass(makeRemoveClassHandler(/^btn-material/));
									if ($(el).is('.btn-primary')){
										console.log('element btn-primary');

									}
									else {
										$(el).addClass('btn-primary');
										console.log('element not btn-primary');
									}
								});
					});*/


					//
					// BUTTON CLASS CHANGER
					$('#buttonPropsCancel').on('click', function(){


						$('.btn-customizer').removeClass('show');
					
					});

				}

				$("#element-mode-element-manipulation-tooltip").hide();
				$(currentElement).removeClass('hoveredSortable');
			});
            $('#element-mode-element-manipulation-remove').off('click').on('click', function () {
			
			if ($(currentElement).is('iframe.embed-responsive-item')){
				$(currentElement).parent().remove();
			}
			if ($(currentElement).is('.navbar-nav li a') ){
				var parent = $(currentElement).parent()
				$(parent).remove();
				
			}
			else{$(currentElement).remove();
				createMapScript.startMap();
			}
				
				
				$("#element-mode-element-manipulation-tooltip").hide();
			})
        },
        removeElementsTooltip: function () {
            clearTimeout(elementsTooltipTimeout);
            elementsTooltipTimeout = setTimeout(function () {
                $('#element-mode-element-manipulation-tooltip').hide();
				//$('.demo').find('.draggable-span-tooltip').remove();
				//$('.demo').find('.manipulation-sortable-widget').children().unwrap();
				$(currentElement).removeClass('hoveredSortable');
				$('.demo').find('.hoveredSortable').removeClass('hoveredSortable');
				
            }, 1500);
        },
        removeTooltip: function () {
            clearTimeout(myTimeout);
            myTimeout = setTimeout(function () {
                $('.demo').find('.sortableCols').removeClass('mode-elements-column-hover');
                $('#element-mode-tooltip').hide();
            }, 1500);
        },
        unbind: function () {

			$('.btn-customizer, .section-customizer, .well-customizer, .element-customizer, .navbar-customizer ').addClass('hide');
			$('#details-mode-window').css('bottom', '');
			$('.blocks-mode-tools').addClass('hide');
			$('#virtual-editor-btn').removeClass('hide');
			$('#elemets-tool-wrapper').addClass('hide');
			$('#elements-mode').removeClass('hide');
			var editToggle = $('#btn-text-editor-activate');
			var dragToggle = $('#btn-drag-activate');
				$(editToggle).removeClass('active');
					$(dragToggle).addClass('active');
					
					
            $('.demo').find('.mode-elements-column-hover').removeClass('mode-elements-column-hover');
			var ulElemement = $('.demo').find('ul');
			if (ulElemement.length > 0) {
                ulElemement.sortable().sortable('destroy');
                $('.demo').find('.sortableCols').removeClass('mode-elements-column-hover');
                ulElemement.off('mouseenter').removeClass('sortableCols').children().off('mouseenter');
            }
			$('.demo').find('.ul-sortable-wrapper ul').unwrap();
            $(".demo").find("div[class*='col-']").each(function () {
                var styles = $(this).attr("style");
                if (typeof styles !== 'undefined') {
                    styles = styles.replace(/min-height:\s?.*;/g, '');
                    $(this).attr('style', styles);
                }
            });

            var sortableElements = $(".demo").find('.sortableCols');
            if (sortableElements.length > 0) {
                sortableElements.sortable().sortable('destroy');
                $('.demo').find('.sortableCols').removeClass('mode-elements-column-hover');
                sortableElements.off('mouseenter').removeClass('sortableCols').children().off('mouseenter');
            }
			eventListener.emmitEvent('tooltipEventsOff');
			eventListener.emmitEvent('elementsEditableOff');
		
        }


    };

});
