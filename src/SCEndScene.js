//	Scott Cummings 2012
//

var SCEnd = cc.Layer.extend({
    isMouseDown:false,

    init:function () {
    
    	
        cc.log("SCSceneManager.js init()");
        
        this._super();
        var selfPointer = this;
        var size = cc.Director.getInstance().getWinSize();
        this.setTouchEnabled(true);
   
        var testSprite = cc.Sprite.create("res/HelloWorld.png");
        testSprite.setPosition(cc.p(10, 10));
        this.addChild(testSprite, 1);
      
        var director = cc.Director.getInstance();
        director.replaceScene(new Level1);
                
        return true;
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
    },
    onTouchesCancelled:function (touches, event) {
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

