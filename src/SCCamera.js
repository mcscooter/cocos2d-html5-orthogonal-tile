// Camera that determines viewport
var SCCamera = cc.Sprite.extend({

	ctor:function (filename) {
		this._super(filename);
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
	   
	       this.position = this.targetPosition;
	    
	    cc.log("SCCamera playerMoved() new position = " + this.position.x + " " + this.position.y);
	  //  cc.log("SCCamera update() cc.Director.getInstance().getWinSize() = " + stageSize.width + " " + stageSize.height);
	    //this.view.setPosition(cc.pSub(cc.p(stageSize.x/2, stageSize.y/2), this.position));
	   // var viewPos = this.view.getPosition();
	    //cc.log(viewPos.x + " " + viewPos.y);
	    //this.view.setPosition(cc.pSub( this.position, cc.p(stageSize.x/2, stageSize.y/2)));
	    //this.view.setPosition(cc.p(50,50));
	    this.view.setPosition(cc.pSub(cc.p(stageSize.width/2, stageSize.height/2), this.position));
	    cc.log("SCCamera playerMoved() this.view.position = " + this.view.getPosition().x + " " + this.view.getPosition().y);
    },
    
    update:function(){
    	
	    var stageSize = cc.Director.getInstance().getWinSize();
	    
	   
	    this.position = this.targetPosition;
	    
	  //  cc.log("SCCamera update() new position = " + this.position.x + " " + this.position.y);
	  //  cc.log("SCCamera update() cc.Director.getInstance().getWinSize() = " + stageSize.width + " " + stageSize.height);
	    //this.view.setPosition(cc.pSub(cc.p(stageSize.x/2, stageSize.y/2), this.position));
	   // var viewPos = this.view.getPosition();
	    //cc.log(viewPos.x + " " + viewPos.y);
	    //this.view.setPosition(cc.pSub( this.position, cc.p(stageSize.x/2, stageSize.y/2)));
	    //this.view.setPosition(cc.p(50,50));
	    //this.view.setPosition(cc.pSub(cc.p(0, 0), this.position));
	    //cc.log("SCCamera update() this.view.position = " + this.view.getPosition().x + " " + this.view.getPosition().y);
    }

});