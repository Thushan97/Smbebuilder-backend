define( [ 'Control'],
    function ( Control,  complexControls ) {

        "use strict";

        var $demo,
            $controlsHolder,
            controls = {},
            activated = false;

      

        

        function defineAll() {
            if ( $demo ) {
                return;
            }
            $demo = $( '.demo' );
            $controlsHolder = $( window.act.callParent( 'getElement', '.bg-control__common' ) );
            Control.prototype.$with = $();

            


            

            controls.btnType = new Control( {
                $control: $controlsHolder.find( '.bg-control__type' ),
                clas: {
                    prefix: 'bg',
                    modifiers: ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'],
                    required: 'bg'
                },
                elementsExceptions: {
                    onlyWith: ['section']
                }
            } );



        return {
            activate: function () {
                if ( activated ) {
                    detachControl();
                    return;
                }
                activated = true;
                defineAll();
                $demo.one( 'click', attachControl );
            },
            deactivate: function () {
                if ( !activated ) {
                    return;
                }
                activated = false;
                detachControl();
                $demo.off( 'click', attachControl );
            }
        };
    } );