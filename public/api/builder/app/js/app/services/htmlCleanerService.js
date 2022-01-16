define(['services/wrapunwrapImg', 'services/stateChecker'], function (wrapunwrapImg, stateChecker) {

    var self = {
        getCleanedHtml: function (useAssetsFolder) {

            wrapunwrapImg.unwrap();
            $('#savecode').html($('.demo').html());
            if (stateChecker.getActiveMode() == 'content') {
                wrapunwrapImg.wrap();
            }
			 $('#savecode').find('.m__move_arrow').remove();

            $('#savecode').find('.drag').remove();
            $('#savecode').find('.remove-block').remove();
            $('#savecode').find('#addBlockBtn').remove();
            $('#savecode').find('.settings-block').remove();
            $('#savecode').find('.btnForIFrameSrcChage').remove();
            $('#savecode').find('.tie-to-modal').removeClass('tie-to-modal');
            $('#savecode').find('.map-layer').children().html('').attr('style', '');
			var contactForm = $('#savecode').find('.contact-form')
			if(contactForm){
				var contactScript =  "<script src=\"js/script-email-form.js\" type=\"text/javascript\"></script>\n"
			}
			else{}
			if ($('body').hasClass('is-navbar-fixed-top')){
				var fixedClass = 'is-navbar-fixed-top'
			}
			else{ var fixedClass = '';}

			var videoLightBox =  $('#savecode').find('.lightbox-toggle');
			if( videoLightBox.length > 0){
				$('#savecode').append('\n    <div class="lightbox video-lightbox">\n      <a href="#lightbox" class="lightbox-close lightbox-toggle">X</a>\n      <div class="lightbox-container container-fluid">\n        <div class="row">\n          <div class="col-xs-12 col-md-10 col-md-offset-1 lightbox-column">\n            \n          </div>\n        </div>\n      </div>\n    </div>\n ');
			}

			//add map if existe
			/*var gmap =  $('#savecode').find('.map-layer').children();
				if (gmap.lenght > 0){
					var mapID =  $(gmap).attr('id');
					var latNewData = $(gmap).attr('data-map-lat');
					var lngNewData = $(gmap).attr('data-map-lng');



					function initMap() {
					  var map = new google.maps.Map(document.getElementById(gmap), {
						zoom: 8,
						center: {lat: 40.731, lng: -73.997}
					  });
					  var geocoder = new google.maps.Geocoder;
					  var infowindow = new google.maps.InfoWindow;
					function createmap() {
						geocodeLatLng(geocoder, map, infowindow);
					  });
						google.maps.event.addDomListener(window, 'load', createmap);


					function geocodeLatLng(geocoder, map, infowindow) {
					 // var input = document.getElementById('latlng').value;
					 // var latlngStr = input.split(',', 2);
					  var latlng = {lat: latNewData), lng: lngNewData};
					  geocoder.geocode({'location': latlng}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
						  if (results[1]) {
							map.setZoom(11);
							var marker = new google.maps.Marker({
							  position: latlng,
							  map: map
							});
							infowindow.setContent(results[1].formatted_address);
							infowindow.open(map, marker);
						  } else {
							window.alert('No results found');
						  }
						} else {
						  window.alert('Geocoder failed due to: ' + status);
						}
					  });
					}
				}*/
			 //end gmap

            $("#savecode").find("div[class*='col-']").css('min-height', '1px');
		        $("#savecode").find("section").css('z-index', '');
            $('#savecode').find('.ui-sortable').removeClass('ui-sortable');
			      $('#savecode').find('.img-wrapper').children().unwrap();
            $('#savecode').find('.sortableCols').removeClass('sortableCols');
            $('#savecode').find('#formBlockBtn').remove();
            $('#savecode').find('#addBlockBtn').remove();
		      	$('#savecode').find('.box-layer').css('background-position', '');
            $('#savecode').find('.box-layer').removeClass('box-layer');
            $('#savecode').find('.ui-draggable').removeClass('ui-draggable');
            $('#savecode').find('.hide-in-sidebar').removeClass('hide-in-sidebar');
            $('#savecode').find('.medium-editor-placeholder').removeClass('medium-editor-placeholder');
            $('#savecode').find('.editable').removeClass('editable');
            $('#savecode').find('.parallax-layer').removeAttr('style');
            $('#savecode').find('.parallax-layer').removeAttr('style').each(function () {
                if (/skew/.test($(this).attr('class'))) {
                    $(this).css('overflow-x', 'hidden');
                }
            });
            //also edit any allowed attr here-> modes/contentSubModes/htmlEdit
            var formatSrc = $.htmlClean($('#savecode').html(), {
                format: true,
                allowedAttributes: [
                    ["id"],
                    ["class"],
                    ["placeholder"],
                    ["data-toggle"],
                    ["data-target"],
                    ["data-parent"],
                    ["data-rel"],
                    ["onclick"],
                    ["data-via"], //twitt btn
                    ["data-lang"],//twitt btn
                    ["data-size"],//twitt btn
                    ["data-annotation"],//+1 btn
                    ["data-width"],//+1 btn
                    ["role"],
                    ["data-lightbox-content"],
                    ["data-stellar-ratio"],
                    ["data-stellar-horizontal-offset"],
                    ["data-stellar-vertical-offset"],
                    ["data-stellar-offset-parent"],
                    ["data-dismiss"],
                    ["data-map-lat"], //gmap
                    ["data-map-lng"],//gmap
                    ["aria-labelledby"],
                    ["aria-hidden"],
                    ["data-slide-to"],
                    ["data-placement"],
                    ["data-original-title"],
                    ["data-slide"],
                    ["pre"],
                    ["marginwidth"],
                    ["marginheight"],
                    ["scrolling"],
					["data-frame"],
                    ["frameborder"],
                    ["aria-valuenow"],
                    ["aria-valuemin"],
                    ["aria-valuemax"],
                    ["style"],
                    ["src"],
                    ["data-stellar-background-ratio"],
                    ["data-filter"],
                    ["style"],
                    ["width"],
                    ["height"],
                    ["async"],
                    ["defer"],
                    ["data-map-height"],
                    //ampproject tags
                    ["amp-*"],
                    ["itemprop"],
                    ["itemscope"],
                    ["itemtype"],
                    ["srcset"],
                    ["layout"],
                    ["on"],
                    ["amp-custom"],
                    ["article"],
                    ["figure"],
                    ["figcaption"],
                    ["type"],
                    ["data-aax_size"],
                    ["data-aax_pubname"],
                    ["data-aax_src"],
                    ["data-ad-client"]
                ]
            });

            var carouselJavascriptCode = $('#usersCarouselScripts').text();
            if (!carouselJavascriptCode) {
                carouselJavascriptCode = '';
            }

			var mapExist = $('#savecode').find('.map-layer');
			if (mapExist.length > 0){
				var mapJavascriptCode = $('#userMapScripts').text();
					if (!mapJavascriptCode) {
						mapJavascriptCode = '';
					}
			}




			//amp-custom
            /* prepend header of a new html */

            var selected_styles = $('#stylesChange').attr('href');
            var g_fonts = $('#g-fonts').attr('href');

            var demoStyles = $('#userfonts').html().match(/font-family\D*;/);
           // demoStyles = demoStyles ? '\n html body, html body *, .navbar-brand{\n\t' + demoStyles + '\n}\n' : '';

            var fs = self.getFontsAndStyles()

			var filesPath = useAssetsFolder ? 'assets/' : '';
			var bodyStyles = $('#userstylesForBody').text();
			var fStyles  = $('#font-styles').text();
			var mStyles = $('#font-media').text();
			var mFace = $('#font-face').text();


            var base_tpl =
            "<!doctype html>\n" +
            "<html lang=\"en\">\n" +
              "<head>\n\t\t" +
              "\n<meta charset=\"utf-8\">\n" +
              "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
              "<meta name=\"viewport\" content=\"width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0,minimal-ui\">" +
              "\n<title>Test page</title>\n\n" +
              "<link href=\" " + selected_styles + "\" rel=\"stylesheet\">\n" +
              "<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css\" rel=\"stylesheet\">\n" +
              "<link href=\"css/material-design-icons.css\" rel=\"stylesheet\">\n" +
              "<link href=\"" + g_fonts + "\" rel=\"stylesheet\">\n" +
			        "<link href=\"" + filesPath + "material_assets/css/roboto.min.css\" rel=\"stylesheet\">\n" +
              "<link href=\"" + filesPath + "material_assets/css/ripples.min.css\" rel=\"stylesheet\">\n" +
		          "<link href=\"" + filesPath + "css/particlejs.css\" rel=\"stylesheet\">\n" +
			        "<link href=\"" + filesPath + "css/blocks-helpers-framework.0.0.1.css\" rel=\"stylesheet\">\n" +
			        "<style>\n" + $('#userstyles').html() + "\n" + mFace + fs[0] + fs[2] + "</style>\n" +
              "<style>\n" + $('#userstylesForBody').html() + "</style>\n" +
              "\n</head>\n\t" +
              "<body class=\"" + fixedClass + "\">\n\t\n\t\n";


			var val = $('#userscripts').text();
			var userJs = val ? "<script id=\"userscripts\" type=\"text/javascript\">(function($){" + val + "})(window.jQuery);</script>\n" : '';
      var bottom_appendix =
			"\n\n<script src=\"https://code.jquery.com/jquery-2.1.1.min.js\"></script>\n" +
            "<script>window.jQuery || document.write('<script src=\"" + filesPath + "js/jquery-2.1.1.min.js\"><\\/script>')</script>\n" +
            "<script src=\"http://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n" +
            "<script>(function($){if (typeof $().modal != 'function'){document.write('<script src=\"js/bootstrap.min.js\"><\\/script>')}})(window.jQuery)</script>\n" +
            "<script src=\"" + filesPath + "js/jquery.fitvids.min.js\" type=\"text/javascript\"></script>\n" +
            "<script src=\"" + filesPath + "js/jquery.waitforimages.js\" type=\"text/javascript\"></script>\n" +
            "<script src=\"" + filesPath + "js/jquery.isotope.min.js\" type=\"text/javascript\"></script>\n" +
            "<script src=\"" + filesPath + "js/stellar.js\" type=\"text/javascript\"></script>\n" +
			      "<script src=\"" + filesPath + "js/ripples.min.js\" type=\"text/javascript\"></script>\n" +
            "<script src=\"" + filesPath + "js/material.min.js\" type=\"text/javascript\"></script>\n" +
			      "<script>(function($){$('body').append('<div id=\"check\" class=\"fa\">');var check=$('#check');if(check.css('display')!=='inline-block'){$('head').prepend('<link rel=\"stylesheet\" href=\"" + filesPath + "css/font-awesome.min.css\">');}check.remove();})(window.jQuery)</script>\n" +
            "<script src=\"" + filesPath + "js/custom-scripts.js\" type=\"text/javascript\"></script>\n" +  userJs + contactScript +"\n</body>\n" +
            "</html>";

            return base_tpl + formatSrc + bottom_appendix;
        },
		getFontsAndStyles: function(toExport) {
			var regFont = /font-family:(\w*\s?)*;/g,
				regTag = /.demo (\w*)?,.font-body/g,
				commonStyles = $('#font-styles').text(),
				mediaStyles = $('#font-media').text(),
				matchStyles = '', fontFace = '',
				stylesArray = [];

			if (commonStyles) {
				commonStyles = commonStyles.replace(regTag, 'html body') + (toExport ? '' : '\n');
				matchStyles += commonStyles;
			}
			if (mediaStyles) {
				mediaStyles = mediaStyles.replace(regTag, 'html body');
				matchStyles += mediaStyles;
			}
            stylesArray.push(commonStyles + '\n');

            if (matchStyles) {
				var fonts = matchStyles.match(regFont);

                if (fonts) {
					var mediaFonts = mediaStyles ? mediaStyles.match(regFont) : '';
					fonts += mediaFonts ? ',' + mediaFonts : '';
                    fonts = fonts.replace(/font-family:\s?/g, '');
                    fonts = fonts.split(',');
                    fonts = fonts.filter(function (thisArg, a, aa) {
                        var count = 0;
                        for (var i = a; i < aa.length; i++) {
                            if (aa.indexOf(thisArg, i) > -1) {
                                count += 1;
                            }
                        }
                        if (count == 1) {
                            return true;
                        }
                        return false;
                    });
					var fontFaceHtml = $('#font-face').text();
                    for (var i = 0; i < fonts.length; i++) {
                        var reg = new RegExp('@font-face\\s?{\\s?.*' + fonts[i] + '\\s?.*}');
                        fontFace += fontFaceHtml.match(reg) + '\n';
                    }
                }
            }

			if (toExport) return fontFace;

			stylesArray.push(fontFace + '\n');

			if (mediaStyles) {
				mediaStyles = mediaStyles.replace(/(.demo \w*?,.font-body)|(@media)|(\{)|(\})/g,
				function($$, $1, $2, $3, $4) {
					if ($1) {
						return '\n\thtml body'
					} else if ($2) {
						return '\n' + $$;
					} else if ($3){
						return ' ' + $$ + '\n\t';
					} else {
						return $$ + '\n';
					}
				});
			} else {
				mediaStyles = '';
			}
			stylesArray.push(mediaStyles ? mediaStyles : '');

			return stylesArray;
		}

    };

	return self;

});
