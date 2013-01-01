//	Scott Cummings 2012
//

var SCSceneM = cc.Layer.extend({
    isMouseDown:false,
    level:"default",

    init:function () {
    	
    	this._super();
    	
    	cc.log("SCSceneManager init");
        var selfPointer = this;
        var size = cc.Director.getInstance().getWinSize();
        this.setTouchEnabled(true);
   
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
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});


var SCSceneManager = cc.Scene.extend({

    onEnter:function () {
	    this._super();
	   layer = new SCSceneM();
	   layer.init();
       this.addChild(layer); 
    },
    
    init:function(nextScene){   
      
    }
});

