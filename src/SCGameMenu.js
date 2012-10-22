var SCGameMenu = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    onEnter:function () {
        var selfPointer = this;
        
        cc.log("SCGameMenu.js init()");

        //////////////////////////////
        // 1. super init first
        this._super();

        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();
        
        // This layer will get touch events
        this.setTouchEnabled(true);
        
        // attach a visual to the layer for testing
     //  var testSprite = cc.Sprite.create("res/images/test-tilesheet.png");
    //    testSprite.setPosition(cc.p(0, 0));
      //  this.addChild(testSprite, 3);
       // var actionTo1 = cc.MoveTo.create(2, cc.p(300, 300));
    
        return true;
    },
    
  
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
        delete this;
         var director = cc.Director.getInstance();
         cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
         cc.AnimationCache.purgeSharedAnimationCache();
        cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        cc.TextureCache.purgeSharedTextureCache();
         //director.purgeDirector();
        director.replaceScene(new Level1);
        cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

// This is called in main.js to load the main game menu
//	It is also called any time
var SCGameMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SCGameMenu();
       // layer.init();
        this.addChild(layer);
    }
});

