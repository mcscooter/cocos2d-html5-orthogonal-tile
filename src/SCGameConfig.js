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
   						"startPosition":cc.p(192, 224),
   						"hitbox":cc.rect(-14,-14,28,28),
   						"centerOffset":cc.p(16,16),
   						"baseSpeed":1,
   						"maxVelocity":7,
   						"baseAccelleration":1,
   						"startingMovementDirection":null,
   						"startingRenderDirection":"right"
   					};
   					
   		this.greenCar = {
   						
   						"greenCarRight":cc.TextureCache.getInstance().addImage(s_GreenCarRight),
   						"greenCarLeft":cc.TextureCache.getInstance().addImage(s_GreenCarLeft),
   						"greenCarUp":cc.TextureCache.getInstance().addImage(s_GreenCarUp),
   						"greenCarDown":cc.TextureCache.getInstance().addImage(s_GreenCarDown),
   						"baseTextureRect":cc.rect(0, 0, 32, 32),
   						"startPosition":cc.p(272, 224),
   						"hitbox":cc.rect(-14,-14,28,28),
   						"centerOffset":cc.p(16,16),
   						"baseSpeed":5,
   						"maxVelocity":6,
   						"baseAccelleration":.1,
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
						"TAG_SIGN":10,
						"TAG_GAME_LAYER":11,
						"TAG_MENU_BACKGROUND":12,
						"TAG_MENU_TITLE":13,
						"TAG_CAR_ENTITY":14
   		};
   		
   		this.timer = {	
	   					"timeLimit":130,
	   					"position":cc.p(740,440),
	   					"fontSize":18	
   					};
   					
   		this.score = {	
	   					"position":cc.p(200,440),
	   					"alignment":cc.TEXT_ALIGNMENT_LEFT
   					};
   					
   		this.customer = {	
	   					"position":cc.p(740,10)
   					};
   		this.sign = {	
	   					"position":cc.p(20,10)
   					};
   					
   		this.gameMenuScene = {	
	   					"backgroundTexture":cc.TextureCache.getInstance().addImage(s_MenuBG),
	   					"backgroundTextureRect":cc.rect(0, 0, 800, 450),
	   					"backgroundPosition":cc.p(400,225),
	   					"titleTexture":cc.TextureCache.getInstance().addImage(s_MenuTitle),
	   					"titlePosition":cc.p(400,250),
	   					"menuPosition":cc.p(400,100)
   					};

   					
   		this.debug = {	
	   					"drawHitboxes":true	
   					};
   					
   					
   		// needed for JS-Bindings compatibility
   		cc.associateWithNative( this, cc.Class );
   }
    
});