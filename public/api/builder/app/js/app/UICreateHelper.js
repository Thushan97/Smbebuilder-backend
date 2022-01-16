define(['codeGetter', 'services/modeChanger', 'services/operationsChanger', 'services/localStorageService', 'elementsBehaviorHelper', 'modes/cssEditCommon', 'modes/jsEditCommon', 'addSections', 'addSections2', 'addSections3', 'addSections4', 'addSections5', 'addSections6', 'services/importExport', 'services/addElements', 'jqueryHtmlCleanOld'],
    function(codeGetter, modeChanger, operationsChanger, localStorageService, elementsBehaviorHelper, cssEditCommon, jsEditCommon, addSections, addSections2, addSections3, addSections4, addSections5, addSections6, importExport) {
        var self;

        return {
            setupUI: function() {
                self = this;
                $('.alert').hide();

                self.decorateJQuery($);
                //here init sort and drag after updates check
                addSections.findUpdates();
                addSections2.findUpdates2();
                addSections3.findUpdates3();
                addSections4.findUpdates4();
                addSections5.findUpdates5();
                addSections6.findUpdates6();
                //self.requestMarket()
                self.setCurrentStateOfDemo();
                cssEditCommon.init();
                jsEditCommon.init();
                codeGetter.subscribe();
                importExport.subs();
                self.changeModeHandler();

                self.operationsSubscribe();
                self.someSubscribes();
                self.someThingHappens();
                self.sidebarActivate();

                //self.createMap();

                if (screen.width < 1920) {
                    $('#largeScreenBreakPoint').remove();
                }
                if ($('.demo').children().length < 1) {
                    $('.info-tip').css('display', 'block');
                    $('.sidebar-toggle').trigger('click')
                }
                $('.adBlockWrapperBtn').off('mouseenter').on('mouseenter', function() {
                    $('#topNavbar .sidebar-toggle').trigger('click');
                });
                $('.toggle-trigger').off('click').on('click', function() {
                    $('#topNavbar .sidebar-toggle').trigger('click');
                });
                $(window).resize(function() {
                    $("body").css("min-height", $(window).height() - 90);
                    $(".demo").css("min-height", $(window).height() - 160);
                });

                var isEmptyEls = $('.demo').find('h1,h2,h3,h4,h5,h6,p');
                if (isEmptyEls.is(':empty')) {
                    $(this).text('Type text here');
                }
                //$(document).find('i.editable').attr('data-placeholder', '');



                $('.demo').wrap('<div class="demo-wrapper"></div>');
                $('.demo-wrapper').css({
                    overflow: 'hidden',
                    width: '100%',
                    display: 'block'

                });




                /*
                //add padding to body when fixed navbar find Function
                $(mainbodyStyle).innerHTML= '';
                var mainbodyStyle = $('#userstylesForBody');
                //clear styles before change it to fixed .navbar


                var fixedTopMenu = $('.demo').find('.navbar-fixed-top');
                var fixedTopHeight = $(fixedTopMenu).height();
                if(fixedTopMenu.length == 1){
                		console.log(fixedTopHeight);
                		console.log(fixedTopMenu.length);
                		$(mainbodyStyle).html('body{\npadding-top:\n' + fixedTopHeight + 'px !important;\n} \n body.details-mode{\npadding-top:\n 0px !important;\n}\n #iframePreviewMode{\nmargin-top:-28px !important;\n}');
                		$('body').css('padding-top' ,fixedTopHeight);
                		console.log(fixedTopHeight);
                }

                else if ( fixedTopHeight !== null)
                	{

                		$(mainbodyStyle).html('body{\npadding-top:\n 0px !important;\n} \n #iframePreviewMode{\nmargin-top:34px !important;\n}');

                	}

                	else {

                		$(mainbodyStyle).innerHTML = '';

                	}*/


                $('.dropdown-menu').on('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault(event);
                });

                $('.dropdown-menu li>a').on('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault(event);
                });

                /*$(window).load(function() {
                    $.stellar({
                        positionProperty: 'transform',
                        responsive: true,
                        horizontalScrolling: false,
                        verticalOffset: 0,
                        horizontalOffset: 0
                    });
                });*/

                $('section').css('background-position', '');
                $('[data-toggle="tooltip"]').tooltip();

                $('.buyblocks').on('click', function() {
                    $('#myModalBuyBLOCKS').modal('show');
                });

                //$.material.init();
                //$.material.ripples();

                $('ul.dropdown-menu a').on('click', function(event) {
                    var events = $._data(document, 'events') || {};
                    events = events.click || [];
                    for (var i = 0; i < events.length; i++) {
                        if (events[i].selector) {

                            //Check if the clicked element matches the event selector
                            if ($(event.target).is(events[i].selector)) {
                                events[i].handler.call(event.target, event);
                            }

                            // Check if any of the clicked element parents matches the
                            // delegated event selector (Emulating propagation)
                            $(event.target).parents(events[i].selector).each(function() {
                                events[i].handler.call(this, event);
                            });
                        }
                    }
                    event.stopPropagation(event); //Always stop propagation
                    event.preventDefault(event);
                });

                $('#unspl_id_to_go').on('click', function() {
                    var url = $(this).attr('href')
                    window.open(url, '_blank');
                })

            },

            requestMarket: function() {



                var marketTab = $('#market-templates-updates');
                var uri = 'http://demo.bootstraptor.com/scripts/market.json';
                $.ajax(uri).done(function(data) {
                    var prod = data.products;
                    console.log(prod)
                    for (var i = 0; i < prod.length; i++) {
                        marketTab.append('<li class="col-md-4"><img class="img-responsive" src="' + prod[i].info.thumbnail + '" /><a href="' + prod[i].info.link + '" target="_blank" class="btn btn-success btn-block">Get template</a></li>');
                    }

                });

            },



            createMap: function() {
                console.log('map starting');
                $('.demo').find('.map-layer').children().html('');
                var gmapElement = $('.demo').find('.map-layer').children();
                console.log(gmapElement);
                gmapElement.attr('style', '');

                //draggable need for map widget check & disable if 1 map instance exist - after runtime load
                $(".md-widget-elements .md-widget-wrapper-drag.map").draggable();

                //check map if {exist
                if (gmapElement.length > 0) {
                    $(".md-widget-elements .md-widget-wrapper-drag.map").draggable('disable');
                    console.log('map' + gmapElement.length);
                    var mapID = $(gmapElement).attr('id');
                    var latNewData = $(gmapElement).attr('data-map-lat');
                    var lngNewData = $(gmapElement).attr('data-map-lng');
                    var mapHeight = $(gmapElement).attr('data-map-height');

                    $(gmapElement).css('height', mapHeight + 'px')
                    var mapRenderUserScripts = $('#userMapScripts');

                    //create map script for user out html and preview
                    var newMapNewScriptCode = 'var geocoder = new google.maps.Geocoder();\n' +
                        'var infowindow = new google.maps.InfoWindow();\n' +
                        'function initialize() {\n' +
                        'var latlng = new google.maps.LatLng( ' + latNewData + ',' + lngNewData + ' );\n' +
                        'var myOptions = { \n' +
                        'zoom: 8,\n' +
                        'center: latlng,\n' +
                        'mapTypeId: google.maps.MapTypeId.ROADMAP\n' +
                        '};\n' +
                        'var map = new google.maps.Map(document.getElementById("' + mapID + '"),\n' +
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
                        'if (results[1]) { map.setZoom(12); \n' +
                        'var marker = new google.maps.Marker({\n' +
                        'position: latlng, \n' +
                        'map: map, \n' +
                        'animation: google.maps.Animation.DROP,'
                    '}); \n' +
                    'infowindow.setContent(results[1].formatted_address); \n' +
                    'infowindow.open(map, marker); \n' +
                    '} \n' +
                    'else { console.log(\'No results found\'); } } \n' +
                    'else { console.log(\'Geocoder failed due to: \' + status ); } \n' +
                    '}); \n' +

                    '}\n' +
                    'google.maps.event.addDomListener(window, "load", initialize);\n';


                    console.log(newMapNewScriptCode);
                    mapRenderUserScripts.html(newMapNewScriptCode);


                    //run google map init  in runtime after page reload
                    var geocoder = new google.maps.Geocoder();
                    var infowindow = new google.maps.InfoWindow();

                    function initialize() {
                        console.log('map initialized');
                        var latlng = new google.maps.LatLng(latNewData, lngNewData);
                        var myOptions = {
                            zoom: 8,
                            center: latlng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        var map = new google.maps.Map(document.getElementById(mapID),
                            myOptions);
                        geocodeLatLng(geocoder, map, infowindow);
                    }

                    //var geocoder = new google.maps.Geocoder();
                    //var infowindow = new google.maps.InfoWindow();


                    function geocodeLatLng(geocoder, map, infowindow) {
                        var latlngData = latNewData + ',' + lngNewData;
                        console.log("data:" + latlngData);
                        var latlngStr = latlngData.split(',', 2);
                        var latlng = {
                            lat: parseFloat(latlngStr[0]),
                            lng: parseFloat(latlngStr[1])
                        };
                        console.log(latlng);
                        geocoder.geocode({
                                'location': latlng
                            },
                            function(results, status) {
                                if (status === google.maps.GeocoderStatus.OK) {
                                    if (results[1]) {
                                        map.setZoom(12);
                                        var marker = new google.maps.Marker({
                                            position: latlng,
                                            map: map,
                                            animation: google.maps.Animation.DROP,
                                        });
                                        infowindow.setContent(results[1].formatted_address);
                                        infowindow.open(map, marker);
                                    } else {
                                        console.log('No results found');
                                    }
                                } else {
                                    console.log('Geocoder failed due to: ' + status);
                                }
                            });

                    }
                    //google.maps.event.addDomListener(window, "load", initialize);
                    initialize();




                }

            },

            setCurrentStateOfDemo: function() {
                localStorageService.tryRevertState();
                $('.sidebar').find('.img-wrapper').children().unwrap('<span class="img-wrapper"></span>');
                $('.demo').find('.img-wrapper').children().unwrap('<span class="img-wrapper"></span>');
                modeChanger.changeMode('elements-mode');
                var isheaderNavFixed = $('.demo').find('header');
                if (isheaderNavFixed.hasClass('navbar-fixed-top')) {
                    $('body').removeClass('is-navbar-fixed-top');
                    $('body').addClass('is-navbar-fixed-top');
                }

            },

            operationsSubscribe: function() {
                $('#undo-operation,#redo-operation').click(function() {
                    operationsChanger.make($(this).attr('id'));
                });
            },
            changeModeHandler: function() {

                var prevMode = 'elements-mode';

                $('.modes').on('click', function(e) {
                    if ($(this).attr('id') == 'preview-mode') {
                        if ($(this).hasClass('btn-success')) {
                            $(this).removeClass('btn-success').html('<i class="mdi-av-play-arrow"</i>');
                            $('#bs-example-navbar-collapse-1').find('.modes:not(.btn-success), .undo-redo, .editMode').prop('disabled', false);
                            $('#topNavbar').removeClass('preview-trigger');
                            $('#' + prevMode).trigger('click');
                            return;
                        } else {
                            $(this).html('<i class="mdi-navigation-close" data-toggle="tooltip" data-placement="right" title="Close"></i>');
                            $('#topNavbar').addClass('preview-trigger');
                        }
                    } else if ($(this).attr('id') == 'font-mode') {
                        if ($(this).hasClass('btn-success')) {
                            $(this).removeClass('btn-success').html('	<img src="css/img/font.png" data-toggle="tooltip" data-placement="right" title="Font styles"/>');
                            $('#bs-example-navbar-collapse-1').find('.modes:not(.btn-success), .undo-redo, .editMode').prop('disabled', false);
                            $('#overlayFontMode').css('display', 'none');
                            $('#' + prevMode).trigger('click');
                            return;
                        } else {
                            $(this).html('<i class="mdi-navigation-close" data-toggle="tooltip" data-placement="right" title="Close"></i>');
                        }
                    } else {
                        $('#preview-mode').html('<i class="mdi-av-play-arrow"></i>');
                        prevMode = $(this).attr('id');
                    }

                    if (!$(this).hasClass('btn-success')) {
                        $('.modes.btn-success').removeClass('btn-success');
                        $(this).addClass('btn-success');
                        modeChanger.changeMode($(this).attr('id'));
                    }
                });
            },
            someSubscribes: function() {

                /*$.stellar({
                    responsive: true,
                    horizontalScrolling: false,
                    verticalOffset: 0,
                    horizontalOffset: 0
                });*/

                $('ul.dropdown-menu a').on('click', function(event) {
                    var events = $._data(document, 'events') || {};
                    events = events.click || [];
                    for (var i = 0; i < events.length; i++) {
                        if (events[i].selector) {

                            //Check if the clicked element matches the event selector
                            if ($(event.target).is(events[i].selector)) {
                                events[i].handler.call(event.target, event);
                            }

                            // Check if any of the clicked element parents matches the
                            // delegated event selector (Emulating propagation)
                            $(event.target).parents(events[i].selector).each(function() {
                                events[i].handler.call(this, event);
                            });
                        }
                    }
                    event.stopPropagation(event); //Always stop propagation
                    event.preventDefault(event);
                });

                $('section').css('background-position', '');

                $('.bootswatch a').click(function(event) {
                    event.preventDefault(event);
                    event.stopPropagation(event);

                    $('html')[0].style.overflow = 'hidden';
                    var loader = Stashy.Loader('#entrance--window2');
                    $('#entrance--window2').css('display', 'block');
                    loader.on("absolute", "200px", "#fff", "prepend");


                    entranceInterval = setInterval(function() {

                        $('html')[0].style.overflow = 'visible';
                        $('#entrance--window2').css('display', 'none');
                        clearInterval(entranceInterval);
                        loader.off();


                    }, 1200);


                    var parent = $(this).parent();
                    if (parent.hasClass('active')) {
                        $('#reset-styles').trigger('click');
                        return false;
                    }
                    $('#styles_bs').find('.bootswatch.active')
                        .removeClass('active')
                        .find('i.fa-check-square-o')
                        .remove();
                    parent.addClass('active')
                        .prepend("<i class='fa fa-check-square-o fa-2x text-success okIcon'></i>");

                    var styleLink = $(this).next().find('input'),
                        styleVal = $(styleLink).attr('value'),
                        basicStyles = $('#stylesChange');
                    console.log(styleVal);
                    $(basicStyles).attr('href', 'https:' + styleVal);
                });

                $('.show').click(function() {
                    var prev = $(this).parent().next().next();
                    console.log(prev);
                    prev.slideToggle("slow");
                });


                $('.card-reveal .close').on('click', function() {
                    $(this).parent().slideToggle('slow');
                });

                $('[data-toggle="tooltip"]').tooltip();

                $('.dropdown-menu').on('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault(event);
                });

                $('.dropdown-menu li>a').on('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault(event);
                });



                $('#reset-styles').click(function(event) {
                    event.preventDefault(event);
                    event.stopPropagation(event);
                    $('#styles_bs').find('.bootswatch.active')
                        .removeClass('active')
                        .find('i.fa-check-square-o')
                        .remove();

                    var basicStyles = $('#stylesChange').attr('href', 'http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
                });

                $('#reset-fonts').click(function(event) {
                    event.preventDefault(event);
                    event.stopPropagation(event);
                    $('#userfonts').html('');
                    $('#g-fonts').attr('href', '');
                    $('#fonts .font').removeClass('active')
                        .find('.okIcon').remove();
                });


            },


            //left sidebar
            /*sidebarActivate: function(){
					 var sidebarStatus = false;
                $('.sidebar-toggle').bind('click', function (event) {
                    event.preventDefault(event);
                    if (!sidebarStatus) {
                        $('.sidebar').animate({
                            marginLeft: "290px",
                            opacity: "1"
                        }, 300);

                        $('.demo').animate({
                            marginLeft: "290px",
                            opacity: "1"
                        }, 300);
                       // $('.navbar-fixed-top.navbar-custom-bl').removeClass('f-w-nav');
                    }
                    else {
                        $('.sidebar').animate({
                            marginLeft: "-290px",
                            opacity: "1"
                        }, 300);

                        $('.demo').animate({
                            marginLeft: "48px",
                            opacity: "1"
                        }, 300);
                        //$('.navbar-fixed-top.navbar-custom-bl').addClass('f-w-nav');
                    }
                    sidebarStatus = !sidebarStatus;
                });

			},*/

            sidebarActivate: function() {

                var sidebarStatus = false;
                $('.sidebar-toggle').bind('click', function(event) {
                    //                    event.preventDefault(event);
                    if (!sidebarStatus) {
                        $('.sidebar').animate({
                            marginLeft: "290px",
                            opacity: "1"
                        }, 300);
                        $('.sidebar').addClass('m-left-shadow');
                        $('.sidebar-toggle i').addClass('mdi-rotate');

                        // $('.navbar-fixed-top.navbar-custom-bl').removeClass('f-w-nav');
                    } else {
                        $('.sidebar').animate({
                            marginLeft: "-290px",
                            opacity: "1"
                        }, 300);
                        $('.sidebar').removeClass('m-left-shadow');
                        $('.sidebar-toggle i').removeClass('mdi-rotate');


                        //$('.navbar-fixed-top.navbar-custom-bl').addClass('f-w-nav');
                    }
                    sidebarStatus = !sidebarStatus;
                });

            },
            someThingHappens: function() {

                $("#accordion").accordion({
                    active: false,
                    heightStyle: "fill",
                    collapsible: true
                });
                $("#accordion-styles").accordion({
                    active: false,
                    heightStyle: 'panel',
                    collapsible: true,
                    autoHeight: false,
                });


                /*$.stellar({
                    responsive: true,
                    horizontalScrolling: false,
                    verticalOffset: 0,
                    horizontalOffset: 0
                });*/
                /*$.stellar('refresh');*/
                $(".container").fitVids();

                $('[data-toggle="tooltip"]').tooltip();

                $('.dropdown-menu').on('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault(event);
                });

                $('.dropdown-menu li>a').on('click', function(event) {
                    event.stopPropagation();
                    event.preventDefault(event);
                });


                $('#fonts .font a').click(function(event) {
                    event.preventDefault(event);

                    $('#userfonts').html('');
                    $('#g-fonts').attr('href', '');

                    var parent = $(this).parent().parent();
                    if (parent.hasClass('active')) {
                        parent.removeClass('active').find('.okIcon').remove();
                        return false;
                    }
                    $('#fonts .font.active').removeClass('active')
                        .find('.okIcon').remove();

                    var okIcon = "<i class='fa fa-check-square-o fa-2x text-success okIcon'></i>",
                        fontName = $(this).text(),
                        newStyleAttr = "font-family:" + fontName + ",sans-serif";

                    parent.addClass('active').prepend(okIcon);
                    $('#g-fonts').attr('href', "http://fonts.googleapis.com/css?family=" + fontName);
                    $('#userfonts').html('html body .demo * {\n' + newStyleAttr + ';\n}')
                });

                $('#startNew').on('click', function() {

                    $('#start-new-modal').modal('show');
                    $('#confirm-start-new').off('click').on('click', function() {
                        localStorageService.removeAll();
                        localStorageService.removeAllFonts();
                        $('.demo').html('');
                        $('#userstyles').html('');
                        $('#userfonts').html('');
                        $('#font-styles').html('');
                        $('#font-media').html('');
                        $('#font-face').html('');
                        $('#userscripts').html('');
                        $('#start-new-modal').modal('hide');
                        $('.info-tip').css('display', 'block');
                        if ($('body').hasClass('is-navbar-fixed-top')) {
                            $('body').removeClass('is-navbar-fixed-top');
                        }

                    });
                });
            },
            decorateJQuery: function(a) {
                a.fn.extend({
                    outerHTML: function(b) {
                        if (!this.length) return null;
                        else if (b === undefined) {
                            var c = this.length ? this[0] : this,
                                d;
                            if (c.outerHTML) d = c.outerHTML;
                            else d = a(document.createElement("div")).append(a(c).clone()).html();
                            if (typeof d === "string") d = a.trim(d);
                            return d
                        } else if (a.isFunction(b)) {
                            this.each(function(c) {
                                var d = a(this);
                                d.outerHTML(b.call(this, c, d.outerHTML()))
                            })
                        } else {
                            var e = a(this),
                                f = [],
                                g = a(b),
                                h;
                            for (var i = 0; i < e.length; i++) {
                                h = g.clone(true);
                                e.eq(i).replaceWith(h);
                                for (var j = 0; j < h.length; j++) f.push(h[j])
                            }
                            return f.length ? a(f) : null
                        }
                    }
                })
            }
        };
    });
