define(['dragActionSetter', 'sortActionSetter'], function (dragActionSetter, sortActionSetter) {

    var self,
		num = 0,
		addonsTab2,
		files2 = [],
		undefinedFiles2 = [];

    return {

        findUpdates2: function () {
            self = this;
            addonsTab2 = $('#addons2');

           // self.createBtn();

            function getUpdate2() {
                num++;
                 require(['../../addons/contents/add' + num + '/ba' + num], function (obj) {
                    if (typeof obj == 'undefined') {
                        undefinedFiles2.push(num);
                    } else {
                        files2.push(obj);
						//console.log(files2.push(obj));
                    }

                    if (num == 20) {
                        self.addTemplates2();
                    }
                    else {
                        getUpdate2();
                    }
                });
            }
            getUpdate2();
        },
        createBtn: function () {
            addonsTab2.append('<div class="container-fluid"><div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><p class="custom-title-bs"><a id="addons-btn" class="btn btn-default btn-block btn-sm" style="color: #2b2b2b;">Buy add-on\'s</a></p></div></div></div>');
            $('#addons-btn').on('click', function (e) { e.preventDefault(e); $('#addons-modal').modal('show') })
        },
        addTemplates2: function () {
            for (var i = 0; i < files2.length; i++) {
                addonsTab2.append(files2[i].get());
            }
            addonsTab2.find('.box-layer').wrap('<div class="panel panel-default">');

           // self.checkAlertShow();

            dragActionSetter.makeElementsDraggable();
            sortActionSetter.makeElementsSortable();
        },
        checkAlertShow: function () {
            $.ajax('http://demo.bootstraptor.com/scripts/userNotifications.json').done(function (e) {
               
                if (e.alertShow) {
                    for (var i = 0; i < undefinedFiles.length; i++) {
                        if (e.newAddonId == undefinedFiles[i]) {
						 $('#addons-modal').find('.modal-body').html(e.html);
                         $('.alert').find('#htmlContentForAlert').html(e.html);
                         $('.alert').show().alert();
                            break;
                        }
                    }
                }

            }).fail(function (e) {
                $('#addons-modal').find('.modal-body').html('May be connection to internet was closed, try to connect and refresh the page, to check if we have new addons for you.');
            });
        }
    };
});