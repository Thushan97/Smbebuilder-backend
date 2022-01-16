define(['modes/contentEditModeHelper'], function (contentEditModeHelper) {

    var self,
        element,
        jsBeforeChanges,
        jsEditor,
		isFirstAdd = false;

    return {
        activate: function (el) {
            self = this;
            element = el;
            jsBeforeChanges = $('#userscripts').html();
            self.jsEditorSetup();
           // $('#runJS').on('click', self.try2run);
        },
        jsEditorSetup: function () {
			jsEditor = contentEditModeHelper.commonAceEditorCreator("editjs", "javascript");
            jsEditor.setValue(jsBeforeChanges);
        },
        saveChanges: function () {
            $('#userscripts').html(jsEditor.getValue());
			//self.try2run();
			$('#runJS').off('click');
        },
        cancelChanges: function () {
            $('#userscripts').html(jsBeforeChanges);
			$('#runJS').off('click');
        },
		try2run: function(e) {
			if (!isFirstAdd && !e) {
				isFirstAdd = true;
				return true;
			}
			if (isFirstAdd) {
				try {
						eval(jsEditor.getValue());
					} catch (exc) {
						alert(exc);
					}
			}
		}
    }
})