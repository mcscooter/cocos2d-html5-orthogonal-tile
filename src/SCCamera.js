// Camera that determines viewport
var SCCamera = cc.Sprite.extend({

	ctor:function (filename) {
    	cc.log("SCCamera ctor()");
    	this.position = new cc.p(0,0);
    	this.targetPosition = new cc.p(0,0);
    	this.view = null;
    	
    },
    
    setView:function (view){
	    if(view){
		    this.view = view;
	    }else{
		    cc.log("SCCamera setView() view is null");
	    }
    },
    
    setPosition:function (position){
	    if(position){
		    this.position.x = position.x;
		    this.position.y = position.y;
	    }else{
		    cc.log("SCCamera setPosition() position is null");
	    }
    },
    
    playerMoved:function (arguments){
	    stageSize = cc.Director.getInstance().getWinSize();
	    
	   cc.log("SCCamera playerMoved() x/y = " + arguments.position.x + " " + arguments.position.y);
	  // var newTarget = cc.pSub( arguments.position, cc.p(stageSize.x/2, stageSize.y/2) );
	   
	   this.targetPosition = arguments.position;
	   //this.targetPosition = arguments.position;
    },
    
    update:function(){
    	cc.log("SCCamera update() new position = " + this.targetPosition.x + " " + this.targetPosition.y);
	    stageSize = cc.Director.getInstance().getWinSize();
	    
	    
	    this.position = this.targetPosition;
	    
	    this.view.setPosition(cc.pSub(cc.p(0,0), this.position));
    }

});