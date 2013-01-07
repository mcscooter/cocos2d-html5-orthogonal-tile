var SCGameMenu = cc.Layer.extend({
    isMouseDown:false,

    onEnter:function () {

        this._super();
        
        var size = cc.Director.getInstance().getWinSize();
        
        // This layer will get touch events
        this.setTouchEnabled(true);
        
        cc.log("SCGameMenu");
        
        var director = cc.Director.getInstance();
        director.replaceScene(new Level1);
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
var SCGameMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SCGameMenu();
       // layer.init();
        this.addChild(layer);
    }
});

