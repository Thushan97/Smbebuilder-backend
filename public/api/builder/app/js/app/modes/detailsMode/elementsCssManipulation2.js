	
				if( $(element).is('nav.navbar')){
				
				console.log('navbar here');
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
							$('.navbar-customizer .color-tool > li').off('click').on( 'click', function () {
							//classes = currentElement.classList;
							//var classes = $('.demo').find('btn-edit-material').attr('class');
							el = $(element);
							classes = $(el).attr('class');
							el.css('background', '');
							el.css('background-color', '');
								var urlClass = $(this).attr('data-class');
								var regex = new RegExp(/^navbar\-material\-(.+)/);
								function makeRemoveClassHandler(regex) {
								  return function (index, classes) {
									return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
								  }
								}
								$(el).removeClass(makeRemoveClassHandler(/^navbar-material/));
								$(el).addClass('navbar'+urlClass);
								/*(function ($) {
									$.fn.contrastingText = function () {
										var el = this,
											transparent;
										transparent = function (c) {
											var m = c.match(/[0-9]+/g);
											if (m !== null) {
												return !!m[7];
											}
											else return false;
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
								}(jQuery)); */
								document.addEventListener("transitionend", self.contrastingText, false);
								
							//$(el).contrastingText();
								$('.navbar-customizer .reset-button').on('click', function(){
									$(el).removeClass(makeRemoveClassHandler(/^navbar-material/));
									if ($(el).hasClass('navbar')){
										console.log('element navbar');

									}
									else {
										$(el).addClass('navbar nabar-default');
										console.log('element not .navbar');
									}
								});
								
					});
					
					var $alignNavButtons = $(document).find('#leftNavBtn, #rightNavBtn');
					var navUl = $(element).find('ul.nav.navbar-nav');
					if($(navUl).length < 2)
					{
						$alignNavButtons.removeClass('hide');
						$alignNavButtons.off('click').on( 'click', function ( event) {
							$(navUl).removeClass( 'navbar-right' );
							$(navUl).addClass( $( this ).attr( 'data-class' ) );
						
						});
					}
					else{
						$alignNavButtons.addClass('hide');
					}
				
						
				
					
					$('#navbarPropsCancel').off('click').on('click', function(){
									
								$('#navbar-customizer').addClass('hide');
																	
						});
						
				}
				else {
					$('.navbar-customizer').addClass('hide');
				}
				if ( $(element).is('p, h1, h2, h3, h4, h5, address, li, li a, cite, blockquote')){
					var $elStylePanel = $( document ).find('.element-customizer');
					$('.element-customizer').removeClass('hide');
					var $currentElement = $(element);
					var $alignButtons = $( document ).find( '#leftTextBtntxt, #centerTextBtntxt, #rightTextBtntxt' );
					//var $leadBtn = $( document ).find( '#leadBtn' );
					var $sizeButtons = $( document ).find( '#sizeBtn3xl, #sizeBtn2xl, #sizeBtnXl, #sizeBtnLg , #sizeBtnMd , #sizeBtnSm' );  
					var $textButtons = $( document ).find( '#textXl, #textLg , #textMd , #textSm' );
					var $textSizePanel = $( document ).find( '#__w-text-sizes' );
					var $titleSizePanel = $( document ).find( '#__w-titles-sizes' );
					var $closePanelButton = $( document ).find( '#textPropsCancelEl' );
					
					var $display = $( document ).find( '#chosen' );
					var $display2 = $( document ).find( '#chosen2' );
					var $marginSlider = $( document ).find( '#__w-margin-slide' );
					var $marginSliderBottom = $( document ).find( '#__w-margin-slide-bottom' );
		
				var topMarg = $currentElement.css('marginTop').replace(/[^-\d\.]/g, '');
				$marginSlider.val(0);
				$marginSlider.val(topMarg);
				
				
				
				$marginSlider.off('input').on('input', function(){
					var valClass = $(this).val();
					var marginAmount = $(this).val()+'px'
					var urlClass = $currentElement.attr( 'class' );
					$currentElement.css({marginTop: ''});
					var el = $currentElement;
                    var regex = new RegExp( /^margin\-top\-(.+)/ );
                    function makeRemoveClassHandler( regex ) {
                        return function ( index, classes ) {
                            return classes.split( /\s+/ ).filter( function ( el ) { return regex.test( el ); } ).join( ' ' );
                        }
                    }
						el.removeClass( makeRemoveClassHandler( /^margin-top-/ ) );
						var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass( 'margin-top-' + newClass );
					
			});
				var bottomMarg = $currentElement.css('marginBottom').replace(/[^-\d\.]/g, '');
				$marginSliderBottom.val(0);
				$marginSliderBottom.val(bottomMarg);
				
				$marginSliderBottom.off('input').on('input', function(){
					var valClass = $(this).val();
					var marginAmount = $(this).val()+'px'
					var urlClass = $currentElement.attr( 'class' );
					$currentElement.css({marginTop: ''});
					var el = $currentElement;
                    var regex = new RegExp( /^margin\-bottom\-(.+)/ );
                    function makeRemoveClassHandler( regex ) {
                        return function ( index, classes ) {
                            return classes.split( /\s+/ ).filter( function ( el ) { return regex.test( el ); } ).join( ' ' );
                        }
                    }
						el.removeClass( makeRemoveClassHandler( /^margin-bottom-/ ) );
						var newClass = marginAmount.replace(/[^-\d\.]/g, '')
                        el.addClass( 'margin-bottom-' + newClass );
					
			});
				
			
				function closeElStylePanel() {
					$elStylePanel.addClass( 'hide' );
					$elStylePanel.find( '.dropup' ).removeClass('open');
				}
					
					    $alignButtons.off('click').on( 'click', function () {
							$currentElement.removeClass( 'text-align-left text-align-center text-align-right' );
							$currentElement.addClass( $( this ).attr( 'data-class' ) );
						} );
						
						$sizeButtons.off('click').on( 'click', function () {
							$currentElement.removeClass( 'headline-3xl headline-2xl headline-xl headline-lg headline-md headline-sm' );
							$currentElement.addClass( $( this ).attr( 'data-class' ) );
						
						} );
						$textButtons.off('click').on( 'click', function () {
							$currentElement.removeClass( 'text-xl text-lg text-md text-sm' );
							$currentElement.addClass( $( this ).attr( 'data-class' ) );
						
						} );
					
					$sizeHC = $(document).find('#__w-title-sizes');
					$sizeTC = $(document).find('#__w-text-sizes');
					if( $(element).is('h1, h2, h3, h4, h5, h6')){
						$titleSizePanel.css( 'display', 'block' );
						
					}
					else{
						$titleSizePanel.css( 'display', 'none' );
					}
					
					
					  if ($(element).is( 'p' ) || $(element).is( 'address' ) || $(element).is( 'blockquote' ) || $(element).is( 'cite' )|| $(element).is( 'ul li' ) ){
							$textSizePanel.css( 'display', 'block' );
					
						}
						else {
									
								$textSizePanel.css( 'display', 'none' );
							
							
						}
					
						function closeElStylePanel() {
							$elStylePanel.addClass( 'hide' );
							$elStylePanel.find( '.dropup' ).removeClass('open');
						}
						$('#textPropsCancelEl').off('click').on('click', function(){
							closeElStylePanel();
						});
					
		
				}
				else{
					$('.element-customizer').addClass('hide')
				}
				
				if( $(element).is('section .well')){
				
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
							$('.well-customizer .color-tool > li').off('click').on( 'click', function () {
							//classes = currentElement.classList;
							//var classes = $('.demo').find('btn-edit-material').attr('class');
							el = $(element);
							classes = $(el).attr('class');
							el.css('background', '');
							el.css('background-color', '');
								var urlClass = $(this).attr('data-class');
								var regex = new RegExp(/^well\-material\-(.+)/);
								function makeRemoveClassHandler(regex) {
								  return function (index, classes) {
									return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
								  }
								}
								$(el).removeClass(makeRemoveClassHandler(/^well-material/));
								$(el).addClass('well'+urlClass);
								var rgb = $(el).css('backgroundColor');
								var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
								var brightness = 5;

								var r = colors[1];
								var g = colors[2];
								var b = colors[3];

								var ir = Math.floor((255-r)*brightness);
								var ig = Math.floor((255-g)*brightness);
								var ib = Math.floor((255-b)*brightness);
								
								//$(el).css('color', 'rgb('+ir+','+ig+','+ib+')'); 
								(function ($) {
									$.fn.contrastingText = function () {
										var el = this,
											transparent;
										transparent = function (c) {
											var m = c.match(/[0-9]+/g);
											if (m !== null) {
												return !!m[7];
											}
											else return false;
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
								document.addEventListener("transitionend", self.contrastingTexts, false);
							$(el).contrastingText();
							var textEls = $(el).find('i, p, h1, h2, h3, h4, h5, h6, li, blockquote, cite, address');
							$(textEls).css('color', '');
							
								$('.well-customizer .reset-button').on('click', function(){
									$(el).removeClass(makeRemoveClassHandler(/^well-material/));
									if ($(el).hasClass('well')){
										console.log('element navbar');

									}
									else {
										$(el).addClass('well');
										console.log('element not .well');
									}
								});
					});
					
						$('#wellPropsCancel').on('click', function(){
								$('.well-customizer').addClass('hide');	
						});
				}
				else {
					$('.well-customizer').addClass('hide');
				
				}
				
				if( $(element).is('section')){
				//$('#details-mode-window #ui-accordion-accordion-styles-header-0').removeClass('hide');
			
				$('#details-mode-window #bl-overlay').removeClass('hide');
					$('#details-mode-window #bl-bg-image').removeClass('hide');
				$('#details-mode-window #bl-parallax').removeClass('hide');
				console.log('section binded prop click');
					$('.section-customizer').removeClass('hide');
				
							//check if btn has no primary class
									if ($(element).hasClass('well')){
										console.log('element well');
										$('.section-customizer').removeClass('hide');
									}
									else {
										$(element).addClass('well');
										$('.section-customizer').removeClass('hide');
										console.log('element well not defined in this el');	
									}
							$('.section-customizer .color-tool > li').off('click').on( 'click', function () {
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
								  return function (index, classes) {
									return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
								  }
								}
								
				var regexOV = new RegExp(/^ov\-(.+)/);
				function makeRemoveClassHandlerOV(regexOV) {
				  return function (index, classes) {
					return classes.split(/\s+/).filter(function (el) {return regexOV.test(el);}).join(' ');
				  }
				}
				el.removeClass(makeRemoveClassHandlerOV(/^ov-/));
				
				var regexBG = new RegExp(/^bg\-(.+)/);
				function makeRemoveClassHandlerBG(regexBG) {
				  return function (index, classes) {
					return classes.split(/\s+/).filter(function (el) {return regexBG.test(el);}).join(' ');
				  }
				}
				el.removeClass(makeRemoveClassHandlerBG(/^bg-/));
				
								$(el).removeClass(makeRemoveClassHandler(/^well-material/));
								$(el).addClass('well'+urlClass);
								
								/* try to change text color*/
								var rgb = $(el).css('backgroundColor');
								var colors = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
								var brightness = 5;

								var r = colors[1];
								var g = colors[2];
								var b = colors[3];

								var ir = Math.floor((255-r)*brightness);
								var ig = Math.floor((255-g)*brightness);
								var ib = Math.floor((255-b)*brightness);
								
								//$(el).css('color', 'rgb('+ir+','+ig+','+ib+')'); 
								(function ($) {
									$.fn.contrastingText = function () {
										var el = this,
											transparent;
										transparent = function (c) {
											var m = c.match(/[0-9]+/g);
											if (m !== null) {
												return !!m[7];
											}
											else return false;
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
								document.addEventListener("transitionend", self.contrastingTexts, false);
							$(el).contrastingText();
							var textEls = $(el).find('i, p, h1, h2, h3, h4, h5, h6, li, blockquote, cite, address');
							$(textEls).css('color', '');
							/* try to change text color*/
															
								
								$('.section-customizer .reset-button').on('click', function(){
									$(el).removeClass(makeRemoveClassHandler(/^well-material/));
									if ($(el).hasClass('well')){
										console.log('element well');
										$(el).css('color', '');

									}
									else {
										$(el).addClass('well');
										console.log('element not .well');
									}
								});
					});
					
					var $alignTextButtons = $(document).find('#leftTextBtn, #rightTextBtn, #centerTextBtn');
					$alignTextButtons.off('click').on( 'click', function ( event) {
						$(element).removeClass( 'text-align-center text-align-right text-align-left' );
						var innerAligned = $(element).find( '.text-align-center, .text-align-right, .text-align-left' );
						$(innerAligned).removeClass( 'text-align-center text-align-right text-align-left' ).css('text-align', '');
						$(element).css('text-align', '');
						$(element).addClass( $( this ).attr( 'data-class' ) );
					
					});
					
						$('#sectionPropsCancel').on('click', function(){
								$('.section-customizer').addClass('hide');
					});
				}
				else {
					$('.section-customizer').addClass('hide');
					//$('#details-mode-window #ui-accordion-accordion-styles-header-0').addClass('hide');
					$('#details-mode-window #bl-overlay').addClass('hide');
						$('#details-mode-window #bl-bg-image').addClass('hide');
				$('#details-mode-window #bl-parallax').addClass('hide');
				}
				
				if( $(element).is('button, .btn')){
				var $outlineButtons =  $( document ).find( '#btnDng, #btnWrn, #btnSucc, #btnInf , #btnPrim, #btnWh, #btnBl' );
				var $sizeButtons =  $( document ).find( '#btnXs, #btnMd, #btnLg' );
				var $roundButton =  $( document ).find( '#btnRound' );
				var $roundNotButton =  $( document ).find( '#btnNotRound' );
				
				
					$('.btn-customizer').removeClass('hide');
					$('#btnRezetOutline').on( 'click', function () {
						$(element).removeClass( 'btn-danger btn-info btn-primary btn-warning btn-success btn-outline btn-black btn-white' );
					});
					$($roundButton).off('click').on( 'click', function () {
							$(element).addClass( 'btn-round' );
							$($roundNotButton).removeClass('active');
							$(this).addClass('active');
					});
					$($roundNotButton).off('click').on( 'click', function () {
							$(element).removeClass( 'btn-round' );
							$($roundButton).removeClass('active');
							$(this).addClass('active');
						});
					
					if( $(element).is('.btn-round')){
						$($roundNotButton).removeClass('active');
						$($roundButton).addClass('active');
						
					}
					else{
						$($roundButton).removeClass('active');
						$($roundNotButton).addClass('active');
						
					}
					
					
					$('#btnRezetSize').off('click').on( 'click', function () {
						$(element).removeClass( 'btn-xs btn-md btn-lg' );
					});
					$outlineButtons.off('click').on( 'click', function ( event) {
						$(element).removeClass( 'btn-danger btn-info btn-primary btn-warning btn-success btn-black btn-white' );
						$(element).css('background', '');
						$(element).css('background-color', '');
						$(element).css('color', '');
						$(element).addClass( $( this ).attr( 'data-class' ) );
						if ($(element).hasClass('btn-outline'))
						{}
						else{
							$(element).addClass( 'btn-outline' );
						}
					});
					$sizeButtons.off('click').on( 'click', function ( event) {
						$(element).removeClass( 'btn-xs btn-md btn-lg' );
						$(element).css('padding', '');
						$(element).addClass( $( this ).attr( 'data-class' ) );
					
					});
							//check if btn has no primary class
									if ($(this).is('.btn-default')){
									}
									else {
										$(this).addClass('btn-default');
									}
							$('.btn-customizer .color-tool > li').off('click').on( 'click', function () {
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
								  return function (index, classes) {
									return classes.split(/\s+/).filter(function (el) {return regex.test(el);}).join(' ');
								  }
								}
								$(el).removeClass(makeRemoveClassHandler(/^btn-material/));
								$(el).removeClass('btn-white btn-outline btn-black');
								$(el).addClass(urlClass);
								$('.btn-customizer .reset-button').on('click', function(){
									$(el).removeClass('btn-white btn-outline btn-black');
									$(el).removeClass(makeRemoveClassHandler(/^btn-material/));
									if ($(el).is('.btn-default')){
									}
									else {
										$(el).addClass('btn-default');
									}
								});
					});
					
						$('#buttonPropsCancel').on('click', function(){
								$('.btn-customizer').addClass('hide');
					});
					
					
							
				}
				else {
					$('.btn-customizer').addClass('hide');
				}