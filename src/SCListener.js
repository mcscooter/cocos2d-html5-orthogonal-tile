
// The basic event listener.
var SCListener = cc.Class.extend({

	ctor:function (event, callback, object) {
    	cc.log("SCListener ctor()");
    	this.event = event;
    	this.callback = callback;
    	this.object = object;
    },

});