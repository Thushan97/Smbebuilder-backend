define(['services/localStorageService', 'services/eventListener'], function (localStorageService, eventListener) {

    var self = {
        make: function () {
            var demos = localStorageService.getDemosAndState();

            if (demos == null || demos.state + 1 > demos.items.length - 1) {
                return;
            }

            var changeToState = demos.state + 1;

            localStorageService.saveNewState(changeToState);
            $('.demo').html(demos.items[changeToState]);
        },
        stylesModeMake: function (element) {
            var getStylesModeStates = localStorageService.getStylesModeStates();

            if (getStylesModeStates == null || getStylesModeStates.stateId + 1 > getStylesModeStates.states.length - 1) {
                return;
            }

            var changeToState = getStylesModeStates.stateId + 1;

            localStorageService.saveNewStateForStylesMode(changeToState);
            var newElement = $(element).outerHTML(getStylesModeStates.states[changeToState]);
            eventListener.emmitEvent('undoRedoOperationEmmited');
            eventListener.emmitEvent('recreateStylesModal', [newElement]);
        }
    };

    eventListener.addListener('redoStyles', self.stylesModeMake)

    return self;
});