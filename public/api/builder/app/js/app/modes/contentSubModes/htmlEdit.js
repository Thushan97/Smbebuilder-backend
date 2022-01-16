define(['modes/contentEditModeHelper'], function (contentEditModeHelper, jqueryOuterHtml) {

    var self,
        htmlBeforeChanges,
        element,
        editorhtml,
        hasBoxLayerClass,
        hasUIDraggableClass;

    return {
        activate: function (el) {
            self = this;
            element = el;
            htmlBeforeChanges = $(element).outerHTML();
            self.htmlEditorSetup()
        },
        htmlEditorSetup: function () {
            hasBoxLayerClass = false;
            hasUIDraggableClass = false;

            if ($(element).hasClass('box-layer')) {
                hasBoxLayerClass = true;
                $(element).removeClass('box-layer');
            }
			
			$(element).find('#addBlockBtn').remove();
			$(element).find('#formBlockBtn').remove();

            if ($(element).hasClass('ui-draggable')) {
                hasUIDraggableClass = true;
                $(element).removeClass('ui-draggable');
            }

            var myContent = $.htmlClean($(element).outerHTML(), {
                format: true,
                allowedAttributes: [
                    ["id"],
                    ["class"],
                    ["data-toggle"],
                    ["data-target"],
                    ["data-parent"],
                    ["role"],
                    ["data-dismiss"],
                    ["aria-labelledby"],
					["data-rel"],
                    ["onclick"],
                    ["aria-hidden"],
					["placeholder"],
					["data-lightbox-content"],
                    ["data-slide-to"],
                    ["data-placement"],
                    ["data-original-title"],
                    ["data-slide"],
                    ["pre"],
					["data-map-lat"], //gmap
                    ["data-map-lng"],//gmap
                    ["marginwidth"],
                    ["marginheight"],
                    ["scrolling"],
                    ["data-frame"],
                    ["frameborder"],
                    ["aria-valuenow"],
                    ["aria-valuemin"],
                    ["aria-valuemax"],
                    ["style"],
                    ["src"],
                    ["data-stellar-background-ratio"],
					["data-stellar-ratio"],
                    ["data-stellar-horizontal-offset"],
                    ["data-stellar-vertical-offset"],
                    ["data-stellar-offset-parent"],
                    ["data-filter"],
                    ["style"],
                    ["width"],
                    ["height"],
                    ["data-map-height"],
					//ampproject tags
                    ["amp-*"],
                    ["itemprop"],
                    ["itemscope"],
                    ["itemtype"],
                    ["srcset"],
                    ["layout"],
                    ["on"],
                    ["amp-custom"],
                    ["article"],
                    ["figure"],
                    ["figcaption"],
                    ["type"],
                    ["data-aax_size"],
                    ["data-aax_pubname"],
                    ["data-aax_src"],
                    ["data-ad-client"]
                ]
            });

            editorhtml = contentEditModeHelper.commonAceEditorCreator("editorhtml", "html");
            editorhtml.setValue(myContent);

            $('#editorHtmlPreview').html(editorhtml.getValue());
            editorhtml.on('change', function () {
                $('#editorHtmlPreview').html(editorhtml.getValue());
            });
        },
        saveChanges: function () {
           var t = $(element).outerHTML(editorhtml.getValue());
            if (hasUIDraggableClass) {
                $(t).addClass('ui-draggable');
            }

            if (hasBoxLayerClass) {
                $(t).addClass('box-layer');
            }
        },
        cancelChanges: function () {
            $(element).outerHTML(htmlBeforeChanges);
        }
    };
});



