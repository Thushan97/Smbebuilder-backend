define([
  'jquery',
 

  ],function(
  $
) {
	var self = { 
		startMap: function(){
		
		
			//check if map instance exist on page show alert
			$(".md-widget-elements .md-widget-wrapper-drag.map").draggable();
			var mapExist = $('.demo').find('.map-layer');
			console.log(mapExist.length);
			if (mapExist.length > 0){
				
				$(".md-widget-elements .md-widget-wrapper-drag.map").on('click', function(){
					
					
					alert('You have already created one map on this page');
					
				});
				$(".md-widget-elements .md-widget-wrapper-drag.map").draggable('disable');
				
			}
			
				//else get map dragg to canvas
				else {
			
				$(".md-widget-elements .md-widget-wrapper-drag.map").draggable('enable');
			 $(".md-widget-elements .md-widget-wrapper-drag.map").draggable({
				//appendTo: '.appendix',
				appendTo: 'body',
                connectToSortable: '.sortableCols',
                placeholder: '.placeholder',
                helper: function(){
                var dom = [];
                 
                dom.push("<div style=\"opacity:1;height:100px;width:200px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;background: #ccc;	box-shadow: 5px 5px 10px rgba(50,50,50, .5);-moz-box-shadow: 5px 5px 10px rgba(50,50,50, .5);-webkit-box-shadow: 5px 5px 10px rgba(50,50,50, .5);\">",
                         "</div>");
                 
                return $(dom.join(''));
            },
                handle: '.drag-handle',
				zIndex: '9999',
				tolerance: 'pointer',
                //containment: 'demo',
                containment: false,
                refreshPositions: true,
				//cursorAt: {left: 100, top: 0},
                scroll: false,
				revert: 'invalid',
				start: function (event, ui) {
					$(".demo").find('.sortableCols').addClass('dragHighlighter');
					
				},
             
                drag:  function (event, ui) {
					 
				},
                stop: function (event, ui) {
				$(".demo").find('.sortableCols').removeClass('dragHighlighter');
					var currentMap = $('.demo').find('.map-layer');
					  var curMapId = currentMap.children().attr('id');
					  
					  var newMapId =  'map-' + self.randomNumber(); 
					  currentMap.children().attr('id', newMapId);
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
					
					/* var newMapIdCss = '\n#' + newMapId + '{\nheight:400px;\n}\n'; //height of the curr map this function will be variable from user UI map input
					  console.log(newMapIdCss);
					 var currentUserDomStyles = $('#userstyles').text();
					 console.log(currentUserDomStyles);
					 $('#userstyles').html('');
					 var newStyles = '\n' + currentUserDomStyles + '\n' + newMapIdCss;
					 $('#userstyles').html(newStyles);*/
					 //.append( newMapIdCss );
					  var newMapElement = document.getElementById(newMapId);
					$('.demo .drag-handle').remove();
					$('.demo .md-element-layer.hide').removeClass('hide').addClass('ui-draggable');
					$('.demo .md-element-layer').unwrap();
					  
					  
					  //map
					 
						
							//map function
							
							
								  //Autocomplete variables
								  
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
			map.setZoom(16);
			var latData = place.geometry.location.lat();
		var lngData = place.geometry.location.lng();	
			console.log(lngData);
		$(newMapElement).attr('data-map-lat', latData);
		$(newMapElement).attr('data-map-lng', lngData);
			
			//create map user script
			self.createScript();
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
			zoom: 8,
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
			  animation: google.maps.Animation.DROP,
			  title: 'Main map'
		  });
		  
		};

		//initialize(newMapId);	
			initialize();
		
		//google.maps.event.addDomListener(window, 'load', initialize);
		
		
							//END map function
						
							
				$('#gMapLoader').modal('show');
				$('.demo .md-element-layer').removeClass('md-element-layer');
				$('.demo .text-micro').remove();
					
					//self.createMapScript.createScript();
	}
  }).disableSelection();
 
 self.mapStateChecker();
		};
	
     
    },
	mapStateChecker: function(){
		 //check if map instance exist on page show alert
			//$(".md-widget-elements .md-widget-wrapper-drag.map").draggable();
			var mapExist = $('.demo').find('.map-layer');
			console.log(mapExist.length);
			if (mapExist.length > 0){
				
				$(".md-widget-elements .md-widget-wrapper-drag.map").on('click', function(){
					
					
					alert('You have already created one map on this page');
					
				});
				$(".md-widget-elements .md-widget-wrapper-drag.map").draggable('disable');
				
			}
	},
	
	randomNumber: function () {
		return Math.floor(Math.random() * (1e6 - 1 + 1) + 1)
	},
	createScript: function(){

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
												'if (results[1]) { map.setZoom(11); \n' +
													'var marker = new google.maps.Marker({\n' +
														'position: latlng, \n' +
														'map: map, \n' +
														'animation: google.maps.Animation.DROP,' +
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
	}
};
  return self;
});