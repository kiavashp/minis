var w = window, d = document;
w.on = w.addEventListener.bind(w);

util = window.util || {};

util.inherits = function inherits (constr, superconstr){
	constr.super_ = superconstr;
	constr.prototype = Object.create(superconstr.prototype, {
		constructor: {
			value: constr,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
}
