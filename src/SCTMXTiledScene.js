// CONSTANTS. don't change things in ALL_CAPS.
var TAG_TILE_MAP = 1;
var TAG_MEDIATOR = 2;
var TAG_PLAYER = 3;

var MSG_LAYER_TOUCHED = 1;
var MSG_PLAYER_MOVED = 2;



var SCTileLayer = cc.Layer.extend({
	
	
	ctor:function () {
        this.setTouchEnabled(true);
    },

    // run when SCTileLayer is created
    onEnter:function () {

    	this._super();
    	var s = cc.Director.getInstance().getWinSize();
       
    	//this.initPlayer();
    	// make a player entity
        var thisTexture = cc.TextureCache.getInstance().addImage(s_TestPlayerBlock);
        var testPlayer = new SCPlayer(thisTexture, cc.rect(0, 0, 32, 64));     
    	testPlayer.setPosition(cc.p(128,32));
    	this.addChild(testPlayer, 99, TAG_PLAYER);
       	
       	
       	// test scrolling the map
       	var actionTo = cc.MoveTo.create(5, cc.p(-128, 0));
       	this.getChildByTag(TAG_TILE_MAP).runAction(actionTo);
       	
       	// set up the listener and messaging mediator
       	this.mediator = new SCMediator();
       	
       	// test the mediator, look at onTouchEnded for next step
       	// testArg is necessary so the resulting call doesn't get undefined arguments
       	var callback = function(testArg){testPlayer.layerTouched(testArg);};
       	var layerTouchedEvent = new SCEvent(MSG_LAYER_TOUCHED, this.getChildByTag(TAG_PLAYER));
       	var testListener = new SCListener(layerTouchedEvent, callback);
       	this.mediator.register(testListener);
     	
        // update each frame
       	this.scheduleUpdate();
       	
    },
   
    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchBegan:function (touch, event) {

        return true;
    },
    onTouchEnded:function (touch, event) {
    	
    	// send touch event to mediator
    	// test sending an arbitrary object to the mediator to be sent to the callback
    	var args = new Object();
    	args.point = cc.p(123,456);
    	args.testNumber = 9182736465;
    	var event = new SCEvent(MSG_LAYER_TOUCHED, this, args);
       	this.mediator.send(event);
       	
    },
    onTouchCancelled:function (touch, event) {
    },
    prevLocation:null,
    onTouchMoved:function (touch, event) {
  
    },
    
    // make a player, initialize, add to layer
    initPlayer:function (){

    	
    	// test animaiton on player
    	var actionTo = cc.MoveTo.create(5, cc.p(1024, 32));
        this.testPlayer.runAction(actionTo);
    },
    

    // update every frame of the game
    update:function (dt) {
	    
	    this.mediator.update();
	    
      }

    
});

// Use this to create different levels / areas on a map
var Level1 = SCTileLayer.extend({
    ctor:function () {
    	// this calls the constructor of SCTileLayer
    	// put this AFTER anything you need to do before the level is initialized
        this._super();
        this.initWithLevelName("res/tilemaps/test-tilemap.tmx");
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

