define(function () {

    var self;

    return {
        handle: function () {
            self = this;
            self.handleAccordionIds();
            self.handleCarouselIds();
            self.handleCarousel2();
            self.handleTabsIds();
            self.handleCountdown();
            self.handleParallax();
        },
        handleCarousel2: function () {
            var carousel = $('.demo #myCarousel2');
            var rand = self.randomNumber();
            var newId = "carousel-" + rand;
            carousel.attr('id', newId).find('li[data-target]').attr('data-target', '#' + newId);

            if (carousel)
            {
                var newCode = " var clickEvent" + rand + " = false;" +
                "$('#" + newId + "').find('li[data-target]').click(function () {" +
                "   $(this).parent().find('.active').removeClass('active');" +
                "  $(this).addClass('active');" +
                "clickEvent" + rand + " = true;" +
                "});" +
                    "$('#" + newId + "').bind('slide.bs.carousel', function (e) {" +
                "  if (!clickEvent" + rand + ") {" +
                "  var nextLi = $('#" + newId + "').find('li.carousel-control.active').removeClass('active').next().addClass('active');" +
                "  if (nextLi.length == 0) {" +
                "  $('#" + newId + "').find('li.carousel-control').first().addClass('active');" +
                "  }}" +
                "  clickEvent" + rand + " = false;});";

                $('#usersCarouselScripts').append(newCode);

                var oldCode = localStorage.getItem('carouselJavascript');
                if (!oldCode)
                {
                    oldCode = "";
                }

                oldCode += newCode;

                localStorage.setItem('carouselJavascript', oldCode);
            }

            

        },
        handleCarouselIds: function () {
            var e = $(".demo #myCarousel");
            var t = self.randomNumber();
            var n = "carousel-" + t;
            e.attr("id", n);
            e.find(".carousel-indicators li").each(function (e, t) {
                $(t).attr("data-target", "#" + n)
            });
			
			e.find(".carousel-control").each(function (e, t) {
                $(t).attr("href", "#" + n)
            });
			
           /* e.find(".left.carousel-control").attr('href', "#" + n);
			console.log(n);
            e.find(".right.carousel-control").attr('href', "#" + n)*/
        },
        handleTabsIds: function () {
            var e = $(".demo #myTabs");
            var t = self.randomNumber();
            var n = "tabs-" + t;
            e.attr("id", n);
            e.find(".tab-pane").each(function (e, t) {
                var n = $(t).attr("id");
                var r = "panel-" + self.randomNumber();
                $(t).attr("id", r);
                $(t).parent().children().find("a[href=#" + n + "]").attr("href", "#" + r)
            })
        },
        handleAccordionIds: function () {
            var e = $(".demo #myAccordion");
            var t = self.randomNumber();
            var n = "accordion-" + t;
            var r;
            e.attr("id", n);
            e.find(".panel").each(function (e, t) {
                r = "accordion-element-" + self.randomNumber();
                $(t).find(".accordion-toggle").each(function (e, t) {
                    $(t).attr("data-parent", "#" + n);
                    $(t).attr("href", "#" + r)
                });
                $(t).find(".panel-collapse").each(function (e, t) {
                    $(t).attr("id", r)
                });
            });
        },
        handleCountdown: function () {
            $('#countdown').countdown('2014/12/12', function (event) {
                $(this).html(event.strftime('%w weeks %d days <br /> %H:%M:%S'));
            });
        },
        handleParallax: function () {
            $(function () {
                $.stellar({
                    horizontalScrolling: false,
                    verticalOffset: 40
                });
            });
        },
        randomNumber: function () {
            return Math.floor(Math.random() * (1e6 - 1 + 1) + 1)
        }
    };

});


