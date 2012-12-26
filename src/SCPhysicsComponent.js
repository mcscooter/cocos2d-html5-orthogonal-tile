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
    
    
    // returns the corners of the hitbox in order: BL, BR, TR, TL. 
    getHitboxVertices:function(){
	    
	    var vertices = [cc.p(cc.Rect.CCRectGetMinX(this.hitbox), cc.Rect.CCRectGetMinY(this.hitbox)), cc.p(cc.Rect.CCRectGetMaxX(this.hitbox), cc.Rect.CCRectGetMinY(this.hitbox)), cc.p(cc.Rect.CCRectGetMaxX(this.hitbox), cc.Rect.CCRectGetMaxY(this.hitbox)), cc.p(cc.Rect.CCRectGetMinX(this.hitbox), cc.Rect.CCRectGetMaxY(this.hitbox))];
	    
	    return vertices;
	    
    },
    
    drawHitbox:function (){
	    
	    
    },
    
    checkForegroundLeft:function(position, caller, map, hitboxVertices){
	    
	    var bottomLeft = cc.p(position.x + hitboxVertices[0].x, position.y + hitboxVertices[0].y);
	    var topLeft = cc.p(position.x + hitboxVertices[3].x, position.y + hitboxVertices[3].y);
	    //cc.log("SCPhysicsCompnent checkForegroundLeft() bottomLeft.x/y = " + bottomLeft.x + " " + bottomLeft.y);
	    
	    var blForegroundProperties = map.getPointProperties("foreground", bottomLeft);
	    if(blForegroundProperties){
	    	 //cc.log("SCPhysicsCompnent checkForegroundLeft() blForegroundProperties.name = " + blForegroundProperties.name);
		    if(blForegroundProperties.name == "grass" || blForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundLeft() BL COLLISION");
			     while(map.getPointProperties("foreground", bottomLeft).name == "grass" || map.getPointProperties("foreground", bottomLeft).name == "house"){
				     position.x += 1;
				     bottomLeft = cc.p(position.x + hitboxVertices[0].x, position.y + hitboxVertices[0].y);
			     }
			     
		    }
		    
	    }
	    
	    var tlForegroundProperties = map.getPointProperties("foreground", topLeft);
	    if(tlForegroundProperties){
	    	//cc.log("SCPhysicsCompnent checkForegroundLeft() tlForegroundProperties.name = " + tlForegroundProperties.name);
		    if(tlForegroundProperties.name == "grass" || tlForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundLeft() TL COLLISION");
			     while(map.getPointProperties("foreground", topLeft).name == "grass" || map.getPointProperties("foreground", topLeft).name == "house"){
				     position.x += 1;
				     topLeft = cc.p(position.x + hitboxVertices[3].x, position.y + hitboxVertices[3].y);
			     }
			     
		    }
		    
	    }
	    
	    
	    return position.x;
    },
    
    checkForegroundRight:function(position, caller, map, hitboxVertices){
	    
	    var bottomRight = cc.p(position.x + hitboxVertices[1].x, position.y + hitboxVertices[1].y);
	    var topRight = cc.p(position.x + hitboxVertices[2].x, position.y + hitboxVertices[2].y);
	    //cc.log("SCPhysicsCompnent checkForegroundRight() bottomRight.x/y = " + bottomRight.x + " " + bottomRight.y);
	    
	    var brForegroundProperties = map.getPointProperties("foreground", bottomRight);
	    if(brForegroundProperties){
	    	 //cc.log("SCPhysicsCompnent checkForegroundRight() brForegroundProperties.name = " + brForegroundProperties.name);
		    if(brForegroundProperties.name == "grass" || brForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundRight() BR COLLISION");
			     while(map.getPointProperties("foreground", bottomRight).name == "grass" || map.getPointProperties("foreground", bottomRight).name == "house"){
				     position.x -= 1;
				     bottomRight = cc.p(position.x + hitboxVertices[1].x, position.y + hitboxVertices[1].y);
			     }
			     
		    }
		    
	    }
	    
	    var trForegroundProperties = map.getPointProperties("foreground", topRight);
	    if(trForegroundProperties){
	    	//cc.log("SCPhysicsCompnent checkForegroundRight() trForegroundProperties.name = " + trForegroundProperties.name);
		    if(trForegroundProperties.name == "grass" || trForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundRight() TR COLLISION");
			     while(map.getPointProperties("foreground", topRight).name == "grass" || map.getPointProperties("foreground", topRight).name == "house"){
				     position.x -= 1;
				     topRight = cc.p(position.x + hitboxVertices[2].x, position.y + hitboxVertices[2].y);
			     }
			     
		    }
		    
	    }
	    
	    
	    return position.x;
    },
    
    checkForegroundTop:function(position, caller, map, hitboxVertices){
	    
	    var topRight = cc.p(position.x + hitboxVertices[2].x, position.y + hitboxVertices[2].y);
	    var topLeft = cc.p(position.x + hitboxVertices[3].x, position.y + hitboxVertices[3].y);
	    //cc.log("SCPhysicsCompnent checkForegroundTop() topRight.x/y = " + topRight.x + " " + topRight.y);
	    
	    var trForegroundProperties = map.getPointProperties("foreground", topRight);
	    if(trForegroundProperties){
	    	 //cc.log("SCPhysicsCompnent checkForegroundTop() trForegroundProperties.name = " + trForegroundProperties.name);
		    if(trForegroundProperties.name == "grass" || trForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundTop() TR COLLISION");
			     while(map.getPointProperties("foreground", topRight).name == "grass" || map.getPointProperties("foreground", topRight).name == "house"){
				     position.y -= 1;
				     topRight = cc.p(position.x + hitboxVertices[2].x, position.y + hitboxVertices[2].y);
			     }
			     
		    }
		    
	    }
	    
	    var tlForegroundProperties = map.getPointProperties("foreground", topLeft);
	    if(tlForegroundProperties){
	    	 //cc.log("SCPhysicsCompnent checkForegroundTop() tlForegroundProperties.name = " + tlForegroundProperties.name);
		    if(tlForegroundProperties.name == "grass" || tlForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundTop() TL COLLISION");
			     while(map.getPointProperties("foreground", topLeft).name == "grass" || map.getPointProperties("foreground", topLeft).name == "house"){
				     position.y -= 1;
				     topLeft = cc.p(position.x + hitboxVertices[3].x, position.y + hitboxVertices[3].y);
			     }
			     
		    }
		    
	    }

	    
	    
	    return position.y;
    },
    
    checkForegroundBottom:function(position, caller, map, hitboxVertices){
	    
	    var bottomRight = cc.p(position.x + hitboxVertices[1].x, position.y + hitboxVertices[1].y);
	    var bottomLeft = cc.p(position.x + hitboxVertices[0].x, position.y + hitboxVertices[0].y);
	    //cc.log("SCPhysicsCompnent checkForegroundBottom() bottomRight.x/y = " + bottomRight.x + " " + bottomRight.y);
	    
	   var brForegroundProperties = map.getPointProperties("foreground", bottomRight);
	    if(brForegroundProperties){
	    	 //cc.log("SCPhysicsCompnent checkForegroundBottom() brForegroundProperties.name = " + brForegroundProperties.name);
		    if(brForegroundProperties.name == "grass" || brForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundBottom() BR COLLISION");
			     while(map.getPointProperties("foreground", bottomRight).name == "grass" || map.getPointProperties("foreground", bottomRight).name == "house"){
				     position.y += 1;
				     bottomRight = cc.p(position.x + hitboxVertices[1].x, position.y + hitboxVertices[1].y);
			     }
			     
		    }
		    
	    }
	    
	    var blForegroundProperties = map.getPointProperties("foreground", bottomLeft);
	    if(blForegroundProperties){
	    	 //cc.log("SCPhysicsCompnent checkForegroundBottom() blForegroundProperties.name = " + blForegroundProperties.name);
		    if(blForegroundProperties.name == "grass" || blForegroundProperties.name == "house"){
			     //cc.log("SCPhysicsCompnent checkForegroundBottom() BL COLLISION");
			     while(map.getPointProperties("foreground", bottomLeft).name == "grass" || map.getPointProperties("foreground", bottomLeft).name == "house"){
				     position.y += 1;
				     bottomLeft = cc.p(position.x + hitboxVertices[0].x, position.y + hitboxVertices[0].y);
			     }
			     
		    }
		    
	    }

	    
	    
	    return position.y;
    },
    
    update:function(dt, caller, map){
	    //cc.log("SCPhysicsComponent update()");
	   //cc.log("SCPhysicsComponent update() dt*this.gameConfig.player.baseSpeed = " + (Math.round(dt*this.gameConfig.player.baseSpeed)));
	   
	   	var nextPosition = cc.p(this.position.x, this.position.y);
	   	
	   	// returns array of cc.p objects in order BL, BR, TR, TL
	    var hitboxVertices = this.getHitboxVertices();
	    
	    if(caller.state.direction){
		    switch(caller.state.direction){
			    case "left":
			    this.position.x = this.position.x - this.gameConfig.player.baseSpeed;
			    this.position.x = this.checkForegroundLeft(this.position, caller, map, hitboxVertices);
			    break;
			    
			    case "right":
			    this.position.x = this.position.x + this.gameConfig.player.baseSpeed;
			    this.position.x = this.checkForegroundRight(this.position, caller, map, hitboxVertices);
			    break;
			    
			    case "up":
			    this.position.y = this.position.y + this.gameConfig.player.baseSpeed;
			    this.position.y = this.checkForegroundTop(this.position, caller, map, hitboxVertices);
			    break;
			    
			    case "down":
			    this.position.y = this.position.y - this.gameConfig.player.baseSpeed;
			    this.position.y = this.checkForegroundBottom(this.position, caller, map, hitboxVertices);
			    break;
			    
			    default:
			    //cc.log("SCPhysicsComponent update() no state.direction switch match");
			    
		    }
	    }else{
	    	//return this.position;
	    }
	    
	    
	    
	    
	    if((map.getPointProperties("signs", this.position)))
	    {
	    	//cc.log("SCPhysicsComponent update() map.getPointSignProperties.name = " + (map.getPointSignProperties(this.position)).name);
	    }
	    
	    
	   
	    
    }

});