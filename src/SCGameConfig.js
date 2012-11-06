//	Scott Cummings 2012
// 


var SCGameConfig = cc.Class.extend({
   
   ctor:function (filename) {
   		
   		this.player = {
   						"speed":5,
   						"health":100
   					};
   
   		this.maps = {
	   					level1:{ 	
	   						"filename":"res/tilemaps/test-tilemap.tmx"
	   					}
   					};
   					
   		this.debug = {	
	   					"drawHitboxes":true	
   					};
   					
   					
   		// needed for JS-Bindings compatibility
   		cc.associateWithNative( this, cc.Class );
   }
    
});