$('.show').click(function(){
				event.preventDefault(event);
                    event.stopPropagation(event);
					var prev = $(this).parent().next().next();
					console.log(prev);
					prev.slideToggle("slow");
				});

    
			$('.card-reveal .close').on('click',function(){
			event.preventDefault(event);
                    event.stopPropagation(event);
				$(this).parent().slideToggle('slow');
			});