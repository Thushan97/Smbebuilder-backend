define([], function() {
	
	var activeMode = '';
	
	return {
		setActiveMode: function(mode) {
			activeMode = mode;
		},
		getActiveMode: function() {
			return activeMode;
		}
	};
})