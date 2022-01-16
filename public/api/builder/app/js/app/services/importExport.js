define([
	"elementsBehaviorHelper",
	"modes/detailsMode/elementsCssManipulation",
	"fileSaver",
	"services/htmlCleanerService",
	"services/localStorageService",
	"services/modeChanger",
	"services/eventListener",
], function (
	elementsBehaviorHelper,
	elementsCssManipulation,
	fileSaver,
	htmlCleanerService,
	LSS,
	modeChanger,
	eventListener
) {
	var content = "";
	var $modal;
	var $info;
	var $confirmBtn;
	var demo;
	var isAppend = false;

	var self = {
		subs: function () {
			$("#importQbx, .importQbx").on("click", self.importQbx);

			$("#exportQbx").on("click", self.exportQbx);
			demo = document.querySelector(".demo");
			$modal = $("#confirm-import").on("hide.bs.modal", function () {
				$input_file.val("");
				if (isAppend) {
					$("#import-file_append", $modal).trigger("click");
				}
			});
			$info = $("#import-file_info", $modal);
			$confirmBtn = $("a.pull-left", $modal);
			$input_file = $("#import-file", $modal);
			$("#import-file_append", $modal).on("change", function () {
				isAppend = !isAppend;
				if (isAppend) {
					$info.text("Imported file will be added to the current project");
				} else {
					$info.text("Imported file replace the current project. Are your sure?");
				}
			});
		},
		importQbx: function (evt) {
			// evt.preventDefault();
			// evt.stopPropagation();

			$info.text("");
			$confirmBtn.hide();

			// $input_file.off('change', handleFiles).on('change', handleFiles);

			// $modal.modal('show');
			handleFiles();

			function handleFiles() {
				// evt.preventDefault();
				// evt.stopPropagation();

				var file = window.customFile;
				if (!file) {
					fileNotMatch("No added file.");
					return;
				}
				if (!/\.qbx$/i.test(file.name)) {
					fileNotMatch("File format does not conform .qbx.");
					return;
				}

				var reader = new FileReader();
				reader.onload = function (event) {
					content = event.target.result;
					if (content) {
						self.organiseHtml();
						//$confirmBtn.off("click", self.organiseHtml).on("click", self.organiseHtml).show();
						//$info.text("Imported file replace the current project. Are your sure?");
					} else {
						fileNotMatch("File is empty.");
					}
				};
				reader.readAsText(file);

				function fileNotMatch(msg) {
					$info.text(msg);
					$confirmBtn.hide();
					content = null;
				}
			}
		},
		exportQbx: function (evt) {
			evt.preventDefault();
			evt.stopPropagation();

			var customCSS = ["font-styles", "font-media", "stylesChange", "font-face", "userstyles"];
			var toExport = document.createElement("DIV");
			var fFace = $("#font-face");
			var node = demo.cloneNode(true);
			var fontFaces = htmlCleanerService.getFontsAndStyles(true);

			/*
			 *  add custom css(fonts, theme, user styles)
			 */
			for (var i = customCSS.length; i--; ) {
				var temp = document.querySelector("#" + customCSS[i]);
				if (temp && (temp.textContent || temp.href)) {
					toExport.appendChild(temp.cloneNode(true));
				}
			}
			if (fontFaces) {
				$('<style id="font-face">' + fontFaces + fFace + "</style>").appendTo(toExport);
			}

			/*
			 * clean .demo
			 */
			$(".drag, .remove-block, .settings-block, .btnForIFrameSrcChage, .img-block", node).remove();
			$("section", node).css("background-position", "");
			$(".map-layer", node).children().html("");
			//$('.map-layer', node).children().attr('style', '');
			$(".ui-draggable", node).removeClass("ui-draggable");
			toExport.innerHTML += node.innerHTML;

			/*
			 *  add custom js(carousel, user js)
			 */
			var userJS = $("#userscripts").text();
			if (userJS) {
				$('\n<script id="userscripts" type="text/javascript">' + userJS + "</script>\n").appendTo(toExport);
			}
			var $carouselNode = $("#usersCarouselScripts");
			if ($carouselNode.text()) {
				toExport.appendChild($carouselNode[0].cloneNode(true));
			}

			var blob = new Blob([toExport.innerHTML], {
				type: "text/plain;charset=utf-8",
			});
			const fd = new FormData();
			fd.append("qbxFile", blob);

			const url = window.location.href.split("/");

			var token = url[url.length - 1];
			if (token[token.length - 1] === "#") {
				token = token.slice(0, -1);
			}

			//TODO:addproductionurl
			fetch("http://localhost:8000/api/builder/saveFile/", {
				method: "post", // *GET, POST, PUT, DELETE, etc.
				body: fd, // body data type must match "Content-Type" header
				headers: { "x-auth": token },
			})
				.then((e) => {
					window.location.replace("http://localhost:3000/rootui/react#");
					// saveAs(blob, "index.qbx");
				})
				.catch((e) => console.log(e));
		},
		organiseHtml: function () {
			var custom = [
				{
					id: "font-face",
					toEdit: "text",
					tag: "style",
				},
				{
					id: "font-media",
					toEdit: "text",
					tag: "style",
				},
				{
					id: "font-styles",
					toEdit: "text",
					tag: "style",
				},
				{
					id: "stylesChange",
					toEdit: "attr",
					tag: "link",
				},
				{
					id: "userstyles",
					toEdit: "text",
					tag: "style",
				},
				{
					id: "usersCarouselScripts",
					toEdit: "text",
					tag: "script",
				},
				{
					id: "userscripts",
					toEdit: "text",
					tag: "span",
				},
			];
			var head = document.querySelector("head");
			var toImport = document.createElement("DIV");

			toImport.innerHTML = content;

			if (isAppend) {
				for (var i = custom.length; i--; ) {
					if (i < 4) {
						tryToAdd(custom[i]);
					} else {
						appendApply(custom[i]);
					}
				}
			} else {
				for (var i = custom.length; i--; ) {
					diffApply(custom[i]);
				}
			}

			if (isAppend) {
				var info = $("body").find(".info-tip");

				$(info).css("display", "none");

				demo.innerHTML = demo.innerHTML + toImport.innerHTML;
			} else {
				demo.innerHTML = toImport.innerHTML;
			}
			eventListener.emmitEvent("addDaggableSpans");
			eventListener.emmitEvent("addSettingsBtn");
			var info = $("body").find(".info-tip");
			$(info).css("display", "none");

			LSS.save();
			LSS.saveCssAndJs();
			LSS.saveFonts();
			localStorage.setItem("carouselJavascript", $("#usersCarouselScripts").text());
			//modeChanger.changeMode('details-mode', demo);
			//recreateSettBtn();
			modeChanger.changeMode("elements-mode", demo);
			var isheaderNavFixed = $(".demo").find("header");
			if (isheaderNavFixed.hasClass("navbar-fixed-top")) {
				if ($("body").hasClass("is-navbar-fixed-top")) {
				} else {
					$("body").addClass("is-navbar-fixed-top");
				}
			} else {
				$("body").removeClass("is-navbar-fixed-top");
			}

			function recreateSettBtn() {
				var imported = toImport;
				$(imported).find("section").addClass("box-layer");
			}
			recreateSettBtn();

			function reCreateMap() {
				var imported = toImport;

				$(imported).find(".map-layer").children().html("");
				var gmapElement = $(imported).find(".map-layer").children();
				//gmapElement.attr('style' , '');

				console.log(gmapElement.length);
				if (gmapElement.length > 0) {
					var mapID = $(gmapElement).attr("id");
					var latNewData = $(gmapElement).attr("data-map-lat");
					var lngNewData = $(gmapElement).attr("data-map-lng");
					var mapHeight = $(gmapElement).attr("data-map-height");
					$(gmapElement).css("height", mapHeight + "px");
					console.log(mapHeight + "px");
					var mapRenderUserScripts = $("#userMapScripts");

					/*var newMapNewScriptCode =  		'function initialize() {\n' +
										'var latlng = new google.maps.LatLng(' + latNewData + ',' + lngNewData + ');\n' +
										'var myOptions = {\n' +
									'zoom: 8,\n' +
									'center: latlng,\n' +
									'mapTypeId: google.maps.MapTypeId.ROADMAP\n' +
								'};\n' +
								'var map = new google.maps.Map(document.getElementById("' + mapID + '"),\n' +
										'myOptions);\n' +
							'}\n' +
							'google.maps.event.addDomListener(window, "load", initialize);';*/

					var newMapNewScriptCode =
						"var geocoder = new google.maps.Geocoder();\n" +
						"var infowindow = new google.maps.InfoWindow();\n" +
						"function initialize() {\n" +
						"var latlng = new google.maps.LatLng( " +
						latNewData +
						"," +
						lngNewData +
						" );\n" +
						"var myOptions = { \n" +
						"zoom: 8,\n" +
						"center: latlng,\n" +
						"mapTypeId: google.maps.MapTypeId.ROADMAP\n" +
						"};\n" +
						'var map = new google.maps.Map(document.getElementById("' +
						mapID +
						'"),\n' +
						"myOptions);\n" +
						"geocodeLatLng(geocoder, map, infowindow);\n" +
						"}\n" +
						"var geocoder = new google.maps.Geocoder();\n" +
						"var infowindow = new google.maps.InfoWindow();\n" +
						"function geocodeLatLng(geocoder, map, infowindow) { \n" +
						"var latlngData = '" +
						latNewData +
						"," +
						lngNewData +
						"';  \n" +
						'console.log("data:" + latlngData);\n' +
						"var latlngStr = latlngData.split(',', 2);\n" +
						"var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};\n" +
						"console.log(latlng);\n" +
						"geocoder.geocode({'location': latlng}, \n" +
						"function(results, status) { \n" +
						"if (status === google.maps.GeocoderStatus.OK) { \n" +
						"if (results[1]) { map.setZoom(11); \n" +
						"var marker = new google.maps.Marker({\n" +
						"position: latlng, \n" +
						"map: map \n" +
						"}); \n" +
						"infowindow.setContent(results[1].formatted_address); \n" +
						"infowindow.open(map, marker); \n" +
						"} \n" +
						"else { console.log('No results found'); } } \n" +
						"else { console.log('Geocoder failed due to: ' + status ); } \n" +
						"}); \n" +
						"}\n" +
						'google.maps.event.addDomListener(window, "load", initialize);\n';

					console.log(newMapNewScriptCode);
					mapRenderUserScripts.html(newMapNewScriptCode);

					var geocoder = new google.maps.Geocoder();
					var infowindow = new google.maps.InfoWindow();

					function initialize() {
						var latlng = new google.maps.LatLng(latNewData, lngNewData);
						var myOptions = {
							zoom: 12,
							center: latlng,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
						};
						var map = new google.maps.Map(document.getElementById(mapID), myOptions);
						geocodeLatLng(geocoder, map, infowindow);
					}

					var geocoder = new google.maps.Geocoder();
					var infowindow = new google.maps.InfoWindow();

					function geocodeLatLng(geocoder, map, infowindow) {
						var latlngData = latNewData + "," + lngNewData;
						console.log("data:" + latlngData);
						var latlngStr = latlngData.split(",", 2);
						var latlng = {
							lat: parseFloat(latlngStr[0]),
							lng: parseFloat(latlngStr[1]),
						};
						console.log(latlng);
						geocoder.geocode(
							{
								location: latlng,
							},
							function (results, status) {
								if (status === google.maps.GeocoderStatus.OK) {
									if (results[1]) {
										map.setZoom(11);
										var marker = new google.maps.Marker({
											position: latlng,
											map: map,
										});
										infowindow.setContent(results[1].formatted_address);
										infowindow.open(map, marker);
									} else {
										console.log("No results found");
									}
								} else {
									console.log("Geocoder failed due to: " + status);
								}
							}
						);
					}

					//google.maps.event.addDomListener(window, "load", initialize);
					initialize();
				}
				$(gmapElement).css("height", mapHeight + "px");
			}

			reCreateMap();

			function diffApply(node) {
				var imported = toImport.querySelector("#" + node.id);
				var toDiff = document.querySelector("#" + node.id) || createStyleNode(node.id, node.tag);

				switch (node.toEdit) {
					case "attr":
						//document.querySelector('#reset-styles').click();
						if (imported) {
							var theme = imported.getAttribute("href");
							var choosenTheme = document.querySelector('input[value="' + theme.substr(5) + '"]');
							if (choosenTheme && theme) {
								choosenTheme.parentNode.previousElementSibling.click();
							}
							toImport.removeChild(imported);
						}
						break;
					case "text":
						if (imported) {
							toDiff.textContent = imported.textContent;
							toImport.removeChild(imported);
						} else {
							toDiff.textContent = "";
						}
						break;
				}
			}

			function appendApply(node) {
				var imported = toImport.querySelector("#" + node.id);
				if (!imported) {
					return;
				}
				var appendTo = document.querySelector("#" + node.id) || createStyleNode(node.id, node.tag);
				appendTo.textContent += imported.textContent;
				toImport.removeChild(imported);
			}

			function tryToAdd(node) {
				var imported = toImport.querySelector("#" + node.id);
				if (!imported) {
					return;
				}
				var appendTo = document.querySelector("#" + node.id) || createStyleNode(node.id, node.tag);

				switch (node.toEdit) {
					case "attr":
						if (!document.querySelector("div.bootswatch.active")) {
							/*var theme = imported.getAttribute('href');
                                var choosenTheme = document.querySelector('input[value=\"' + theme.substr(5) + '\"]');
                                if (choosenTheme && theme) {
                                	choosenTheme.parentNode.previousElementSibling.click();
                                }*/
						}
						toImport.removeChild(imported);
						break;
					case "text":
						if (!appendTo.textContent.trim()) {
							//appendTo.textContent += imported.textContent;
						}
						toImport.removeChild(imported);
						break;
				}
			}

			function createStyleNode(id, tag) {
				var node = document.createElement(tag);
				node.id = id;
				head.appendChild(node);
				return node;
			}
		},
	};

	return self;
});
