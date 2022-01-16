define([], function () {
    return {
        show: function (element) {
            var oldLink = $(element).attr('href');
            $('#link-data').val(oldLink);
            $('#link-change-modal').modal('show');
			 $('#save-link').off('click').on('click', function () {
                $(element).attr('href', $('#link-data').val());
                $('#link-change-modal').modal('hide');
            });
				
				$('#link-change-modal #anchor-button').off('click').on( 'click' , function(event){
							event.stopPropagation();
							event.preventDefault(event);
						$('#link-change-modal').modal('hide');
						//$('#alert-anchor').show();
						$('#alert-anchor').addClass('in');
						//.css('display', 'block');
						//$('.demo').addClass('hideGrids');
						//$('#inputLinkAnchor').val('');
						$('.demo').find('section').addClass('outline-element');
						//self.addTooltipToLinks();
						/*$("#element-link-tooltip").off('mouseenter').on('mouseenter', function () { 
				
							/*clearTimeout(myTimeout);
							myTimeout = setTimeout(function () {
								$('.demo').find('section').removeClass('outline-element-clicked');
								$('#element-mode-tooltip').addClass('hide');
							}, 1500);
      
			}).off('mouseleave').on('mouseleave', function () { 
				$('.demo').find('section').removeClass('outline-element-clicked'); 
				$("#element-link-tooltip").addClass('hide'); 
			});*/
			
			var tooltipLink = '<div class="element-link-tooltip text-center" style=" position: absolute;  right:0; left:0; top:0;" class="text-center"> <button  class="btn btn-lg btn-material-amber-500 element-manipulation-tooltip-link">Click to choose </button></div>';
			$('.demo').find('.outline-element').append(tooltipLink);
			
			
            
				
				
					$('.element-manipulation-tooltip-link').off('click').on('click', function(event){
							//main behavior
							event.stopPropagation();
							event.preventDefault();
										//nodenames = [];
										
										$('#inputLinkWrapper').removeClass('hide');
										$('#inputLinkAnchor').focus();
										
										var text = '';
										thisBtn = $(event.target);
										var thisElement = $(thisBtn).parent().parent();
										console.log(thisElement);
										$('#inputLinkAnchor').val("");
										if ($(thisElement).attr('id')) { 	
											text =  $(thisElement).attr('id');
											varValID = $('#inputLinkAnchor').val(text);
											console.log('ID:' + text);
											$('#log-anchor').html('<i class="mdi-image-filter-2"></i> This Section ID <trong>#' + text + '</strong>  Click <strong>SAVE</strong> on the form to use this ID as link anchor');
										}
										else { 
											console.log(' This Section do not have any ID! Type new ID to the form on the right');
											$('#log-anchor').html('<i class="mdi-image-filter-2"></i> This Section do not have any ID! Type new ID to the form on the right and click SAVE');
											
										
										}
									
										$('#inputLinkAnchor').off('change').on('change', function(){
												var newLinkInput = $('#inputLinkAnchor');
												var newLinkVal = $('#inputLinkAnchor').val();
												
												$(newLinkInput).data("old", $(newLinkInput).data("new") || "");
												$(newLinkInput).data("new", $(newLinkInput).val());
												var OldData = $(newLinkInput).data("old");
												var NewData = $(newLinkInput).data("new");
												console.log('old' + OldData);
												console.log('new' + NewData);
													//$('#inputLinkAnchorBtn').removeAttr('disabled');
									
											
											
												$('#inputLinkAnchorBtn').off('click').on('click', function(){
												console.log(NewData);
													$(thisElement).attr('id', NewData);
													
													$(element).attr('href', '#' + NewData);
														if ($(element).is('.scroll')){
																//do nothing
														}
															else{ 	$(element).addClass('scroll'); }
													$('#alert-anchor').removeClass('in').css('display', 'none');
													$('.demo').find('section').removeClass('outline-element-clicked'); 
													$('.demo').find('section').removeClass('outline-element'); 
													$("#element-link-tooltip").addClass('hide');
													
													$('.demo').find('section').unbind('mouseenter');
													$('.demo').find('.element-link-tooltip-link').unbind('click');
													$('.demo').find('.element-link-tooltip').remove();
													$('#link-change-modal #changeAnchor').unbind( 'change');
													$('.demo').removeClass('hideGrids');
													
													$('.demo').find('.newlink').removeClass('newlink');
													$('#alert-anchor').removeClass('in');
													$('#log-anchor').html('<i class="mdi-image-filter-1"></i> Select a SECTION to connect with this link');
													//.css('display', 'none');
												});
										});
									

          // hide add elements button
		   /*$('#element-mode-add-element').off('click').on('click', function () {
                $('#add-element').modal('show');
                $("#element-mode-tooltip").hide();
            });*/
			
        });
	
	
	//.off('mouseleave').on('mouseleave', self.removeLinkTooltip);
			
				});	
           
        },
		removeLinkTooltip: function(){
			
		},


    };
});













