//	Scott Cummings 2012
// 


var SCGameConfig = cc.Class.extend({
   
   ctor:function (filename) {
   		
   		var mapSize = cc.Director.getInstance().getWinSize();
   		//cc.log(mapSize.width + mapSize.height);
   		
   		this.player = {
   						
   						"carRight":cc.TextureCache.getInstance().addImage(s_CarRight),
   						"carLeft":cc.TextureCache.getInstance().addImage(s_CarLeft),
   						"carUp":cc.TextureCache.getInstance().addImage(s_CarUp),
   						"carDown":cc.TextureCache.getInstance().addImage(s_CarDown),
   						"baseTextureRect":cc.rect(0, 0, 32, 32),
   						"startPosition":cc.p(256, 191),
   						"hitbox":cc.rect(2,2,28,28),
   						"centerOffset":cc.p(16,16),
   						"baseSpeed":7,
   						"baseAccelleration":.03,
   						"startingDirection":null
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
						"MSG_TIME_OVER":5,
						"TAG_TILE_MAP":1,
						"TAG_MEDIATOR":2,
						"TAG_PLAYER":3,
						"TAG_CAMERA":4,
						"TAG_TIMER":5,
						"TAG_TIMER_TEXT":6,
						"TAG_HUDLAYER":7,
						"TAG_SCORE":8,
						"TAG_CUSTOMER":9,
						"TAG_SIGN":10
   		};
   		
   		this.timer = {	
	   					"timeLimit":130,
	   					"offset":cc.p(320,200),
	   					"fontSize":18	
   					};
   					
   		this.score = {	
	   					"offset":cc.p(320,180)
   					};
   					
   		this.customer = {	
	   					"offset":cc.p(320,-200)
   					};
   		this.sign = {	
	   					"offset":cc.p(-320,-200)
   					};

   					
   		this.debug = {	
	   					"drawHitboxes":false	
   					};
   					
   					
   		// needed for JS-Bindings compatibility
   		cc.associateWithNative( this, cc.Class );
   }
    
});