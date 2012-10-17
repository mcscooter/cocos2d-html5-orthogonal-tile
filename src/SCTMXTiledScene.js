// CONSTANTS. don't change things in ALL_CAPS.
var TAG_TILE_MAP = 1;

var SCTileLayer = cc.Layer.extend({
	
	
	ctor:function () {
        this.setTouchEnabled(true);
    },
    init:function () {
	    
	    //this._super();
    	var s = cc.Director.getInstance().getWinSize();

    	//var testPlayer = new SCPlayer();
    	//testPlayer.setPosition(cc.p(25,25));
        //this.addChild(testPlayer);
       	
       	// update each frame
       	this.scheduleUpdate();
	    
	    
    },

    onEnter:function () {

    	this._super();
    	var s = cc.Director.getInstance().getWinSize();


    	//var testPlayer = new SCPlayer();
    	//testPlayer.setPosition(cc.p(25,25));
        //this.addChild(testPlayer, 4);

        
        var map = cc.TMXTiledMap.create("res/tilemaps/test-tilemap.tmx");
        map.setPosition(cc.p(0,0));
        this.addChild(map, 0, TAG_TILE_MAP);
        //this.init();
        

    	//this.testPlayer = new SCPlayer();
    	//this.testPlayer = new SCPlayer();
       // this.testPlayer.setPosition(cc.p(20,20));
        //this.addChild(this.testPlayer, 2);
        //var actionTo2 = cc.MoveTo.create(2, cc.p(300, 300));
        //this.testPlayer.runAction(actionTo2);
        
       	
       	// update each frame
       //	this.scheduleUpdate();
       	
    },
   
    registerWithTouchDispatcher:function () {
        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);
    },
    onTouchBegan:function (touch, event) {

        return true;
    },
    onTouchEnded:function (touch, event) {
     
    },
    onTouchCancelled:function (touch, event) {
    },
    prevLocation:null,
    onTouchMoved:function (touch, event) {
  
    },
    update:function (dt) {
	    // update each frame
     
      }

    
});

var SCTMXTiledScene = SCTileLayer.extend({
    ctor:function () {
        this._super();
        
        /*
        var map = cc.TMXTiledMap.create("res/tilemaps/test-tilemap.tmx");
        map.setPosition(cc.p(0,0));
        this.addChild(map, 0, TAG_TILE_MAP);
        //this.init();
        */
    },
    
    initWithLevelName:function (levelName) {
	    
	    
    }

});

