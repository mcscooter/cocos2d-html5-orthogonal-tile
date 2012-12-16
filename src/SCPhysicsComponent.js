// The basic physics stuff you need besides position, which is handled by each Entity->CCSprite
var SCPhysicsComponent = cc.Class.extend({

	ctor:function () {
    	cc.log("SCPhysicsComponent ctor()");
    	this.velocity = new cc.p(0,0);
    	this.position = new cc.p(0,0);
    	this.hitbox = null;
    	this.mass = 0;
    	this.globalMediator = null;
    	this.gameConfig = new SCGameConfig();
    	
    },
     
    setGlobalMediator:function(mediator){
	  	cc.log("SCPhysicsComponent setGlobalMediator()");
	  	
	  	if(mediator){
		  	this.globalmediator = mediator;
	  	}  
    },
    
    setVelocity:function (velocity){
	    if(velocity){
		    this.velocity.x = velocity.x;
		    this.velocity.y = velocity.y;
	    }else{
		    cc.log("SCPhyicsComponent setVelocity() velocity is null");
	    }
    },
    
    setPosition:function(position){
	  if(position){
		  this.position.x = position.x;
		  this.position.y = position.y;
		  //cc.log("SCPhysicsComponent setPosition() position.x/y = " + this.position.x + " " + this.position.y);
		  
	  }  
	    
    },
    
    
    setHitbox:function (hitbox){
    	cc.log("SCPhysicsComponent setHitbox()");
    	cc.log("\t hitbox.x1,y1,width1,height1 = " + cc.Rect.CCRectGetMinX(hitbox) + ", " + cc.Rect.CCRectGetMinY(hitbox) + ", " + cc.Rect.CCRectGetMaxX(hitbox) + ", " + cc.Rect.CCRectGetMaxY(hitbox));
	    if(hitbox){
		    this.hitbox = hitbox;
	    }else{
		    cc.log("SCPhyicsComponent setHitbox() velocity is null");		    
	    }
    },
    
    drawHitbox:function (){
	    
	    
    },
    
    update:function(dt, state){
	    //cc.log("SCPhysicsComponent update()");
	    if(state.direction){
		    switch(state.direction){
			    case "left":
			    this.position.x = this.position.x - this.gameConfig.player.baseSpeed;
			    break;
			    
			    case "right":
			    this.position.x = this.position.x + this.gameConfig.player.baseSpeed;
			    break;
			    
			    case "up":
			    this.position.y = this.position.y + this.gameConfig.player.baseSpeed;
			    break;
			    
			    case "down":
			    this.position.y = this.position.y - this.gameConfig.player.baseSpeed;
			    break;
			    
			    default:
			    cc.log("SCPhysicsComponent update() no state.direction switch match");
			    
		    }
	    }else{
	    	//return this.position;
	    }
    }

});