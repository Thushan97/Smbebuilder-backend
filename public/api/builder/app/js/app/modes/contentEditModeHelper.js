define([], function() {

	var self;
	
	return {
		commonAceEditorCreator: function (edit, type) {
				var	editor = ace.edit(edit);
				ace.require("ace/ext/language_tools");
				ace.require("ace/ext/emmet");
				editor.container.style.height = "400px";
				editor.setFontSize("14px");
				editor.setTheme("ace/theme/chrome");
				editor.getSession().setUseWorker(false);
				editor.session.setMode("ace/mode/" + type);
				editor.session.setUseWrapMode(true);

				editor.setOptions({
					enableBasicAutocompletion: true,
					enableSnippets: true,
					enableEmmet: true
					
				});
				

				var snippetManager = ace.require("ace/snippets").snippetManager;
				var config = ace.require("ace/config");

				ace.config.loadModule("ace/snippets/xml", function (m) {
				    if (m) {
				        snippetManager.files.xml = m;
				        m.snippets = snippetManager.parseSnippetFile(m.snippetText);
				        var nsoa_snippets = nsoaGetSnippets();
				        nsoa_snippets.forEach(function (s) { m.snippets.push(s); });
				        snippetManager.register(m.snippets, m.scope);
				    }
				});

				function nsoaGetSnippets() {
				    return [{
				        name: "lookup",
				        content: "lookup=${1:ns_field}:lookup_table=${2:oa_table}:lookup_by=${3:oa_field}:lookup_return=${4:oa_field}",
				        tabTrigger: "lookup"
				    },
                    {
                        name: "dropdown",
                        content: "<${1:oa_field} ${2:ns_field}>\n    ${3:ns_value} ${4:oa_value}\n</${1}>\n",
                        tabTrigger: "dropdown"
                    }];
				}

				return editor;
			}
	};
	
});