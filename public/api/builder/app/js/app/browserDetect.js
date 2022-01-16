define([], function() {
	
	return {
		detect: function() {
			var ua = navigator.userAgent;
			if ((ua.search(/MSIE/)) > -1 || (ua.search(/Trident/)) > -1) {
				return 'IE';
			} else if (ua.search(/Firefox/) > -1) {
				return 'FireFox';
			} else if (ua.search(/Opera/) > -1) {
				return 'Opera';
			} else if (ua.search(/Chrome/) > -1) {
				return 'Crome';
			} else if (ua.search(/Safari/) > -1) {
				return 'Safari';
			} else return false;
		}
	};
});