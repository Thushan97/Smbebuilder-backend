define(['modes/contentEditModeHelper', 'services/localStorageService'], function (contentEditModeHelper, localStorageService) {
	
	var self,
		jsBeforeChanges,
		commonJsEditor,
		modalWindow,
		isOnShow = false,
		previousModeActive;
	
	return {
		init: function() {
			self = this;
			modalWindow = $('#js-editor-modal-get');
			$('#js-edit-mode').on('click', self.showmodal);
			commonJsEditor = contentEditModeHelper.commonAceEditorCreator("editorjscodeget", "javascript");
		},
		showmodal: function() {
			previousModeActive = $('.modes.btn-success');
			isOnShow = true;
			commonJsEditor.setValue($('#userscripts').html());
			modalWindow.find('.canselthis').off('click').on('click', self.cancelChanges);
			modalWindow.find('.save-code').off('click').on('click', self.saveChanges);
			modalWindow.modal('show');
		},
	    saveChanges: function () {
			$('#userscripts').html(commonJsEditor.getValue());
			self.classToggle();
			modalWindow.modal('hide');
			localStorageService.saveCssAndJs();
        },
        cancelChanges: function () {
			$('#userscripts').html(jsBeforeChanges);
			self.classToggle();
			modalWindow.modal('hide');
        },
		classToggle: function() {
			$('.modes.btn-success').removeClass('btn-success');
			previousModeActive.addClass('btn-success')
		}
	};
	
});