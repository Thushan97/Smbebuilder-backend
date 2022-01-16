define(['services/htmlCleanerService', 'browserDetect', 'fileSaver'], function (htmlCleanerService, browserDetect) {

    return {
        subscribe: function () {
            $('#getcode').click(function (event) {
                event.preventDefault(event);
                var htmlready = htmlCleanerService.getCleanedHtml(true);
                var editorhtmlget = ace.edit("editorhtmlgetcode");
                ace.require("ace/ext/language_tools");
                ace.require("ace/ext/emmet");
                editorhtmlget.container.style.height = "400px"
                editorhtmlget.setFontSize("14px")
                editorhtmlget.setTheme("ace/theme/chrome");
                editorhtmlget.session.setMode("ace/mode/html");
                editorhtmlget.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableEmmet: true
                });
                editorhtmlget.setValue(htmlready);
				
                //$('#htmlcodetexarea').val(htmlready);
				
				var textArea = $('#newCode')
				
				editorhtmlget.getSession().on('change', function () {
				   textArea.val(editorhtmlget.getSession().getValue());
			   });
			   
			    textArea.val(editorhtmlget.getSession().getValue());
				
				var newCode = textArea.val(editorhtmlget.getSession().getValue());
				console.log(textArea.val());
				
                if (browserDetect.detect() == 'Safari') {
                    $('#get-code').addClass('hide');
                    $('#cont-code').removeClass('hide');
                    $('#htmlcode-alert').addClass('in').removeClass('hide');
                }
                else {
                    $('#htmlcode-alert').remove();
                }
                
				
                $('#html-editor-modal-get-html').modal('show');
				
				
                //GET CODE FILE	
                $('#get-code').off('click').click(function (event) {
				var newCode = textArea.val();
				console.log(newCode);
                    event.preventDefault(event);
                    var blob = new Blob([newCode], { type: "text/plain;charset=utf-8" });
                    saveAs(blob, "index.html");
                });
            });
        }
    };
});