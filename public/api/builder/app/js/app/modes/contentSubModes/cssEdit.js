define(['modes/contentEditModeHelper'], function (contentEditModeHelper) {

    var self,
        cssBeforeChanges,
        element,
        cssEditor;

    return {
        activate: function (el) {
                self = this;
                element = el;
                cssBeforeChanges = $('#userstyles').html();
                self.cssEditorSetup();
        },
        cssEditorSetup: function () {
			cssEditor = contentEditModeHelper.commonAceEditorCreator("editcss", "css");
            cssEditor.setValue(cssBeforeChanges);
        },
        saveChanges: function () {
            $('#userstyles').html(cssEditor.getValue());
        },
        cancelChanges: function () {
            $('#userstyles').html(cssBeforeChanges);
        }
    }
})