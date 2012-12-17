//	Scott Cummings 2012
//

var SCEnd = cc.Layer.extend({
    isMouseDown:false,
    level:"home",

    init:function () {
    
    	
        cc.log("SCSceneManager.js init()");
        
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();


        // Add a lazy background layer. It will be in a seperate canvas element behind the main game.
        // Do not set the Z order to greater than 0, as it will try to eat the input events of things behind it
        // To add anthing to the main game layer, just add it to "this"
       // var lazyLayer = new cc.LazyLayer();
        //this.addChild(lazyLayer);
        
        // This layer will get touch events
        this.setTouchEnabled(true);
   
        var testSprite = cc.Sprite.create("res/HelloWorld.png");
        testSprite.setPosition(cc.p(10, 10));
        this.addChild(testSprite, 1);
        //var actionTo = cc.MoveTo.create(2, cc.p(0, 0));
        //testSprite.runAction(actionTo);
        
      
        var director = cc.Director.getInstance();
        director.replaceScene(new Level1);
        
        
        return true;
    },
    
        // Sets the target level. Will have logic in Scene Manager for this as well so when the game inits it loads the correct place, etc.
    setTargetLevel:function(newLevel){
	    
	    if(newLevel){
		    this.level = newLevel;
		}
    },
    
    // Handle touch and mouse events
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
        // Start Up The Game Menu
        var director = cc.Director.getInstance();
        director.pushScene(new SCGameMenuScene);
        // var transition = cc.TransitionCrossFade.create(300, new SCGameMenuScene);
        //director.replaceScene(cc.TransitionFade.create(3, new SCGameMenuScene, cc.c3b(255,0,0)));
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});


var SCEndScene = cc.Scene.extend({

    onEnter:function () {
	    this._super();
	   layer = new SCEnd();
	   layer.init();
        this.addChild(layer); 
    },
    
    init:function(nextScene){   
      
    }
});

