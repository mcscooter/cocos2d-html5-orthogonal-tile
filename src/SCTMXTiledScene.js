
// an array of the entities in the game
var entities = new Array();
var physicsEntities = new Array();

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
    	// gets the size of the game. In points, not pixels.
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
        this.gameLayer.addChild(tileMap, 0, this.gameConfig.globals.TAG_TILE_MAP);
       
        // set up the listener and messaging mediator
       	this.mediator = new SCMediator();
       	
       	// handles keyboard input, will move touch to this eventually
       	this.inputHandler = new SCInputHandler();
       	
       	// add the physics engine
       	// this.physics = new SCPhysics();
       	
       	// determines what we see on the stage
       	camera = new SCCamera();
       	camera.setView(this.gameLayer);
       	this.gameLayer.addChild(camera, -1000, this.gameConfig.globals.TAG_CAMERA);
       
    	// Make a player entity
    	// Since SCPlayer extends a CCSprite (SCEntity), we start with a texture. Could be a 1px transparent image if an invisible sprite is needed.
        var player = new SCPlayer(this.gameConfig.player.carRight, this.gameConfig.player.baseTextureRect);     
    	player.setPosition(this.gameConfig.player.startPosition);
    	player.setID(this.gameConfig.globals.TAG_PLAYER);
    	entities.push(player);
    	physicsEntities.push(player);
    	this.gameLayer.addChild(player, 99, this.gameConfig.globals.TAG_PLAYER);
       	//this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER).setPosition(this.gameConfig.player.startPosition);
       	
       	// Make a car entity
    	// Since SCCar extends a CCSprite (SCEntity), we start with a texture. Could be a 1px transparent image if an invisible sprite is needed.
        var carEntity = new SCCar(this.gameConfig.greenCar.greenCarRight, this.gameConfig.greenCar.baseTextureRect);     
    	carEntity.setPosition(this.gameConfig.greenCar.startPosition);
    	carEntity.setID(this.gameConfig.globals.TAG_CAR_ENTITY);
    	entities.push(carEntity);
    	physicsEntities.push(carEntity);
    	this.gameLayer.addChild(carEntity, 100, this.gameConfig.globals.TAG_CAR_ENTITY);
       
       	
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
       	var mapTouchEvent = new SCEvent(this.gameConfig.globals.MSG_MAP_TOUCHED, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP));
       	var mapTouchListener = new SCListener(mapTouchEvent, mapTouchEventCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	this.mediator.register(mapTouchListener);
     	
     	
     	var playerMovedCameraCallback = function(testArg){camera.playerMoved(testArg);};
       	var playerMovedCameraEvent = new SCEvent(this.gameConfig.globals.MSG_PLAYER_MOVED, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_CAMERA));
       	var playerMovedCameraListener = new SCListener(playerMovedCameraEvent, playerMovedCameraCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_CAMERA));
       	this.mediator.register(playerMovedCameraListener);
       	
       	var inputHandlerStateEventCallback = function(args){player.inputChanged(args);};
       	var inputHandleStateEvent = new SCEvent(this.gameConfig.globals.MSG_INPUT_CHANGED, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER));
       	var inputHandlerStateEventListener = new SCListener(inputHandleStateEvent, inputHandlerStateEventCallback, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_PLAYER));
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
    	var tileMap = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    	var layer = tileMap.getLayer("foreground");
    	var tileSize = tileMap.getTileSize();
    	var mapSize = tileMap.getMapSize();
    	var mapLocation = tileMap.getPosition();
    	var mapTouchLocation = tileMap.convertTouchToNodeSpace(touch);
    	var tileTouchedX = Math.floor(mapTouchLocation.x / tileSize.width);
    	var tileTouchedY = Math.floor(mapSize.height - mapTouchLocation.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileTouchedX, tileTouchedY);
    	var signProperties = tileMap.getPointProperties("signs", mapTouchLocation);
    	var customerProperties = tileMap.getPointProperties("customers", mapTouchLocation);
    	
    	if(customerProperties){
	    	this.customer.setLoan(customerProperties.loan);
	    	tileMap.removeCustomer(tileCoord);
    	}
    	
    	if(signProperties){
	    	this.sign.setPrice(signProperties.price);
	    	if(parseInt(this.customer.loan) >= parseInt(this.sign.price)){
	    		this.score.score += parseInt(this.sign.getPrice());
		    	tileMap.removeSign(tileCoord);
		    	this.customer.loan = 0;
	    	}	
    	}
    	
    	// send touch event
    	var touchArgs = new Object();
    	touchArgs.mapTouchLocation = mapTouchLocation;
    	var touchEvent = new SCEvent(this.gameConfig.globals.MSG_MAP_TOUCHED, this, touchArgs);
       	this.mediator.send(touchEvent);
    	
    	// send touch event to mediator
    	// test sending an arbitrary object to the mediator to be sent to the callback
    	var args = new Object();
    	args.touchLocation = touchLocation;
    	args.mapTouchLocation = mapTouchLocation;
    	var event = new SCEvent(this.gameConfig.globals.MSG_MAP_TOUCHED, this.gameLayer, args);
       	this.mediator.send(event);
       	var event2 = new SCEvent(this.gameConfig.globals.MSG_MAP_TOUCHED, this.gameLayer, args);
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
	    for( var i = 0; i < physicsEntities.length; i++ ){
	    	if(physicsEntities[i].physicsComponent){
				physicsEntities[i].updatePhysics(dt, this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP), physicsEntities);
			}else{cc.log("SCTMXTiledScene updatePhysics entity with ------ NO ------ physics component.");}
		}
    },
    
     updateRender:function (){
	    for( var i = 0; i < entities.length; i++ ){
			entities[i].updateRender();
		}
		this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_CAMERA).update(); // probably should change to gameLayer.update()
    },
    
    updateHUD:function(dt){  
      	this.timer.update(dt);
	    this.score.update();
	    this.customer.update();
	    this.sign.update();
    },
    
    //callback for the time being over
    timeOver:function(args){
	  	cc.log("SCTMXTiledScene timeOver()");  
    },
    
    // update every frame of the game
    update:function (dt) {
    	//cc.log("this.gameLayer.position = " + this.gameLayer.getPosition().x + " " + this.gameLayer.getPosition().y);
	    this.updateInputState();
	    this.mediator.update();
	    this.updateLogic();
	    this.updatePhysics(dt);
	    this.updateRender();
	    this.updateHUD(dt);
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
        this._super();
    },
    
    // not currently used. fix this up to make it easy to launch any level
    initWithLevelName:function (levelName) {
        var map = new SCTileMap();
        map.initWithTMXFile(levelName);
        map.setPosition(cc.p(0,0));
        this.addChild(map, 0, this.gameConfig.globals.TAG_TILE_MAP);
        
	    
    }

});

