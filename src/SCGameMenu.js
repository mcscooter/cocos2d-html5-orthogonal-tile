var SCGameMenu = cc.Layer.extend({
    isMouseDown:false,

    onEnter:function () {

        this._super();
        
        var size = cc.Director.getInstance().getWinSize();
        
        // This layer will get touch events
        this.setTouchEnabled(true);
        
        cc.log("SCGameMenu");
        
        var director = cc.Director.getInstance();
        
        this.gameConfig  = new SCGameConfig();
        
        
        var background = new cc.Sprite(this.gameConfig.gameMenuScene.backgroundTexture);     
    	background.setPosition(this.gameConfig.gameMenuScene.backgroundPosition);
    	this.addChild(background, -999, this.gameConfig.globals.TAG_MENU_BACKGROUND);
        
        var title = new cc.Sprite(this.gameConfig.gameMenuScene.titleTexture);     
    	title.setPosition(this.gameConfig.gameMenuScene.titlePosition);
    	this.addChild(title, 1, this.gameConfig.globals.TAG_MENU_TITLE);
    	
    	//var playButton = new cc.MenuItemFont.create("Play",this,this.playGame());
    	//var playButton = new cc.MenuItemImage.create(s_MenuPlay,this,this.playGame());
       // var instructionsButton = new cc.MenuItemImage.create(s_MenuInstructions,this,this.playGame());
       // var menu = cc.Menu.create(playButton);
       // menu.alignItemsHorizontally();
       // menu.setPosition(new cc.p(425,100));

       //this.addChild(menu);
        
        
        
        //director.replaceScene(new Level1);
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
       // this.playGame();
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    },
    
    playGame:function(){
	    delete this;
        var director = cc.Director.getInstance();
        cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
        cc.AnimationCache.purgeSharedAnimationCache();
        cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        cc.TextureCache.purgeSharedTextureCache();
        //director.purgeDirector();
        director.replaceScene(new Level1);
        cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
	    
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

