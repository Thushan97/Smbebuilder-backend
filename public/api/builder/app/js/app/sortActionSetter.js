define(['services/modeChanger', 'handleJsIds', 'services/localStorageService', 'browserDetect', 'services/eventListener'],
    function(modeChanger, handleJsIds, localStorageService, browserDetect, eventListener) {

        var self;

        return {
            makeElementsSortable: function() {

                var isReceive = false,
                    notFromSideBar = false,
                    isAnimate = false,
                    docHeight,
                    ua;

                self = this;
                /*$('.demo ul').on('dowbleClick', function(){
                	 $(this).sortable({
                		group: 'serialization',
                		onDrop: function (item, container, _super) {
                			alert("a");
                			container.el.removeClass("active")
                			_super(item)
                		}
                	});
                })*/



                $(".demo").sortable({
                    //appendTo: 'body',
                    appendTo: '.appendix',
                    connectWith: ".demo",
                    opacity: .85,
                    //dropOnEmpty: true,
                    // containment: ".demo",
                    //distance: 5,
                    //delay: 100,
                    scroll: true,
                    zIndex: 19999,
                    cursorAt: {
                        left: 100,
                        top: 100
                    },
                    handle: ".drag",
                    revert: true,
                    //placeholder: "ui-state-highlight",
                    placeholder: 'placeholder2',

                    helper: function() {
                        var dom = [];

                        dom.push("<div style=\"opacity:1;height:150px;width:100%;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;background: #ccc;	box-shadow: 5px 5px 10px rgba(50,50,50, .5);-moz-box-shadow: 5px 5px 10px rgba(50,50,50, .5);-webkit-box-shadow: 5px 5px 10px rgba(50,50,50, .5);\">",
                            "</div>");

                        return $(dom.join(''));
                    },
                    // axis: 'y',
                    tolerance: 'pointer',
                    //refreshPositions: true,
                    receive: function() {
                        isReceive = !isReceive;
                    },
                    stop: function(event, ui) {
                        $('.demo').find('section').css({
                            'background-position': '0 0',

                        });
                        $(ui.item).css('height', '');
                        /*$.stellar('refresh');*/

                        $('.demo').css({
                            'overflow': 'visible',
                            'box-shadow': 'none',
                            '-webkit-box-shadow': 'none',
                            '-moz-box-shadow': 'none'
                        });

                        $('.demo section').css({
                            'transform': '',

                        });
                        $(ui.item).find('.preview-layer-img').remove();
                        $(ui.item).find('.drag-row').removeClass('drag-row');
                        $(ui.item).find('.drag-row').removeClass('drag-row');
                        $(ui.item).find('.hide-in-sidebar').removeClass('hide-in-sidebar');
                        $(ui.item).find('a, button, input.btn.btn-success[type=submit]').click(function(event) {
                            event.preventDefault();
                        });
                        $(ui.item).removeClass('drag-action');
                        $('.box-layer').removeClass('drag-margin');
                        var uiNext = (ui.item[0].nextElementSibling);
                        /*$(uiNext).css({
                        'margin-top' : '0',
                        '-moz-transition':'none',
                        '-webkit-transition':'none',
                        'transition':'none'
                        });*/


                        $(ui.item).submit(function(event) {
                            event.preventDefault();
                        });

                        if (isReceive) {
                            if (/skew/.test($(ui.item).attr('class'))) {
                                $(ui.item).css('overflow-x', 'hidden');
                            }
                            //eventListener.emmitEvent('addDaggableSpans');
                            eventListener.emmitEvent('addSettingsBtn');
                            //eventListener.emmitEvent('addMovableSpans');
                            //eventListener.emmitEvent('addRemoveButtons');

                            isReceive = !isReceive;
                        }
                        //handleJsIds.handle(ui.item);
                        if (notFromSideBar) {
                            notFromSideBar = false;
                            //$(ui.item).children().removeClass('hide');
                            //$(ui.item).removeClass('sort-150px');
                        }
                        localStorageService.save();
                        // eventListener.emmitEvent('addDaggableSpans');
                        //eventListener.emmitEvent('addSettingsBtn');
                        // modeChanger.changeMode($('.modes.btn-success').attr('id'), ui.item);

                        modeChanger.changeMode('elements-mode', $('.demo .box-layer'));

                    },
                    start: function(event, ui) {
                        /*var next = $(ui.item).next();
                        var nextHeight = $(next).height()
                        $(next).css('padding-top', nextHeight);*/
                        $('.demo').css({
                            'overflow': 'hidden',
                        });
                        $('.demo section').css({
                            //'transform' : 'scale(0.8)',
                        });
                        $('.demo ').css({
                            'width': 'auto',
                            'box-shadow': '0 0 20px rgba(50,50,50, .5)',
                            '-webkit-box-shadow': '0 0 20px rgba(50,50,50, .5)',
                            '-moz-box-shadow': '0 0 20px rgba(50,50,50, .5)',
                        });
                        placeholderHeight = ui.helper.outerHeight();
                        ui.placeholder.css({
                            visibility: 'visible'
                        })
                        $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);

                        ui.item.unbind("click");

                        $('.demo').addClass('is-sortable');
                        sorting = true;
                        drag = true;

                        var thisHeight = $(ui.item).height();
                        var thisWidth = $(ui.item).width();
                        ui.placeholder.css({
                            visibility: 'visible',
                            border: '1px solid yellow'
                        });
                        ui.placeholder.height(placeholderHeight);

                        /*var uiNext = (ui.item[0].nextElementSibling);
                        //var thisHeight = (ui.item).outerHeight() + 40;
                        var thisHeight = (ui.item).outerHeight();
                        console.log(thisHeight);
                        ui.placeholder.height(10);
                        $(ui.item).css('height', '80px !important');*/
                        //scroll animation available only if item not from side-bar
                        if (!$(ui.item).has('img.preview-layer-img').length > 0) {
                            docHeight = $('.demo').height() - 380; //scroll down limit
                            $(ui.item).addClass('drag-action');
                            $('.box-layer').addClass('drag-margin');
                            //resize element on drag
                            notFromSideBar = true;

                            //$(ui.item).children().addClass('hide');
                            // $(ui.item).addClass('sort-150px');

                            ua = browserDetect.detect();
                        }
                    },
                    sort: function(e, ui) {


                    }
                });

            }
        }

    });
