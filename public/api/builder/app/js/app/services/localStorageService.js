define(['services/eventListener', 'services/stateChecker'],
	function (eventListener, stateChecker) {

	    var messageShown = false;
	    /*http://stackoverflow.com/questions/3392032/localstorage-object-is-undefined-in-ie      try catch block*/

	    return {
	        save: function () {
	            try {

	                // Same code as in htmlBehaviorHelper.unwrapImg. Need to create service for cleaning html.

	                eventListener.emmitEvent('unwrapImages');;
	                var demoCurrent = $('.demo').html();
	                if (stateChecker.getActiveMode() == 'content') {
	                    eventListener.emmitEvent('wrapImages');;
	                }
	                var demos = localStorage.getItem('demoStates');

	                if (demos == null) {
	                    demos = {
	                        items: [],
	                        state: 0
	                    };
	                }
	                else {
	                    demos = JSON.parse(localStorage['demoStates']);

	                    // If state is not last, need to cut all after state number
	                    if (demos.state !== demos.items.length - 1) {
	                        demos.items.splice(demos.state + 1, demos.items.length - 1);
	                    }
	                }

	                // if more or equal to 40 items, need to cut until 39 elements
	                if (demos.items.length >= 40) {
	                    demos.items.splice(0, 1);
	                }


	                //Adding new values
	                demos.items.push(demoCurrent);
	                demos.state = demos.items.length - 1;

	                localStorage.setItem('demoStates', JSON.stringify(demos));

	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },
	        getDemosAndState: function () {
	            try {
	                var demos = localStorage.getItem('demoStates');

	                if (demos == null) {
	                    return null;
	                }

	                return JSON.parse(localStorage['demoStates']);
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },

	        saveNewState: function (newState) {
	            try {
	                var demos = localStorage.getItem('demoStates');

	                if (demos == null) {
	                    return;
	                }

	                demos = JSON.parse(localStorage['demoStates']);
	                demos.state = newState;
	                localStorage.setItem('demoStates', JSON.stringify(demos));
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },
	        saveCssAndJs: function () {
	            try {
	                localStorage.setItem('js', JSON.stringify($('#userscripts').text()));
	                localStorage.setItem('css', JSON.stringify($('#userstyles').text()));
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },  
			saveFonts: function () {
	            try {
	                localStorage.setItem('font-styles', JSON.stringify($('#font-styles').text()));
	                localStorage.setItem('font-face', JSON.stringify($('#font-face').text()));
	                localStorage.setItem('font-media', JSON.stringify($('#font-media').text()));
	               
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },
			
			removeAllFonts: function () {
	            try {
	                localStorage.removeItem('font-styles');
	                localStorage.removeItem('font-face');
	                localStorage.removeItem('font-media');
	               
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },
			removeLgFonts: function () {
	            try {
	                localStorage.removeItem('font-styles');
	               
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },
			removeSmFonts: function () {
	            try {
	                localStorage.removeItem('media-styles');
	               
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },

	        tryRevertState: function () {
	            try {
	                var css = localStorage.getItem('css');
	                var js = localStorage.getItem('js');
	                var carouselCode = localStorage.getItem('carouselJavascript');
	                var fontStyle = localStorage.getItem('font-styles');
	                var fontFace = localStorage.getItem('font-face');
	                var fontMedia = localStorage.getItem('font-media');

					var fontStyleTag = $(document).find('#font-styles')
					
	                var demo = this.getDemosAndState();
	                if (demo !== null) {
	                    $('.demo').html(demo.items[demo.state]);
	                }

	                if (fontStyle !== null) {
	                    $(fontStyleTag).html(JSON.parse(fontStyle));
						console.log( $(fontStyleTag))
	                } 
					if (fontFace !== null) {
	                    $('#font-face').html(JSON.parse(fontFace));
	                } 
					if (fontMedia !== null) {
	                    $('#font-media').html(JSON.parse(fontMedia));
	                } 
					if (js !== null) {
	                    $('#userscripts').html(JSON.parse(js));
	                }

	                if (css !== null) {
	                    $('#userstyles').html(JSON.parse(css));
	                }

	                if (carouselCode !== null) {
	                    $('#usersCarouselScripts').append(carouselCode);
	                }

	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },
	        removeAll: function () {
	            try {
	                localStorage.removeItem('demoStates');
	                localStorage.removeItem('carouselJavascript');
	                localStorage.removeItem('js');
	                localStorage.removeItem('css');
	                localStorage.removeItem('font-styles');
	                localStorage.removeItem('font-face');
	                localStorage.removeItem('font-media');
	            } catch (exc) {
	                if (typeof localStorage === 'undefined' && !messageShown) {
	                    this.disableLocalStorage();
	                }
	            }
	        },
	        disableLocalStorage: function () {
	            alert('LocalStorage is available on HTTP web sites.\n You can not use undo/redo operations in this browser.\n If you want to use localStorage, use localStorage compatable browsers.');
	            messageShown = true;
	            $('#undo-operation').prop('disabled', true);
	            $('#redo-operation').prop('disabled', true);
	        },
	        saveForStylesMode: function (element) {
	            try {
	                var styleModeElementStates = localStorage.getItem('styleModeElementStates');

	                if (styleModeElementStates == null) {
	                    styleModeElementStates = {
	                        states: [],
	                        stateId: 0
	                    };
	                }
	                else {
	                    styleModeElementStates = JSON.parse(localStorage['styleModeElementStates']);

	                    // If state is not last, need to cut all after state number
	                    if (styleModeElementStates.stateId !== styleModeElementStates.states.length - 1) {
	                        styleModeElementStates.states.splice(styleModeElementStates.stateId + 1, styleModeElementStates.states.length - 1);
	                    }
	                }

	                // if more or equal to 100 items, need to cut until 99 elements
	                if (styleModeElementStates.states.length >= 100) {
	                    styleModeElementStates.states.splice(0, 1);
	                }

	                //Adding new values
	                styleModeElementStates.states.push(element);
	                styleModeElementStates.stateId = styleModeElementStates.states.length - 1;

	                localStorage.setItem('styleModeElementStates', JSON.stringify(styleModeElementStates));
	            }
	            catch (exception) {
	            }
	        },
	        removeForStylesMode: function () {
	            localStorage.removeItem('styleModeElementStates');
	        },
	        getStylesModeStates: function () {
	            try {
	                var styleModeElementStates = localStorage.getItem('styleModeElementStates');

	                if (styleModeElementStates == null) {
	                    return null;
	                }

	                return JSON.parse(localStorage['styleModeElementStates']);
	            } catch (exc) {
	            }
	        },
	        saveNewStateForStylesMode: function (newState) {
	            try {
	                var styleModeElementStates = localStorage.getItem('styleModeElementStates');

	                if (styleModeElementStates == null) {
	                    return;
	                }

	                styleModeElementStates = JSON.parse(localStorage['styleModeElementStates']);
	                styleModeElementStates.stateId = newState;
	                localStorage.setItem('styleModeElementStates', JSON.stringify(styleModeElementStates));
	            } catch (exc) {

	            }
	        }
	    };
	});