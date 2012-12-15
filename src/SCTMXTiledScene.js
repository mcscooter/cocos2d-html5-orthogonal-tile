// CONSTANTS. don't change things in ALL_CAPS.
var TAG_TILE_MAP = 1;
var TAG_MEDIATOR = 2;
var TAG_PLAYER = 3;
var TAG_CAMERA = 4;




var MSG_LAYER_TOUCHED = 1;
var MSG_PLAYER_MOVED = 2;
var MSG_MAP_TOUCHED = 3;

// an array of the entities in the game
var entities = new Array();

var inputHandler = new SCInputHandler();


var SCTileLayer = cc.Layer.extend({
	
	_map:null,
	ctor:function () {
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);
    },

    // run when SCTileLayer is created
    onEnter:function () {

    	this._super();
    	// get important info from the game configuration and Cocos2D engine
    	var s = cc.Director.getInstance().getWinSize();
    	
    	var gameConfig = new SCGameConfig();
    	
    	// Make a map from a Tiled map file. If there are problems here check the compression on the file from within Tiled.
    	var tileMap = new SCTileMap();
        tileMap.initWithTMXFile(gameConfig.maps.level1.filename);
        tileMap.setPosition(gameConfig.maps.level1.position);
        this.addChild(tileMap, 0, TAG_TILE_MAP);
       
        // set up the listener and messaging mediator
       	this.mediator = new SCMediator();
       	
       	// add the physics engine
       	this.physics = new SCPhysics();
       	
       	// determines what we see
       	camera = new SCCamera();
       	camera.setView(this);
       	this.addChild(camera, -1000, TAG_CAMERA);
       
    	// Make a player entity
    	// Since SCPlayer extends a CCSprite, we start with a texture. Could be a 1px transparent image if we wanted
        //var thisTexture = cc.TextureCache.getInstance().addImage(s_playerBlock);
        var player = new SCPlayer(gameConfig.player.baseTexture, gameConfig.player.baseTextureRect);     
    	player.setPosition(gameConfig.player.startPosition);
    	player.physicsComponent.setHitbox(gameConfig.player.hitbox);
    	// cc.log(cc.Rect.CCRectGetMaxY(cc.rect(0,0,32,32)));
    	player.centerOffset = gameConfig.player.centerOffset;
    	entities.push(player);
    	this.addChild(player, 99, TAG_PLAYER);
       	
       	
       	
       	
       	// test scrolling the map
       	//var actionTo = cc.MoveTo.create(5, cc.p(-128, 0));
       	//this.getChildByTag(TAG_TILE_MAP).runAction(actionTo);
       	
       	
       	
       	////////////////////////////////////////////
       	//
       	// Set Up Listeners
       	
       	
       	/*// TEST CASES
       	// test the mediator, look at onTouchEnded for next step
       	// testArg is necessary so the resulting call doesn't get undefined arguments
       	var callback = function(testArg){player.layerTouched(testArg);};
       	var layerTouchedEvent = new SCEvent(MSG_LAYER_TOUCHED, this.getChildByTag(TAG_PLAYER));
       	var testListener = new SCListener(layerTouchedEvent, callback, this.getChildByTag(TAG_PLAYER));
       	this.mediator.register(testListener);
      
       	var mapCallback = function(testArg){tileMap.testCallback(testArg);};
       	var mapTouchedEvent = new SCEvent(MSG_MAP_TOUCHED, tileMap);
       	var testMapListener = new SCListener(mapTouchedEvent, mapCallback, tileMap);
       	this.mediator.register(testMapListener);
       	// add more listeners to test removing things from the queue
       	this.mediator.register(testListener);
       	this.mediator.register(testMapListener);
     	*/
     	
     	// When the player moves, broadcast a message with the player position
     	/*
       	var playerMovedCameraCallback = function(args){this.camera.playerMoved(args);};
       	var playerMovedCameraEvent = new SCEvent(MSG_PLAYER_MOVED, this.camera);
       	var playerMovedCameraListener = new SCListener(playerMovedCameraEvent, playerMovedCameraCallback, this.camera);
       	this.mediator.register(playerMovedCameraListener);
     	*/
     	
     	var mapTouchEventCallback = function(testArg){player.mapTouched(testArg);};
       	var mapTouchEvent = new SCEvent(MSG_MAP_TOUCHED, this.getChildByTag(TAG_TILE_MAP));
       	var mapTouchListener = new SCListener(mapTouchEvent, mapTouchEventCallback, this.getChildByTag(TAG_PLAYER));
       	this.mediator.register(mapTouchListener);
     	
     	
     	var playerMovedCameraCallback = function(testArg){camera.playerMoved(testArg);};
       	var playerMovedCameraEvent = new SCEvent(MSG_PLAYER_MOVED, this.getChildByTag(TAG_CAMERA));
       	var playerMovedCameraListener = new SCListener(playerMovedCameraEvent, playerMovedCameraCallback, this.getChildByTag(TAG_CAMERA));
       	this.mediator.register(playerMovedCameraListener);
     	
     	// set all hitboxes to draw or not.
     	this.setEntityDrawHitboxes(gameConfig.debug.drawHitboxes);
     	
     	// set the global event message mediator object on entities
     	this.setEntityGlobalMediator(this.mediator);
     	
        // update each frame
       	this.scheduleUpdate();
       		
    },
    
    setEntityGlobalMediator:function(mediator){
	    if(mediator){
		    for( var i = 0; i < entities.length; i++ ){
			    entities[i].setGlobalMediator(mediator);
		    }
	    }else{
		    cc.log("SCTMXTiledScene setEntityGlobalMediator mediator is null");
	    }
	    
    },
   
    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchBegan:function (touch, event) {

        return true;
    },
    
    // Handles touch up and mouse up
    onTouchEnded:function (touch, event) {
    	
    	// Get touch info and map info
    	var touchLocation = touch.getLocation();
    	var tileMap = this.getChildByTag(TAG_TILE_MAP);
    	var layer = tileMap.layerNamed("foreground");
    	var tileSize = tileMap.getTileSize();
    	var mapSize = tileMap.getMapSize();
    	var mapLocation = tileMap.getPosition();
    	var mapTouchLocation = tileMap.convertTouchToNodeSpace(touch);
    	cc.log("SCTMXTiledScene onTouchEnded() mapTouchLocation x/y = " + mapTouchLocation.x + " " + mapTouchLocation.y);
    	var tileTouchedX = Math.floor(mapTouchLocation.x / tileSize.width);
    	var tileTouchedY = Math.floor(mapSize.height - mapTouchLocation.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileTouchedX, tileTouchedY);
    	cc.log("SCTMXTiledScene onTouchEnded() tileTouchedX tileTouchedY = " + tileTouchedX + " " + tileTouchedY);
    	var tileTouchedGID = layer.tileGIDAt(tileCoord);
    	cc.log("SCTMXTiledScene onTouchEnded() tileTouchedGID = " + tileTouchedGID);
    	var tileTouchedProperties = tileMap.propertiesForGID(tileTouchedGID);
    	
    	if(tileTouchedProperties){
	    	cc.log("SCTMXTiledScene onTouchEnded() tileTouchProperties.name = " + tileTouchedProperties.name);
    	}
    	
    	// send touch event
    	var touchArgs = new Object();
    	//touchArgs.touch = new Object(); 
    	touchArgs.mapTouchLocation = mapTouchLocation;
    	//cc.log("touchArgs.touch.x = " + touchArgs.mapTouchLocation.x);
    	//touchArgs.event = event;
    	var touchEvent = new SCEvent(MSG_MAP_TOUCHED, this, touchArgs);
       	this.mediator.send(touchEvent);
    	
    	
    	
    	// send touch event to mediator
    	// test sending an arbitrary object to the mediator to be sent to the callback
    	var args = new Object();
    	args.touchLocation = touchLocation;
    	args.mapTouchLocation = mapTouchLocation;
    	var event = new SCEvent(MSG_MAP_TOUCHED, this, args);
       	this.mediator.send(event);
       	var event2 = new SCEvent(MSG_MAP_TOUCHED, this, args);
       	this.mediator.send(event2);
       	
       	// test the mediator unregister functionality
       	//
       	// this.mediator.unregisterObject(tileMap); // might use this when getting rid of an object. This must complete before object is erased, so objects to be erased should be added to a clean up queue that happens either at the very end of a frame or at the beginning of the next to be safe.
       	//this.mediator.unregisterListenerForObject(MSG_MAP_TOUCHED, tileMap);
       	
       	
       	/*
       	// test moving the player
       	var actionTo = cc.MoveTo.create(.5, mapTouchLocation);
       	this.getChildByTag(TAG_PLAYER).runAction(actionTo);
       	*/
       	
       	//this.getChildByTag(TAG_PLAYER).move(mapTouchLocation);
       	
       	
       	
    },
    onTouchCancelled:function (touch, event) {
    },
    prevLocation:null,
    onTouchMoved:function (touch, event) {
  
    },
    
    // Keyboard handling
    onKeyUp:function(e){
	    cc.log("SCTMXTiledScene onKeyUp()");
	    	
	    inputHandler.keyUp(e);
    },
    onKeyDown:function(e){
    	cc.log("SCTMXTiledScene onKeyDown()");
   
    	inputHandler.keyDown(e);   
    },
    
    // make a player, initialize, add to layer
    initPlayer:function (){

    	
    	// test animaiton on player
    	var actionTo = cc.MoveTo.create(5, cc.p(1024, 32));
        this.player.runAction(actionTo);
    },
    
    updateInputState:function (){
	    
		//cc.log("SCTMXTiledScene updateInputState()");
		
		
	    	
		    
		
	    
    },
    

    // update every frame of the game
    update:function (dt) {
	    
	    this.updateInputState();
	    
	    this.mediator.update();
	    //this.setPosition(cc.p((this.getPosition()).x+.05, this.getPosition().y);
	    //this.setPosition(cc.pAdd(this.getPosition(),cc.p(1,1)));
	    //this.camera.setPosition(cc.pAdd(this.getPosition(),cc.p(.1,.1)));
	    this.getChildByTag(TAG_CAMERA).update();
	   
	    
      },
    
    setEntityDrawHitboxes:function(drawHitboxes){
	    for(var i=0; i<entities.length; i++){
		    entities[i].drawHitbox = drawHitboxes;
	    }
	    
    }

    
});

// Use this to create different levels / areas on a map
var Level1 = SCTileLayer.extend({
    ctor:function () {
    	// this calls the constructor of SCTileLayer
    	// put this AFTER anything you need to do before the level is initialized
        this._super();
        //this.initWithLevelName("res/tilemaps/test-tilemap.tmx");
    },
    
    initWithLevelName:function (levelName) {
	    // Add the tile map
        //var map = cc.TMXTiledMap.create(levelName); // old code that made a TMXTiledMap directly, need enhanced funcitonality
        var map = new SCTileMap();
        map.initWithTMXFile(levelName);
        map.setPosition(cc.p(0,0));
        this.addChild(map, 0, TAG_TILE_MAP);
        
	    
    }

});

