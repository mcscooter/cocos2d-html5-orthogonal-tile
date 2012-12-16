
// stores input state information. Necessary because Cocos2D only gives you the last key that was pressed and held.
var SCInputHandler = cc.Class.extend({

	ctor:function () {
    	cc.log("SCInputHandler ctor()");
    	this.gameConfig = new SCGameConfig();
    	this.keysDown = new Array();
    	this.currentState = null;
    	this.lastState = null;
    	this.globalMediator = null;    	
    },
    
    sendInputChangedEvent:function(){
    	//cc.log("SCInputHandler sendInputChangedEvent() current and last states are" + this.currentState + " " + this.lastState);
    	
    	if(this.currentState != this.lastState){
	    	// broadcast input changed message globally
	    	var args = new Object();
	  		args.currentState = this.currentState;
	  		args.keysDown = this.keysDown;
	  		var event = new SCEvent(this.gameConfig.globals.MSG_INPUT_CHANGED, this, args);
	  		this.globalMediator.send(event);
	  		this.lastState = this.currentState;
	  	}
    },
    
    setGlobalMediator:function(mediator){
	    if(mediator){
	    cc.log("SCInputHandler setGlobalMediator() mediator != null");
		    this.globalMediator = mediator;
	    }    
    },
    
    keyDown:function(e){
	    
	    switch(e)
	    {
	   		case cc.KEY.left: case cc.KEY.a:
	   		//cc.log("SCInputHandler keyDown() Key is a or left, set key input state left");
	   		this.addKeyDown("left");
	   		break;
	   		case cc.KEY.right: case cc.KEY.d:
	   		//cc.log("SCInputHandler keyDown() Key is d or right, set key input state right");
	   		this.addKeyDown("right");
	   		break;
	   		case cc.KEY.up: case cc.KEY.w:
	   		//cc.log("SCInputHandler keyDown() Key is w or up, set key input state up");
	   		this.addKeyDown("up");
	   		break;
	   		case cc.KEY.down: case cc.KEY.s:
	   		//cc.log("SCInputHandler keyDown() Key is s or down, set key input state to down");
	   		this.addKeyDown("down");
	   		break;
	
	   		default:
	   		//cc.log("SCInputHandler keyDown() no case in switch statement");
	   		break;
	   	}
	     
    },
    
    keyUp:function(e){
	    
	    switch(e)
	    {
	   		case cc.KEY.left: case cc.KEY.a:
	   		//cc.log("SCInputHandler keyUp() Key is a or left, remove key input state left");
	   		this.removeKeyDown("left");
	   		break;
	   		case cc.KEY.right: case cc.KEY.d:
	   		//cc.log("SCInputHandler keyUp() Key is d or right, remove key input state right");
	   		this.removeKeyDown("right");
	   		break;
	   		case cc.KEY.up: case cc.KEY.w:
	   		//cc.log("SCInputHandler keyUp() Key is w or up, remove key input state up");
	   		this.removeKeyDown("up");
	   		break;
	   		case cc.KEY.down: case cc.KEY.s:
	   		//cc.log("SCInputHandler keyUp() Key is s or down, remove key input state to down");
	   		this.removeKeyDown("down");
	   		break;
	
	   		default:
	   		//cc.log("SCInputHandler keyUp() no case in switch statement");
	   		break;
	   	}
	     
    },
    
    removeKeyDown:function(keyUp){
    	//cc.log("SCInputHandler addKeyUp() keyUp = " + keyUp);
	    
	    // if it is already in the array, remove it.
	    // if it is the current state, change that too
	    for(var i = 0; i < this.keysDown.length; i++){
		    if(keyUp == this.keysDown[i]){
		    	//cc.log("SCInputHandler removeKeyDown(), keys match, this.keysDown.length = " + this.keysDown.length);
		    	this.keysDown.splice(i, 1);
		    	//cc.log("SCInputHandler removeKeyDown(), keys match, post splice, this.keysDown.length = " + this.keysDown.length);
		    	
		    	// if key up was the currentState, make the current state the last key down, or if there is no input make it null
		    	if(this.keysDown.length > 0){
		    		if(keyUp == this.currentState){
		    			this.currentState = this.keysDown[this.keysDown.length-1];	
		    		}
		    	}else{
			    	this.currentState = null;
		    	}
		    	
		    	//cc.log("SCInputHandler removeKeyDown(), currentState = " + this.currentState);
		    }
	    }
    	//this.logKeysDown();
    	this.sendInputChangedEvent();
	    
    },
    
    addKeyDown:function(keyDown){
	    //cc.log("SCInputHandler addKeyDown() keyDown = " + keyDown);
	    
	    // if the input is already in the array, remove it and push it to top so we keep in order. 
	    // this should take care of Cocos2D repeatedly reporting keyDown events when a key is held.
	    for(var i = 0; i < this.keysDown.length; i++){
		    if(keyDown == this.keysDown[i]){
		    	//cc.log("SCInputHandler addKeyDown(), keys match, this.keysDown.length = " + this.keysDown.length);
		    	this.keysDown.splice(i, 1);
		    	//cc.log("SCInputHandler addKeyDown(), keys match, post splice, this.keysDown.length = " + this.keysDown.length);
		    	this.keysDown.push(keyDown);
			    this.currentState = keyDown;
			    //cc.log("SCInputHandler addKeyDown(), keys match, post splice and push, this.keysDown.length = " + this.keysDown.length);
			    //cc.log("SCInputHandler addKeyDown(), this.currentState = " + this.currentState);
			    //this.logKeysDown();
			    this.sendInputChangedEvent();
			    return;
		    }
	    }
	    // key not in current array
	    this.keysDown.push(keyDown);
	    this.currentState = keyDown;
	    this.sendInputChangedEvent();
	    //this.logKeysDown();
	    
    },
    
    logKeysDown:function(){
	    for(var i = 0; i < this.keysDown.length; i++){
		    cc.log("SCInputHandler logKeysDown() keysDown[" + i + "] = " + this.keysDown[i] );
		    
	    }
	    cc.log("SCInputHandler logKeysDown() currentState = " + this.currentState );
    }

});