define(['elementsBehaviorHelper', 'services/contentEditModeService','services/eventListener', 'services/editableElements',  'ace', 'emmet', 'extEmmet', 'extLanguageTools'],
function (elementsBehaviorHelper, contentEditModeService, eventListener, editableElements) {

    var self,
        elementWorkWith;
    return {
        activate: function (elements) {
            self = this;
            elementWorkWith = typeof element === "undefined" ? $('.demo').find('.box-layer') : element;
            editableElements.on();
            self.unbindPreviousMode();
		
			eventListener.emmitEvent('wrapImages');
			eventListener.emmitEvent('wrapIframe');
        },
        unbindPreviousMode: function () {
            elementsBehaviorHelper.getElementsForEdit(elementWorkWith, 'contentmode').off('click').off('mouseenter');
        },
        unbind: function () {
           
            eventListener.emmitEvent('unwrapImages');
            eventListener.emmitEvent('elementsEditableOff');
            eventListener.emmitEvent('addRemoveButtons');
            eventListener.emmitEvent('addDraggableSpans');
            eventListener.emmitEvent('addMovableSpans');
            $('.demo').find('.box-layer').find('.btnForIFrameSrcChage').remove();
        }
    };
});