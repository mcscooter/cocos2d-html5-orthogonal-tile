//	Scott Cummings 2012
// 


var SCGameConfig = cc.Class.extend({
   
   ctor:function (filename) {
   		
   		var mapSize = cc.Director.getInstance().getWinSize();
   		//cc.log(mapSize.width + mapSize.height);
   		
   		this.player = {
   						"baseTexture":cc.TextureCache.getInstance().addImage(s_TestPlayerBlock),
   						"baseTextureRect":cc.rect(0, 0, 32, 64),
   						"startPosition":cc.p(384, 209),
   						"hitbox":cc.rect(2,2,28,28),
   						"centerOffset":cc.p(16,16)
   					};
   
   		this.maps = {
	   					level1:{ 	
	   						"filename":"res/tilemaps/test-tilemap.tmx",
	   						"position":cc.p(0,0)
	   					}
   					};
   					
   		this.globals = {
   						
	   					"MSG_LAYER_TOUCHED" :1,
						"MSG_PLAYER_MOVED":2,
						"MSG_MAP_TOUCHED":3,
						"MSG_INPUT_CHANGED":4,
						"TAG_TILE_MAP":1,
						"TAG_MEDIATOR":2,
						"TAG_PLAYER":3,
						"TAG_CAMERA":4	
   		};
   					
   		this.debug = {	
	   					"drawHitboxes":true	
   					};
   					
   					
   		// needed for JS-Bindings compatibility
   		cc.associateWithNative( this, cc.Class );
   }
    
});