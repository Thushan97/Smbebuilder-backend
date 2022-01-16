define([], function () {
    var cssModalEditor = '<div id="css-editor-modal-get" class="modal fade custombox-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close canselthis" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">CSS editor</h4></div><div class="modal-body"><div class="bs-example bs-example-tabs"><ul id="myTab" class="nav nav-tabs" role="tablist"><li class="active"><a href="#csscodegettab" role="tab" data-toggle="tab">CSS</a></li></ul><div id="myTabContent" class="tab-content"><div  role="tabpanel" class="tab-pane fade in active" id="csscodegettab"><div class="panel panel-default"><div id="editorcsscodeget" class="ace_editor"></div></div></div> </div></div></div><div class="modal-footer"><a class="btn btn-primary save-code">Save changes</a></div></div></div></div>';
    var htmlModalEditor = '<div id="html-editor-modal" class="modal fade custombox-modal bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" id="canselthis" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">HTML editor</h4></div><div class="modal-body"><div class="bs-example bs-example-tabs"><ul id="myTab2" class="nav nav-tabs"><li class="active"><a href="#showhtml" data-toggle="tab">HTML</a></li><li class=""><a href="#showcss" data-toggle="tab">CSS</a></li></ul></div><div id="myTabContent2" class="tab-content"><div class="tab-pane fade in active" id="showhtml"><div class="panel panel-default" id=""><div class="row"><div id="editorhtml" class="ace_editor col-lg-12 col-md-12"></div></div></div></div><div class="tab-pane fade" id="showcss"><div class="panel panel-default" id=""><div class="row"><div id="editcss" class="ace_editor"></div></div></div></div></div></div><div class="modal-footer"><a id="save-code" class="btn btn-primary">Save changes</a></div></div></div></div>';
    var jsModalEditor = '<div id="js-editor-modal-get" class="modal fade custombox-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabe3" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close canselthis" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabe3">Javascript editor</h4></div><div class="modal-body"><div class="bs-example bs-example-tabs"><ul id="myTab3" class="nav nav-tabs"><li class="active"><a href="#csscodeget" data-toggle="tab">JS</a></li></ul><div id="myTabContent3" class="tab-content"><div class="tab-pane fade in active" id="csscodeget"><div class="panel panel-default"><div id="editorjscodeget" class="ace_editor"></div></div></div></div></div></div><div class="modal-footer"><a class="btn btn-primary save-code">Save changes</a></div></div></div></div>';
    var videoChangeUrlModal = '<div id="video-change-modal" class="modal fade custombox-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="canselthis" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">EDIT Video URL</h4></div><div class="modal-body"><ul class="nav nav-tabs"><li class="active"><a href="#showVideoUrl" data-toggle="tab">EDIT Video URL</a></li><li class=""><a href="#showVideoHtml" data-toggle="tab">Insert Html</a></li></ul><div class="tab-content"><div class="tab-pane fade in active" id="showVideoUrl"><div class="panel panel-default" id=""><input id="video-url-data" type="text" value="" class="form-control"></div></div><div class="tab-pane fade" id="showVideoHtml"><div class="panel panel-default" id=""><textarea id="textAreaForVideoHtml" style="width:100%; resize: none; " rows="6"></textarea></div></div></div></div><div class="modal-footer"><a id="save-video-url" class="btn btn-primary">Save changes</a></div></div></div></div>';
    var linkChangeModal = '<div id="link-change-modal" class="modal fade custombox-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="canselthis" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">EDIT LINK</h4></div><div class="modal-body"><p>Insert URL or section ID</p><input id="link-data" type="text" value="" class="form-control"><hr><div class="panel panel-body"> <button id="anchor-button" class="btn btn-info btn-block">LINK TO SECTION</button></div><hr><p><small>Add YouTube of Vimeo URL to play as modal video</small> </p><input id="link-video" type="text" value="" class="form-control"></div><div class="modal-footer"><a id="save-link" class="btn btn-primary">Save changes</a></div></div></div></div>';
    var imgChangeModal = '<div id="img-change-modal" class="modal fade custombox-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="canselthis" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">EDIT IMAGE URL</h4></div><div class="modal-body"><input id="img-url-data" type="text" value="" class="form-control"></div><div class="modal-footer"><a id="save-img-url" class="btn btn-primary">Save changes</a></div></div></div></div>';
    var getCodeModal = '<div id="html-editor-modal-get-html" class="modal fade custombox-modal bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" id="canselthis" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">Download HTML</h4></div><div class="modal-body"><div class="bs-example bs-example-tabs"><ul id="myTab4" class="nav nav-tabs"><li class="active"><a href="#gethtmlcode" data-toggle="tab">HTML</a></li></ul><div id="myTabContent4" class="tab-content"><div class="tab-pane fade in active" id="gethtmlcode"><div class="panel panel-default" id=""><div id="htmlcode-alert" class="alert alert-warning fade out" style="margin:5px;" role="alert" data-dismiss="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><strong>Copy html code from the window below, than create new html file and paste code in, save your file in folder "MyProjects"</strong></div><div id="editorhtmlgetcode" class="ace_editor"></div></div></div></div></div></div><div class="modal-footer"><p><a id="get-code" class="btn btn-primary">Download HTML file</a></p></div></div></div></div>';
    var startNewModal = '<div id="start-new-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="canselStartNew" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">All the settings of the current project will be replaced with default. Do not forget to save the current project.</h4></div><div class="modal-body"></div><div class="modal-footer"><a id="confirm-start-new" class="btn btn-material-blue btn-raised btn-lg btn-block">Create New Project</a></div></div></div></div>';
    var getIconsModal = '<div id="icons-choose-modal" class="modal fade custombox-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="canselthis" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">Add icon</h4></div><div class="modal-body"><ul class="nav nav-tabs"><li class="active"><a href="#showBootstrapIcons" data-toggle="tab">Material</a></li><li class=""><a href="#showFontAwesomeIcons" data-toggle="tab">Font awesome</a></li></ul><div class="tab-content"><!--<div class="container-fluid"><div class="row"><div class="col-md-12" style="padding:0 5px;"><input id="myIconsinput" class="awesomplete form-control" data-list="#bootstrapIconsLis" placeholder="Search by icon name" /></div></div></div>--><div class="tab-pane fade in active" id="showBootstrapIcons"><div class="panel panel-default" id="bootstrapIconsList"></div></div><div class="tab-pane fade" id="showFontAwesomeIcons"><div class="panel panel-default" id=""></div></div></div></div><div class="modal-footer"><div class="row"><div class="col-sm-9"><ul class="icon-size-holder list-inline"><li><input type="radio" name="icon-size" data-icon-size="fa-lg"><span>fa-lg</span></li><li><input type="radio" name="icon-size" data-icon-size="fa-2x"><span>fa-2x</span></li><li><input type="radio" name="icon-size" data-icon-size="fa-3x"><span>fa-3x</span></li><li><input type="radio" name="icon-size" data-icon-size="fa-4x"><span>fa-4x</span></li><li><input type="radio" name="icon-size" data-icon-size="fa-5x"><span>fa-5x</span></li><li><input type="checkbox"><span class="fa-spin">fa-spin</span></li><li><input type="radio" name="icon-size" data-icon-size="none"><span>none</span></li></ul></div><div class="col-sm-3"><a id="save-icon" class="btn btn-primary">Save changes</a></div></div></div></div></div></div>';
    var detailsModeCssChangerModal = '<div id="modal-container-453162" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close close-this" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Section settings</h4></div><div class="modal-body" style="padding-top:20px;"><div class="row"><div class="col-xs-6 col-sm-3 col-md-3 col-lg-3"><small>padding-top</small><div class="input-group"><input type="text" id="paddingTopNew" class="form-control layout-control"><span class="input-group-addon">px</span></div></div><div class="col-xs-6 col-sm-3 col-md-3 col-lg-3"><small>padding-bottom</small><div class="input-group"><input type="text" id="paddingBottomNew" class="form-control layout-control"><span class="input-group-addon">px</span></div></div><div class="col-xs-6 col-sm-3 col-md-3 col-lg-3"><small>margin-top</small><div class="input-group"><input id="marginTopNew" type="text" class="form-control layout-control"><span class="input-group-addon">px</span></div></div><div class="col-xs-6 col-sm-3 col-md-3 col-lg-3"><small>margin-bottom</small><div class="input-group"><input id="marginBottomNew" type="text" class="form-control layout-control"><span class="input-group-addon">px</span></div></div></div><hr><div class="row"><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">Background color<div class="input-group demo2"><input type="text" value="" class="form-control" /><span class="input-group-addon"><i></i></span></div></div><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">Font color<div class="input-group demo3"><input type="text" value="" class="form-control" /><span class="input-group-addon"><i></i></span></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default"><i class="fa fa-undo"></i></button><button type="button" class="btn btn-default">Reset</button></div></div></div></div></div>';
    var addonsModal = '<div id="addons-modal" class="modal fade custombox-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabe4" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close canselthis" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabe4">Buy Add-ons</h4></div><div class="modal-body">Your addons are up to date</br></div><div class="modal-footer"></div></div></div></div>';
	var self = {
        createModals: function () {
            self.createCssModal();
            self.createHtmlModal();
            self.createJsModal();
           // self.createImgChangeModal();
            self.createVideoChangeUrlModal();
            self.creatLinkChangeModal();
            self.createGetCodeModal();
            self.createStartNewModal();
            self.creategetIconsModal();
          // self.createDetailsModeCssChangerModal();
			self.createAddonsModal();
        },
        createJsModal: function () {
            if ($('body').find('#js-editor-modal-get').length == 0) {
                $('body').prepend(jsModalEditor);
            }
        },
        createCssModal: function () {
            if ($('body').find('#css-editor-modal-get').length == 0) {
                $('body').prepend(cssModalEditor);
            }
        },
        createHtmlModal: function () {
            if ($('body').find('#html-editor-modal').length == 0) {
                $('body').prepend(htmlModalEditor);
            }
        },
        createImgChangeModal: function () {
            if ($('body').find('#img-change-modal').length == 0) {
                $('body').prepend(imgChangeModal);
            }
        },
        createVideoChangeUrlModal: function () {
            if ($('body').find('#video-change-modal').length == 0) {
                $('body').prepend(videoChangeUrlModal);
            }
        },
        creatLinkChangeModal: function () {
            if ($('body').find('#link-change-modal').length == 0) {

                $('body').prepend(linkChangeModal);
            }
        },
        createGetCodeModal: function () {
            if ($('body').find('#html-editor-modal-get').length == 0) {

                $('body').prepend(getCodeModal);
            }
        },
        createStartNewModal: function () {
            if ($('body').find('#start-new-modal').length == 0) {

                $('body').prepend(startNewModal);
            }
        },
        creategetIconsModal: function () {
            if ($('body').find('#icons-choose-modal').length == 0) {

                $('body').prepend(getIconsModal);
            }
        },
        createDetailsModeCssChangerModal: function () {
            if ($('body').find('#modal-container-453162').length == 0) {

                $('body').prepend(detailsModeCssChangerModal);
            }
        },
		createAddonsModal: function () {
            if ($('body').find('#addons-modal').length == 0) {

                $('body').prepend(addonsModal);
            }
        }
    };
    return self;
});