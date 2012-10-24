//	Scott Cummings 2012
// 

// Tilemap that extends the functionality of the TMXTiledMap
var SCTileMap = cc.TMXTiledMap.extend({
   
   ctor:function () {	
   	this._super();
   	cc.log("SCTileMap.js ctor()");
   	// needed for JS-Bindings compatibility
    cc.associateWithNative( this, cc.TMXTiledMap );
     
   },
   
   testCallback:function(args){
	   cc.log("SCTileMap testCallback()");
   }
    
});


