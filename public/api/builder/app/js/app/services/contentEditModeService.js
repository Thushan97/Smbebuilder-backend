define(['elementsBehaviorHelper', 'modes/contentSubModes/htmlEdit', 'modes/contentSubModes/cssEdit', 'services/localStorageService', 'services/eventListener'],
    function (elementsBehaviorHelper, htmlEdit, cssEdit, localStorageService, eventListener) {

        var element;

        var self = {
            prepare2show: function (e) {

                element = e.currentTarget;
                $(element).find('.remove-block, .drag, .img-block, .btnForIFrameSrcChage, .m__move_arrow, .settings-block').remove();

                $('#html-editor-modal').find("#save-code").off('click').on('click', function (event) {
                    self.saveChanges();
                });

                $('#html-editor-modal').find('#canselthis').off('click').on('click', function (event) {
                    self.cancelChanges();
                });

                htmlEdit.activate(element);
                cssEdit.activate(element);
                $('#html-editor-modal').modal('show');
            },
            saveChanges: function () {
                htmlEdit.saveChanges();
                cssEdit.saveChanges();
                eventListener.emmitEvent('addRemoveButtons');
                eventListener.emmitEvent('addDaggableSpans');
                eventListener.emmitEvent('addMovableSpans');
                eventListener.emmitEvent('addSettingsBtn');
                $('#html-editor-modal').modal('hide');
                localStorageService.save();
                localStorageService.saveCssAndJs();
            },
            cancelChanges: function () {
                htmlEdit.cancelChanges();
                cssEdit.cancelChanges();
                eventListener.emmitEvent('addRemoveButtons');
                eventListener.emmitEvent('addDaggableSpans');
				eventListener.emmitEvent('addMovableSpans');
				eventListener.emmitEvent('addSettingsBtn');
            }
        }
        return self;
    });