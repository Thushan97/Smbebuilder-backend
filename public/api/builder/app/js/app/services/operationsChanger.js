define(['operations/undo', 'operations/redo','services/modeChanger'], function (undo, redo, modeChanger) {

    return {
        make: function (type) {
            switch (type) {
                case 'undo-operation': undo.make();
                    break;
                case 'redo-operation': redo.make();
                    break;
            }

            modeChanger.changeMode($('.modes.btn-success').attr('id'));
        }
    };
});