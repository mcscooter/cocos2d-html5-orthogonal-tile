// The basic physics stuff you need besides position, which is handled by each Entity->CCSprite
var SCPhysicsComponent = cc.Class.extend({

	ctor:function () {
    	cc.log("SCPhysicsComponent ctor()");
    	this.velocity = new cc.p(0,0);
    	this.hitbox = null;
    	this.mass = 0;
    	this.globalMediator = null;
    	
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
	    
	    
    }

});