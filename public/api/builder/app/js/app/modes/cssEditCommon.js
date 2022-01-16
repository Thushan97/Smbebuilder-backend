define(['modes/contentEditModeHelper', 'services/localStorageService'], function (contentEditModeHelper, localStorageService) {
	
	var self,
		cssBeforeChanges,
		commonCssEditor,
		modalWindow,
		previousModeActive;
	
	return {
		init: function() {
			self = this;
			modalWindow = $('#css-editor-modal-get');
			$('#css-edit-mode').on('click', self.showmodal)
		},
		showmodal: function() {
			previousModeActive = $('.modes.btn-success')
			cssBeforeChanges = $('#userstyles').html();
			commonCssEditor = contentEditModeHelper.commonAceEditorCreator("editorcsscodeget", "css");
			commonCssEditor.setValue(cssBeforeChanges);
			modalWindow.find('.canselthis').off('click').on('click', self.cancelChanges);
			modalWindow.find('.save-code').off('click').on('click', self.saveChanges);
			modalWindow.modal('show');
		},
		saveChanges: function () {
			$('#userstyles').html(commonCssEditor.getValue());
			self.classToggle();
			modalWindow.modal('hide');
			localStorageService.saveCssAndJs();
		},
		cancelChanges: function() {
			self.classToggle();
			modalWindow.modal('hide');
		},
		classToggle: function() {
			$('.modes.btn-success').removeClass('btn-success');
			previousModeActive.addClass('btn-success')
		}
	};
	
});