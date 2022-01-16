


	
	$('#downloadhtml').click(function(e){

		$.generateFile({
			filename	: 'index.html',
			content		:  $('#downloadModal textarea#htmltextarea').val(),
			script		: 'download.php'
		});
		
		e.preventDefault();
		
	});
	
	$('#downloadcssfile2').click(function(e){
		
		$.generateFile({
			filename	: 'bootstrap.css',
			content		: $('#downloadModal textarea#csstextarea').val(),
			script		: 'download.php'
		});
		
		e.preventDefault();
	});
	
	$('#downloadcssfile3').click(function(e){
		
		$.generateFile({
			filename	: 'custom.css',
			content		: $('#downloadModal textarea#csstextareacustom').val(),
			script		: 'download.php'
		});
		
		e.preventDefault();
	});	
	
	$('#downloadjsfile').click(function(e){
		
		$.generateFile({
			filename	: 'custom.js',
			content		: $('#downloadModal textarea#jstextareacustom').val(),
			script		: 'download.php'
		});
		
		e.preventDefault();
	});
	
