define(['services/localStorageService', 'services/eventListener'], function (localStorageService, eventListener) {

    var editableElements = 'p,h1,h2,h3,h4,h5,h6,li:not(.dropdown-menu li, .footer-nav-links li),li.list-group-item,.text-editable:not(i), a:not(.importQbx, :empty, .m-help, .social-links li a, form, .carousel-control,.go-to-content,.fa-chevron-left,.fa-chevron-right),address,blockquote,cite,button,#countdown,.progress-bar',
        noteEditableElements = '.carousel-indicators li,.map-layer,a.importQbx, .m__move_arrow, .m__move_arrow i, .not-aditable,.img-block,#save-input,.settings-block, #addBlockBtn, #addBlockBtn .btn, input, .m__move_arrow>a,.navbar li, .footer-nav-links li, .dropdown-menu li,li.carousel-control a, li.carousel-control, .remove-block, i',
        editors = [];

    var self = {
        on: function () {
            $('.demo').find('.box-layer').find(editableElements).addClass('editable');
            $('.demo').find('.box-layer ul>li>a').parent().removeClass('editable').addClass('not-editable').removeAttr('contenteditable').removeAttr('data-medium-element', '');
            $('.demo').find('.box-layer').find(noteEditableElements).removeClass('editable');

            self.createMediumEditor();
			
			/*$('.demo').find('.editable:not(i)').attr('data-placeholder', 'Type text here');
			
			var notEditableIcons = $('.demo').find('[class*="fa-"], [class*="mdi-"]');
			var notEditableParent = $(notEditableIcons).parent();
			var isEmpty = notEditableParent.children().not(notEditableIcons);
			if ( isEmpty.length < 1){
				console.log('empty');
				notEditableParent.attr('data-placeholder', '');
			}*/
        },
        off: function () {
            for (var i = 0; i < editors.length; i++) {
                editors[i].deactivate();
            }
            editors = [];
            $('.demo').find('.editable').attr('contenteditable', 'false').removeClass('editable');
        },
        createMediumEditor: function () {
            for (var i = 0; i < editors.length; i++) {
                editors[i].deactivate();
            }
            editors = [];

            var editableElements = $('.demo').find('.box-layer').find('.editable').off('input').on('input', function () {
                var myInterval = setInterval(function () {
                    clearInterval(myInterval);
                    localStorageService.save();
                }, 3000);
            });
			
			
            var editor = new MediumEditor(editableElements, {
                buttonLabels: 'fontawesome',
                disableReturn: true,
				disableParagraphReturn: true,
				/*placeholder: {
					/* This example includes the default options for placeholder,
					   if nothing is passed this is what it used
					text: 'Type your text'	
				},*/
				allowMultiParagraphSelection: true,
                anchorInputPlaceholder: 'Type a link',
				//keyboardCommands: true,
                buttons: ['bold', 'italic'],
					paste: {
						/* This example includes the default options for paste,
						   if nothing is passed this is what it used */
						forcePlainText: true,
						cleanPastedHTML: true,
						cleanReplacements: ['p'],
						cleanAttrs: ['class', 'style', 'dir'],
						cleanTags: ['meta', 'p', 'span']
					},
					//keyboardCommands: true,
					/*keyboardCommands: {
        /* This example includes the default options for keyboardCommands,
           if nothing is passed this is what it used */
								/*commands: [
									{
										command: 'bold',
										key: 'B',
										meta: true,
										shift: false,
										alt: false
									},
									{
										command: 'italic',
										key: 'I',
										meta: true,
										shift: false,
										alt: false
									},
									{
										command: 'underline',
										key: 'U',
										meta: true,
										shift: false,
										alt: false
									},
									{
										command: 'br',
										key: 'enter',
										meta: true,
										shift: false,
										alt: false
									}
								],
							},*/
            });
            editors.push(editor);
        },
    };

    eventListener.addListener('elementsEditableOn', self.on);
    eventListener.addListener('elementsEditableOff', self.off);

    return self;
});