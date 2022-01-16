define(['services/eventListener', 'services/localStorageService'], function (eventListener, localStorageService) {

    var currentImg,
        oldImgSrc;

    var self = {
        wrap: function () {
            self.unwrap();
            $('.demo').find('img:not(.map-layer img)')
                      .wrap('<span class="img-wrapper"></span>')
                      .parent()
                      .prepend('<button class="img-block  btn btn-info"><i class="fa fa-image" title="change image"></i></button>');
            $('.demo').find('.img-block').off('click').on('click', self.btnChangeSrcClicked);
        },
        unwrap: function () {
            var imgBlocks = $('.demo').find('.img-block');
            if (imgBlocks.length > 0) {
                $(imgBlocks).unwrap('<span class="img-wrapper"></span>').remove();
            }
        },
        btnChangeSrcClicked: function (event) {
            event.preventDefault(event);

            currentImg = $(this).parent().find('img');
            oldImgSrc = $(currentImg).attr('src');
            $('#img-url-data').val(oldImgSrc);

            $('#img-change-modal').find(".chooseImage").removeClass('active');
            $('#img-change-modal').find(".chooseImage[src='" + oldImgSrc.substring(oldImgSrc.indexOf('images/')) + "']").addClass('active');
            $('#img-change-modal').find('.chooseImage').off('click').on('click', function () { $('#img-change-modal').find('.chooseImage').removeClass('active'); $(this).addClass('active'); })

            $('#img-change-modal').modal('show');

            $('#save-img-url').off('click').on('click', self.saveImgClick);
        },
        saveImgClick: function (event) {
            event.preventDefault(event);

            var activeTabId = $('#img-change-modal').find('li.active>a').attr('href');

            var newImgSrc = '';

            if (activeTabId == '#showImgUrl') {
                newImgSrc = $('#img-url-data').val();
            }
            else {
                var choosenImage = $('#img-change-modal').find('.chooseImage.active');

                if (choosenImage.length > 0) {
                    newImgSrc = $(choosenImage).attr('src');
                }
                else {
                    newImgSrc = oldImgSrc;
                }
            }

            if (oldImgSrc !== newImgSrc) {
                $(currentImg).attr('src', newImgSrc);
                localStorageService.save();
            }

            $('#img-change-modal').modal('hide');
        }
    };

    eventListener.addListener('wrapImages', self.wrap);
    eventListener.addListener('unwrapImages', self.unwrap);

    return self;
});