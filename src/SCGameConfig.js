//	Scott Cummings 2012
// 


var SCGameConfig = cc.Class.extend({
   
   ctor:function (filename) {
   		
   		this.player = {
   						"baseTexture":cc.TextureCache.getInstance().addImage(s_TestPlayerBlock),
   						"baseTextureRect":cc.rect(0, 0, 32, 64),
   						"startPosition":cc.p(0,0),
   						"hitbox":cc.rect(2,2,28,28)
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