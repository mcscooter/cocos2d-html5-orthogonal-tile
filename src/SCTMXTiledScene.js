// CONSTANTS. don't change things in ALL_CAPS.
var TAG_TILE_MAP = 1;
var TAG_MEDIATOR = 2;
var TAG_PLAYER = 3;
var TAG_CAMERA = 4;




var MSG_LAYER_TOUCHED = 1;
var MSG_PLAYER_MOVED = 2;
var MSG_MAP_TOUCHED = 3;
var MSG_INPUT_CHANGED = 4;

// an array of the entities in the game
var entities = new Array();


var SCTileLayer = cc.Layer.extend({
	
	_map:null,
	ctor:function () {
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);
        this.gameConfig = new SCGameConfig();
    },

    // run when SCTileLayer is created
    onEnter:function () {

    	this._super();
    	// get important info from the game configuration and Cocos2D engine
    	var s = cc.Director.getInstance().getWinSize();
    	
    	// A layer for the moving graphics that is seperate from the HUD
    	this.gameLayer = new SCGameLayer();
    	this.gameLayer.setPosition(cc.p(0,0));
    	this.addChild(this.gameLayer, 1, this.gameConfig.globals.TAG_GAME_LAYER);
    	
    	// A layer for the HUD
    	this.HUDLayer = new SCHUDLayer();
    	this.HUDLayer.setPosition(cc.p(0,0));
    	this.addChild(this.HUDLayer, 999, this.gameConfig.globals.TAG_HUDLAYER);
    	
    	
    	// Make a map from a Tiled map file. If there are problems here check the compression on the file from within Tiled.
    	var tileMap = new SCTileMap();
        tileMap.initWithTMXFile(this.gameConfig.maps.level1.filename);
        tileMap.setPosition(this.gameConfig.maps.level1.position);
        this.gameLayer.addChild(tileMap, 0, TAG_TILE_MAP);
       
        // set up the listener and messaging mediator
       	this.mediator = new SCMediator();
       	
       	// handles keyboard input, will move touch to this eventually
       	this.inputHandler = new SCInputHandler();
       	
       	// add the physics engine
       	this.physics = new SCPhysics();
       	
       	// determines what we see on the stage
       	camera = new SCCamera();
       	camera.setView(this.gameLayer);
       	this.gameLayer.addChild(camera, -1000, TAG_CAMERA);
       
    	// Make a player entity
    	// Since SCPlayer extends a CCSprite, we start with a texture. Could be a 1px transparent image if an ivisible sprite is needed.
        var player = new SCPlayer(this.gameConfig.player.carRight, this.gameConfig.player.baseTextureRect);     
    	player.setPosition(this.gameConfig.player.startPosition);
    	player.physicsComponent.setHitbox(this.gameConfig.player.hitbox);
    	player.centerOffset = this.gameConfig.player.centerOffset;
    	entities.push(player);
    	this.gameLayer.addChild(player, 99, TAG_PLAYER);
       	
       	
       	this.timer = new SCTimer();
       	this.timer.setPosition(this.gameConfig.timer.position);
       	entities.push(this.timer);
       	this.HUDLayer.addChild(this.timer, 95, this.gameConfig.globals.TAG_TIMER);
       	
       	this.score = new SCScore();
       	this.score.setPosition(this.gameConfig.score.position);
        entities.push(this.score);
       	this.HUDLayer.addChild(this.score, 96, this.gameConfig.globals.TAG_SCORE);
       	
       	this.customer = new SCCustomer();
       	this.customer.setPosition(this.gameConfig.customer.position);
        entities.push(this.customer);
       	this.HUDLayer.addChild(this.customer, 96, this.gameConfig.globals.TAG_CUSTOMER);
       	
       	
       	this.sign = new SCSign();
       	this.sign.setPosition(this.gameConfig.sign.position);
        entities.push(this.sign);
       	this.HUDLayer.addChild(this.sign, 96, this.gameConfig.globals.TAG_PRICE);
       	
    
    
       	// Register callbacks
     	var mapTouchEventCallback = function(testArg){player.mapTouched(testArg);};
       	var mapTouchEvent = new SCEvent(MSG_MAP_TOUCHED, this.gameLayer.getChildByTag(TAG_TILE_MAP));
       	var mapTouchListener = new SCListener(mapTouchEvent, mapTouchEventCallback, this.gameLayer.getChildByTag(TAG_PLAYER));
       	this.mediator.register(mapTouchListener);
     	
     	
     	var playerMovedCameraCallback = function(testArg){camera.playerMoved(testArg);};
       	var playerMovedCameraEvent = new SCEvent(MSG_PLAYER_MOVED, this.gameLayer.getChildByTag(TAG_CAMERA));
       	var playerMovedCameraListener = new SCListener(playerMovedCameraEvent, playerMovedCameraCallback, this.gameLayer.getChildByTag(TAG_CAMERA));
       	this.mediator.register(playerMovedCameraListener);
       	
       	var inputHandlerStateEventCallback = function(args){player.inputChanged(args);};
       	var inputHandleStateEvent = new SCEvent(MSG_INPUT_CHANGED, this.gameLayer.getChildByTag(TAG_PLAYER));
       	var inputHandlerStateEventListener = new SCListener(inputHandleStateEvent, inputHandlerStateEventCallback, this.gameLayer.getChildByTag(TAG_PLAYER));
       	this.mediator.register(inputHandlerStateEventListener);
     	
     	// set all hitboxes to draw or not.
     	this.setEntityDrawHitboxes(this.gameConfig.debug.drawHitboxes);
     	
     	// set the global event message mediator object on entities
     	this.setEntityGlobalMediator(this.mediator);
     	
     	// set the mediator in components
     	this.setComponentGlobalMediator(this.mediator);
     	
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
    
    setComponentGlobalMediator:function(mediator){
	  this.inputHandler.setGlobalMediator(mediator);      
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
    	var tileMap = this.gameLayer.getChildByTag(TAG_TILE_MAP);
    	var layer = tileMap.layerNamed("foreground");
    	var tileSize = tileMap.getTileSize();
    	var mapSize = tileMap.getMapSize();
    	var mapLocation = tileMap.getPosition();
    	var mapTouchLocation = tileMap.convertTouchToNodeSpace(touch);
    	var tileTouchedX = Math.floor(mapTouchLocation.x / tileSize.width);
    	var tileTouchedY = Math.floor(mapSize.height - mapTouchLocation.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileTouchedX, tileTouchedY);
    	
    	tileMap.getPointGID(mapTouchLocation);
    	var signProperties = tileMap.getPointProperties("signs", mapTouchLocation);
    	var customerProperties = tileMap.getPointProperties("customers", mapTouchLocation);
    	
    	if(customerProperties){
	    	cc.log(customerProperties.loan);
	    	this.customer.setLoan(customerProperties.loan);
	    	tileMap.removeCustomer(tileCoord);
    	}
    	
    	if(signProperties){
	    	cc.log(signProperties.price);
	    	this.sign.setPrice(signProperties.price);
	    	cc.log(this.customer.loan);
	    	cc.log(this.sign.price)
	    	if(parseInt(this.customer.loan) >= parseInt(this.sign.price)){
	    		this.score.score += parseInt(this.sign.getPrice());
		    	tileMap.removeSign(tileCoord);
		    	this.customer.loan = 0;
	    	}
	    	//tileMap.removeCustomer(tileCoord);
	    	
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
    	var event = new SCEvent(MSG_MAP_TOUCHED, this.gameLayer, args);
       	this.mediator.send(event);
       	var event2 = new SCEvent(MSG_MAP_TOUCHED, this.gameLayer, args);
       	this.mediator.send(event2);
       	
       	this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).move(mapTouchLocation);

    },
    onTouchCancelled:function (touch, event) {
    },
    prevLocation:null,
    onTouchMoved:function (touch, event) {
  
    },
    
    // Keyboard handling
    onKeyUp:function(e){ 	
	    this.inputHandler.keyUp(e);
    },
    onKeyDown:function(e){
    	this.inputHandler.keyDown(e);   
    },
    
    // make a player, initialize, add to layer
    initPlayer:function (){

    	
    	// test animaiton on player
    	var actionTo = cc.MoveTo.create(5, cc.p(1024, 32));
        this.player.runAction(actionTo);
    },
    
    updateInputState:function (){
       
    },
    
    updateLogic:function(){
	    for( var i = 0; i < entities.length; i++ ){
			entities[i].updateLogic();
		}
    },
    
    updatePhysics:function (dt){
	    for( var i = 0; i < entities.length; i++ ){
			entities[i].updatePhysics(dt, this.gameLayer.getChildByTag(TAG_TILE_MAP));
			//entities[i].updatePhysics(dt, this.tileMap);
		}
    },
    
     updateRender:function (){
	    for( var i = 0; i < entities.length; i++ ){
			entities[i].updateRender();
		}
    },
    
    updateHUD:function(dt){
    
      	this.timer.update(dt);
	    this.score.update();
	    this.customer.update();
	    this.sign.update();
	    /*
	  //this.HUDLayer.setPosition(cc.p(this.getPosition().x + this.gameConfig.timer.offset.x, this.getPosition().y + this.gameConfig.timer.offset.y)); 
	 // cc.log("SCTMXTiledScene updateHUD() HUDLayer.position = " + this.HUDLayer.getPosition().x + " " + this.HUDLayer.getPosition().y);
	  this.timer.setPosition(cc.p(this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().x + this.gameConfig.timer.offset.x, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().y + this.gameConfig.timer.offset.y));  
	  
	  this.score.setPosition(cc.p(this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().x + this.gameConfig.score.offset.x, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().y + this.gameConfig.score.offset.y));  
	  
	  	  this.customer.setPosition(cc.p(this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().x + this.gameConfig.customer.offset.x, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().y + this.gameConfig.customer.offset.y));  
	  	  
	  	   this.sign.setPosition(cc.p(this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().x + this.gameConfig.sign.offset.x, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).getPosition().y + this.gameConfig.sign.offset.y)); 
	  	   */
    },
    
    //callback for the time being over
    timeOver:function(args){
	  	cc.log("SCTMXTiledScene timeOver()");  
	    
    },
    


    // update every frame of the game
    update:function (dt) {
	    
	    this.updateInputState();
	    this.mediator.update();
	    this.updateLogic();
	    this.updatePhysics(dt);
	    this.updateRender();
	    this.updateHUD(dt);
	    //this.setPosition(cc.p((this.getPosition()).x+.05, this.getPosition().y);
	    //this.setPosition(cc.pAdd(this.getPosition(),cc.p(1,1)));
	    //this.camera.setPosition(cc.pAdd(this.getPosition(),cc.p(.1,.1)));
	    this.gameLayer.getChildByTag(TAG_CAMERA).update();
	   
	    
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

