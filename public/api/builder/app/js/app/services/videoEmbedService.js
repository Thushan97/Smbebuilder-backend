define([], function () {

    var self;

    return {
        convertMedia: function (src) {
            self = this;

            var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
            var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

            if (pattern1.test(src)) {
                return self.getVimewSrcForIframe(src);
            }
            else if (pattern2.test(src)) {
                return self.getYoutubeSrcforIframe(src);
            }

            return src;
        },
        getYoutubeSrcforIframe: function (src) {
            if (src.indexOf('embed') > -1 && src.indexOf('http') < 0) {
                return 'https://' + src.substring(src.indexOf('www'));
            }

            var newSrc = 'https://www.youtube.com/embed/';
            var startCutPosition;

            if (src.indexOf('youtube') > 0) {
                startCutPosition = src.lastIndexOf('=');
            }
            else {
                startCutPosition = src.lastIndexOf('/');
            }
            return newSrc + src.substring(startCutPosition + 1);
        },
        getVimewSrcForIframe: function (src) {
            if (src.indexOf('player.vimeo.com/video/') > -1) {
                if (src.indexOf('https') < 0) {
                    return 'https://' + src.substring(src.indexOf('player.vimeo.com'));
                }
                return src;
            }

            return 'https://player.vimeo.com/video/' + src.substring(src.lastIndexOf('/') + 1);
        }
    };
});
