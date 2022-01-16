$( document ).ready(function() {
   
	$('.show').click(function(){
					var prev = $(this).parent().next().next();
					console.log(prev);
					prev.slideToggle("slow");
				});

    
			$('.card-reveal .close').on('click',function(){
				$(this).parent().slideToggle('slow');
			});
	
	 console.log( "ready!" );
});
	