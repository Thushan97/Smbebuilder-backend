define(['modes/fontMode/variables', 'modes/fontMode/breakpoint'], function (variables, breakpoint) {

    var current,
        fontStyles,
		fontMedia;

    var self = {
        changeCss: function (attr, val) {
            if (!fontMedia) {
                fontMedia = document.querySelector('#font-media');
				fontMedia = fontMedia ? $(fontMedia) : $('<style id="font-media"></style>').appendTo($('head'));
            }
			fontStyles = variables.fontStyles();
            current = variables.current;
            var media = breakpoint.getMedia();
            media.width == '100%' ? self.changeCommonCss(attr, val) : self.changeMediaCss(attr, val, media);
        },
        changeCommonCss: function (attr, val) {
            var reg, styles, create = false,
				tag = current.hasClass('font-body') ? '' : current.get(0).tagName.toLowerCase();

            reg = new RegExp('.demo ' + tag + ',.font-body ' + tag + '{(.*\\s?})*', 'g');
            styles = fontStyles.text().match(reg)
            if (styles) {
                styles += '';
            } else {
                styles = '\n.demo ' + tag + ',.font-body ' + tag + '{}';
                create = true;
            }

            if (styles.indexOf(attr) < 0) {
                styles = styles.replace(/}/, attr + ':' + val + ';}');
            } else {
                var regAttr = new RegExp(attr + '\\s?:\\s?.*?;');
                styles = styles.replace(regAttr, attr + ':' + val + ';')
            }

            create ? fontStyles.append(styles) : fontStyles.text(fontStyles.text().replace(reg, styles));
            breakpoint.addStyles()
        },
        changeMediaCss: function (attr, val, media) {
			if( media.width > 1349){
				var pre = '@media screen and (min-width: ' + media.min + 'px)'
			}
			else{
			console.log(media.width);
            	var pre = '@media screen and (min-width: ' + media.min + 'px) and (max-width: ' + media.width + 'px)'
				}
            //var pre = '@media only screen and (min-width: ' + media.min + 'px)',
				tag = current.hasClass('font-body') ? '' : current.get(0).tagName.toLowerCase(),
				allMedia = fontMedia.text(),
				tagSelect = '.demo ' + tag + ',.font-body ' + tag,
				attrVal = attr + ':' + val;

            if (media.orientation) {
                pre += ' and (orientation: ' + media.orientation + ')';
            }
			
			var regAttr = new RegExp(attr + '\\s?:\\s?.*?;', 'g');
			var regStyle = new RegExp(tagSelect + '\\s?\\{.*?(\\}|;$)');
			
			if (allMedia.indexOf(pre) > -1) {
				allMediaArr = allMedia.split('}}');
				for (var i = 0; i < allMediaArr.length; i++) {
					if (allMediaArr[i].indexOf(pre) > -1) {
						if (allMediaArr[i].indexOf(tagSelect) > -1) {
							style = regStyle.exec(allMediaArr[i])[0].toString();
							if (style.indexOf(attr) > -1) {
								style = style.replace(regAttr, attrVal + ';');
							} else {
								style = style.replace('{', '{' + attrVal + ';');
							}
							allMediaArr[i] = allMediaArr[i].replace(regStyle, style);
						} else {
							allMediaArr[i] += '}' + tagSelect + '{' + attrVal + ';';
						}
					}
				}
				fontMedia.html( allMediaArr.join('}}') );
			} else {
				fontMedia.append('\n' + pre + '{' + tagSelect + '{' + attrVal + ';}}');
			}
			breakpoint.addMediaStyles();
		}
    };

    return self;

});