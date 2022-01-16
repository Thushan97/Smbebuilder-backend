define( [], function () {

    "use strict";

    function Control( opts ) {
        this.$control = opts.$control;
        this.clas = opts.clas;
        this.pattern = new RegExp( this.clas.prefix + '-(' + this.clas.modifiers.join( '|' ) + ')' );
        this.toDefault = 'default';
        this.toggle = opts.toggle || false;
        this.elementsExceptions = opts.elementsExceptions;

        if ( this.clas.required ) {
            [].push.apply( this.dependingNeed[this.clas.required], this.clas.modifiers );
        }

        this._subscribeEvents();
    }

    Control.prototype = {
        _subscribeEvents: function () {
            var self = this;

            this.$control.delegate( 'a[href]', 'click', function ( evt ) {
                if ( evt.button === 0 ) {
                    if ( self.toggle ) {
                        self.toggleBSClass( evt.target );
                    }
                    else {
                        self.changeBSClass( evt.target );
                    }
                }
                return false;
            } );
        },
        toggleBSClass: function ( target ) {
            this.$with.toggleClass( target.textContent.trim().toLowerCase() );
            this.$control.toggleClass( 'active' );

            if ( this.clas.required ) {
                if ( this.$control.hasClass( 'active' ) ) {
                    this.$with.addClass( this.clas.required );
                }
                else {
                    this.removeRequiredClass();
                }
            }

        },
        changeBSClass: function ( target ) {
            var currentClass = this.pattern.exec( this.$with.attr( 'class' ) ) || '',
                classModifier = target.textContent.trim().toLowerCase();

            this.$control.find( 'li.active' ).removeClass( 'active' );
            target.parentNode.classList.add( 'active' );
            this.$with.removeClass( currentClass[0] );

            if ( classModifier === this.toDefault ) {
                if ( this.clas.required ) {
                    this.removeRequiredClass();
                }
                return;
            }
            if ( this.clas.required ) {
                this.$with.addClass( this.clas.required );
            }
            this.$with.addClass( classModifier );
        },
        updateStatus: function () {
            if ( this.toggle ) {
                if ( this.pattern.exec( this.$with.attr( 'class' ) ) ) {
                    this.$control.addClass( 'active' );
                }
                else {
                    this.$control.removeClass( 'active' );
                }
                return;
            }
            var currentClass = this.pattern.exec( this.$with.attr( 'class' ) ) || [this.toDefault],
                containsRE = this.getClassPattern( currentClass[0] );

            this.$control.find( 'li.active' ).removeClass( 'active' );
            this.$control.find( 'a[href]' ).each( function () {
                if ( containsRE.test( this.textContent ) ) {
                    this.parentNode.classList.add( 'active' );
                    return false;
                }
            } );
        },
        canWorkWith: function () {
            var exc = this.elementsExceptions, isCorresponds;
            if ( exc ) {
                isCorresponds = $.fn.is.bind( this.$with );
                if ( ( exc.notWith && exc.notWith.some( isCorresponds ) ) ||
                    ( exc.onlyWith && !exc.onlyWith.some( isCorresponds ) ) ) {
                    this.$control.parent().hide();
                    return false;
                }
            }

            this.$control.parent().show();
            return true;
        },
        dependingNeed: {
            btn: []
        },
        removeRequiredClass: function () {
            var pattern = this.getClassPattern( this.dependingNeed[this.clas.required] );
            if ( !pattern.test( this.$with[0].className ) ) {
                this.$with.removeClass( this.clas.required );
            }
        },
        getClassPattern: function () {
            if ( $.isArray( arguments[0] ) ) {
                return new RegExp( '(?:^|\\s)' + this.clas.required + '-(' + arguments[0].join( '|' ) + ')(?!\\S)' );
            }
            return new RegExp( '(?:^|\\s)(' + [].join.call( arguments, '|' ) + ')(?!\\S)', 'i' );
        },
        $with: null
    };

    return Control;

} );