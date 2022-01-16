define(['services/localStorageService', 'services/eventListener'], function (localStorageService, eventListener) {

    var self = {
        make: function () {
            var demos = localStorageService.getDemosAndState();

            if (demos == null || demos.state - 1 < 0) {
                return;
            }

            var changeToState = demos.state - 1;

            localStorageService.saveNewState(changeToState);
            $('.demo').html(demos.items[changeToState]);
        },
        stylesModeMake: function (element) {
            var stylesModeStates = localStorageService.getStylesModeStates();

            if (stylesModeStates == null || stylesModeStates.stateId - 1 < 0) {
                return;
            }

            var changeToState = stylesModeStates.stateId - 1;

            localStorageService.saveNewStateForStylesMode(changeToState);
            var newElement = $(element).outerHTML(stylesModeStates.states[changeToState]);
            eventListener.emmitEvent('undoRedoOperationEmmited');
            eventListener.emmitEvent('recreateStylesModal', [newElement]);
        }
    };

    eventListener.addListener('undoStyles', self.stylesModeMake);

    return self;
});