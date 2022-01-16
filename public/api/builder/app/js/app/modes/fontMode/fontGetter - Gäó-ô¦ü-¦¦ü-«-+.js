define(['modes/fontMode/variables', 'modes/fontMode/cssChanger', 'modes/fontMode/breakpoint'], function (variables, cssChanger, breakpoint) {

    var fontCtrl = $('.font-control', $('.font-settings')),
		fontFace,
		items;

    var self = {
        getFonts: function () {
            if (items) {
                return false
            }
            else {
                $.ajax('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD0rzoVRUZr_z4soNzi407LsRmg8VC8WCo')
					.done(function (e) {
					    items = e.items;
					    self.createFontList(items);
					
					}).fail(function (e) {

					})
            }

        },
        createFontList: function (fonts) {
		var y=0;
            for (var i = 0; i < fonts.length; i++) {
                //fontStyles.append('\n@font-face{\nfont-family:\'' + fonts[i].family + '\';\nsrc: url(' + fonts[i].files.regular + ');\n}');
				var classFont = fonts[i].family.replace(" ", "_");
				y	+=29;
                fontCtrl.append('<li id="'+ classFont +'" style="background-position:-10px -'+y+'px !important;"  title="' + fonts[i].files.regular + '">' + fonts[i].family + '</li>');
            }
            if (!fontFace) {
                fontFace = document.querySelector('#font-face');
				fontFace = fontFace ? $(fontFace) : $('<style id="font-face"></style>').appendTo('head');
            }

				
			var input = document.getElementById("myFontsinput");
			new Awesomplete(input, {list: document.querySelector("#myFontslist")});
			
			var currentInValue = $(input).val();
			
			

			$(input).on("awesomplete-selectcomplete", function(){
				
				var value =	$(this).val().replace(" ", "_");
				
			
				var fontContainer = $('.font-control'),
				topPos =  $('.font-control').find("#" + value);
				fontContainer.animate({
					scrollTop: topPos.offset().top - fontContainer.offset().top + fontContainer.scrollTop()
				});
				$(topPos).trigger("click")
				$(this).val( ' ' );
				$(this).trigger('blur').attr('placeholder', 'Search by font name');
			})
						
            $('li', fontCtrl).on('click', function () {
				var el = $(this);
                if (el.hasClass('active')) {
                    return false;
                }
				$('#myFontslist').find('.active').removeClass('active');
				$(this).addClass('active');

                var newFont = el.text(),
					source = el.attr('title'),
					regSource = new RegExp(source + '');

                if (!regSource.test(fontFace.text())) {
                    fontFace.prepend('\n@font-face{\nfont-family:' + newFont + ';\nsrc: url(' + source + ');}');
                    breakpoint.addFontFace('\n@font-face{\nfont-family:' + newFont + ';\nsrc: url(' + source + ');}');
                }
                cssChanger.changeCss('font-family', newFont);
            })
        },
    };

    return self;
});
