define(['modes/contentChangeIcon/iconsClassContainer', 'services/eventListener'], function (iconsClassContainer, eventListener) {

    var self,
		iconModal,
		iconSizeHolder,
		previousIconClass,
		current;

    return {
        iconsChooserEnter: function (el) {

            if (typeof iconModal === 'undefined' || iconModal.length == 0) {
                self = this;
                iconModal = $('#icons-choose-modal');
                iconSizeHolder = $('.icon-size-holder', iconModal);
                self.createIcons();
                $('#save-icon').on('click', self.saveChanges);
            }

            current = el;
            previousIconClass = [];

            var sizeClass = current.attr('class').match(/fa-[0-9]x|fa-lg/),
				spin = /fa-spin/.test(current.attr('class'));

            // если у элемента уже выбран класс, задающий размер или поворот - включем нужный input
            sizeClass ? $('input[data-icon-size=' + sizeClass + ']', iconSizeHolder).prop('checked', true) : $('input[data-icon-size=none]', iconSizeHolder).prop('checked', true);
            $('input[type=checkbox]', iconSizeHolder).prop('checked', spin);

            iconModal.modal('show');

        },
        createIcons: function () {
            function createFontAwesomeIcons(icons) {
                var faCont = $('#showFontAwesomeIcons').children();
                for (j = 0; j < icons.length; j++) {
                    faCont.append('<h2>' + icons[j].title + '</h2>');
                    for (var i = 0; i < icons[j].classes.length; i++) {
                        faCont.append('<label class="fa-hover"><input type="radio" name="fa"/><i class="fa ' + icons[j].classes[i] + '"></i>' + icons[j].classes[i] + '</label>')
                    }
                }
            };

            function createBootstrapIcons(icons) {
                var bsCont = $('#showBootstrapIcons').children();
                bsCont.append('<h2>' + icons[0].title + '</h2>');
                for (var i = 0; i < icons[0].classes.length; i++) {
                    bsCont.append('<label><input type="radio" name="bs"/><i class="' + icons[0].classes[i] + '"></i>' + icons[0].classes[i] + '</label>')
                }
            }; 
			
		/*	var input = document.getElementById("myIconsList");
			new Awesomplete(input, {list: document.querySelector("#bootstrapIconsList")});
			*/
			//var currentIconValue = $(input).val();
			
			

			/*$(input).on("awesomplete-selectcomplete", function(){
				
				//var value =	$(this).val().replace(" ", "_");
				
			
				var iconContainer = $('#showBootstrapIcons');
				//topPos =  $('.font-control').find("#" + value);
				$(iconContainer).animate({
					scrollTop: topPos.offset().top - iconContainer.offset().top + iconContainer.scrollTop()
				});
				//$(topPos).trigger("click")
				//$(this).val( ' ' );
				//$(this).trigger('focus').attr('placeholder', 'Search by font name');
			})*/
			
			

            createFontAwesomeIcons(iconsClassContainer.getIconsClass())
            createBootstrapIcons(iconsClassContainer.getIconsClass('material'));
            
        },
        classInherit: function () {
            var oldClasses = current.attr('class').split(' '),
				inherit = [];
            for (var i = 0; i < oldClasses.length; i++) {
                //добавляем в массив все классы кроме fa/glyphicon или fa-/glyphicon- 
                if (oldClasses[i].search(/(^fa-\w*-?\w*)|(^fa$)|(^mdi-\w*-?\w*)|(^mdi$)/) < 0 ||
					oldClasses[i].search(/(^fa-li$)/) > -1) {
                    inherit.push(oldClasses[i]);
                } else {
                    /*
						добавляем в массив все классы кроме fa-spin, fa-lg, fa-0-9x. 
						Если пользователь не выбрал ни одной иконки в попапе, 
						а только задал размер или поворот, в getChoosen возвращаем этот массив
					*/
                    if (!/fa-[0-9]x|fa-spin|fa-lg/.test(oldClasses[i])) {
                        previousIconClass.push(oldClasses[i]);
                    }
                }
            }
            //преобразуем массив в строку, заменяем в ней все запятые на пробелы и возвращаем
            return (inherit + '').replace(/,/g, ' ');
        },
        getChoosen: function (tab) {
            var choosen = iconModal.find('input[name=' + tab + ']:checked').siblings().attr('class');
            if (choosen) {
                return ' ' + choosen;
            } else {
                //преобразуем массив в строку, добавляя в начале пробел(чтобы отделить прежние классы), заменяем в ней все запятые на пробелы и возвращаем
                return (' ' + previousIconClass).replace(/,/g, ' ');
            }
        },
        saveChanges: function () {
            var newIconClass = self.classInherit(current),
				activeTab = $('li.active>a', iconModal).attr('href'),
				choosenSizeClass = $('input[type=radio]:checked', iconSizeHolder).attr('data-icon-size');

            newIconClass += activeTab == '#showBootstrapIcons' ? self.getChoosen('bs') : self.getChoosen('fa')

            if (choosenSizeClass != 'none') {
                newIconClass += ' ' + choosenSizeClass;
            }

            if ($('input[type=checkbox]', iconSizeHolder).prop('checked')) {
                newIconClass += ' fa-spin';
            }

            current.attr('class', newIconClass);

            iconModal.modal('hide');
            eventListener.emmitEvent('tooltipEvents', '');
        }
    }
});