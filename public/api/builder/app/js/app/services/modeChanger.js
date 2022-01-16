define(['modes/contentMode', 'modes/previewMode', 'modes/htmlMode', 'modes/elementsMode', 'modes/fontMode/fontMode', 'services/stateChecker', 'services/eventListener'],
	function (contentMode, previewMode, htmlMode, elementsMode, fontMode, stateChecker, eventListener) {

	    var sidebarWasClosed = true;

	    self = {
	        changeMode: function (id, element) {

	            self.unbindAllModes();
	            $('body').removeClass('preview-mode elements-mode html-mode font-mode yin');
	            $('body').addClass('yin');
	            $('body').addClass(id);

	            switch (id) {
	                case 'content-mode':
	                    self.checkSidebarState('content');
	                    contentMode.activate(element);
	                    break;
	               /* case 'details-mode':
	                    self.checkSidebarState('details');
	                    detailsMode.activate(element);
	                    break;*/
	                case 'html-mode':
	                    self.checkSidebarState('html');
	                    htmlMode.activate();
	                    break;
	                case 'elements-mode':
	                    self.checkSidebarState('elements');
	                    elementsMode.activate(element);
	                    break;
	                case 'preview-mode':
	                    $('#iframePreviewMode').css('display', 'visible');
	                    self.checkSidebarState('preview');
	                    previewMode.activate(element);
	                    break;
	                case 'font-mode':
	                    self.checkSidebarState('font');
	                    fontMode.activate();
	                    break;
	            }

	            stateChecker.setActiveMode(id.replace(/-\D*/, ''));
	        },
	       checkSidebarState: function (mode) {

	            //var sideBar = document.getElementsByClassName('sidebar')[0]; //moved to modal
	            var sideBar = document.getElementsByClassName('sidebar')[0];
	            var sidebarIsOpen = true;
	            if (isNaN(parseInt(sideBar.style.marginLeft)) || parseInt(sideBar.style.marginLeft) == -290) {
	                sidebarIsOpen = false;
	            }

	            var sideBarToggle = document.getElementsByClassName('sidebar-toggle')[0];

	            if (mode == 'preview' || mode == 'font') {
	                sidebarWasClosed = sidebarIsOpen ? false : true;
	                if (sidebarIsOpen) {
	                    sideBarToggle.click();
	                }
	                sideBarToggle.disabled = true;
	                var buttons = document.getElementById('bs-example-navbar-collapse-1').querySelectorAll('.modes, .undo-redo, .editMode');

	                for (var i = 0; i < buttons.length; i++) {
	                    if (buttons[i].className.indexOf('btn-success') == -1) {
	                        buttons[i].disabled = true;
	                    }
	                }
	            }
	            else {
	                sideBarToggle.disabled = false;
	                if (!sidebarWasClosed && !sidebarIsOpen) {
	                   // sideBarToggle.click(); //this line comment to prevent sidebar open when click to modes
	                }
	            }
	        },
	        unbindAllModes: function () {
	           // detailsMode.unbind();
	            contentMode.unbind();
	            previewMode.unbind();
	            fontMode.unbind();
	            elementsMode.unbind();
	            htmlMode.unbind();
	        }
	    };
	    return self;
	});