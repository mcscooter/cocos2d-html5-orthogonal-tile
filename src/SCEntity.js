//	Scott Cummings 2012
// 

// This is called when making a new SCEntity
var SCEntity = cc.Sprite.extend({
   
   ctor:function (filename) {	
   	this._super(filename);
   	cc.log("SCEntity.js ctor()");
   	// needed for JS-Bindings compatibility
    cc.associateWithNative( this, cc.Sprite );
     
   },
   
    update:function () {
	    
    }
    
});


