define(['services/localStorageService', 'services/videoEmbedService'], function(localStorageService, videoEmbedService) {

    var self;

    self = {

        getElementsForEdit: function(elementWorkWith, mode) {
            var collection = $(elementWorkWith).find('nav.navbar,h1:not(.not-editable),h2,h3,h4,h5,h6,.well,li.list-group-item,.inner-title,.btn:not(.remove-block, .settings-block),p:not(:has(img),:has(a.btn)),.panel,a.btn.not-editable,panel-heading,.panel-footer,.box-layer,div.panel-body,div.tab-content,div.form-group,div.list-group>a,div.ui-group-buttons,div.navbar-header>a.navbar-brand,img:not(.map-layer img),.card>img,.map-layer,a.btn-lg,a.btn-block,a.btn-xl,a.btn-sm,address,span:not(.drag,.m__move_arrow),i:not(.md_down,.md_up, a i),li:not(.carousel-indicators li),button:not(.remove-block,.settings-block,.img-block,.btnForIFrameSrcChage, #addBlockBtn .btn)');
            var collection3 = $('.demo').find('code, .jumbotron, .well,.panel, .panel-heading, .panel-footer,.panel-body,.panel ul li');
            var collection7 = $('.demo').find('b, span, strong, p i, p strong, p span, p b,  h1 strong, h1 span, h1 b, h2 i, h2 span, h2 strong, h2 span, h2 b, h3 i, h3 span, h3 strong, h3 span, h3 b, h4 i, h4 span, h4 strong, h4 span, h4 b, h5 i, h5 span, h5 strong, h5 span, h5 b');
            var collection4 = $(elementWorkWith).find('.sortableCols').children().not('.container,.row,.navbar-header');
            var collection5 = $(elementWorkWith).find('ul.navbar-nav li');
            var collection6 = $(elementWorkWith).find('nav.navbar');


            mode == 'elementsmode' ? $(collection).addClass('tie-to-modal ') : $(collection).removeClass('tie-to-modal ');
            mode == 'elementsmode' ? $(collection5).addClass('tie-to-modal ') : $(collection5).removeClass('tie-to-modal');
            mode == 'elementsmode' ? $(collection6).addClass('tie-to-modal ') : $(collection6).removeClass('tie-to-modal');
            mode == 'elementsmode' ? $(collection3).addClass('tie-to-modal') : $(collection3).removeClass('tie-to-modal');
            mode == 'elementsmode' ? $(collection4).addClass('tie-to-modal') : $(collection4).removeClass('tie-to-modal');
            mode == 'elementsmode' ? $(collection7).removeClass('tie-to-modal') : $(collection7).removeClass('tie-to-modal');

            $('section').css('background-position', '');

            for (var i = 0; i < elementWorkWith.length; i++) {
                var jumbotrons = $(elementWorkWith[i]).find('.jumbotron');
                if (jumbotrons.length > 0 && !self.jumbatronIsEqualltoSection(elementWorkWith[i], jumbotrons[0])) {
                    mode == 'detailsmode' ? $(jumbotrons[0]).addClass('tie-to-modal paint-area') : $(jumbotrons[0]).removeClass('tie-to-modal paint-area');
                    collection.push(jumbotrons[0]);
                }
            }
            return collection;
        },
    
        jumbatronIsEqualltoSection: function(section, jumbotron) {
            var sectionWidth = $(section).outerWidth();
            var sectionHeight = $(section).outerHeight();
            var jumbotronWidth = $(jumbotron).outerWidth();
            var jumbotronHeight = $(jumbotron).outerHeight();

            return sectionWidth == jumbotronWidth && sectionHeight == jumbotronHeight;
        }
    };
    return self;
});
