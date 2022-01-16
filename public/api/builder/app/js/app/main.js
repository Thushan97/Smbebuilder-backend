require(['UICreateHelper', 'elementsCreators/modalCreator', 'jquery', 'jqueryUI', 'twitterBootstrap', 'jqueryFitvids', 'ripples', 'material', 'modernizr'], 
function (uiCreateHelper, modalCreator) {
    modalCreator.createModals();
    uiCreateHelper.setupUI();
});
