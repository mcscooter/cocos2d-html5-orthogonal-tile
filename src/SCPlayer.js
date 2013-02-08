//	Scott Cummings 2012
// 
var SCPlayer = SCEntity.extend({
   
   ctor:function (filename) {
   		this._super(filename);
   		this.gameConfig = new SCGameConfig();
   		this.logicComponent = new SCPlayerLogicComponent();
   		this.physicsCompnent = new SCPhysicsComponent();
   		this.localMediator = new SCMediator();
   		this.state.movementDirection = this.gameConfig.player.startingMovementDirection;
   		this.state.renderDirection = this.gameConfig.player.startingRenderDirection;
   		this.state.updateAnimation = false;
   		this.physicsComponent.setHitbox(this.gameConfig.player.hitbox);
   		this.physicsComponent.setBaseSpeed(this.gameConfig.player.baseSpeed);
   		this.physicsComponent.setBaseAccelleration(this.gameConfig.player.baseAccelleration);
   		this.physicsComponent.setMaxVelocity(this.gameConfig.player.maxVelocity);
    	this.centerOffset = this.gameConfig.player.centerOffset;
    	
    	
    	return this;
   },
   
   setPosition:function(newPosOrxValue, yValue){
	   this._super(newPosOrxValue, yValue);
	   if(newPosOrxValue.x && newPosOrxValue.x){
	   		this.physicsComponent.setPosition(newPosOrxValue);
	   	}else{
		   	if(newPosOrxValue && yValue){
			   	this.physicsComponent.setPosition(cc.p(newPosOrxValue, yValue));
		   	}else{
			   	cc.log("Error in SCPlayer setPosition(), no valid arguments");
		   	}
	   	}
	   		
   },
   
   setGlobalMediator:function(mediator){
   		this._super(mediator);
   		this.logicComponent.setGlobalMediator(this.globalMediator)
   },

   // put any special canvas drawing you might need in here. Hitbox is drawn on Entity
   draw:function (){
   		this._super();
   },
   
   move:function(location){
	  this.setPosition(this.physicsComponent.position.x, this.physicsComponent.position.y);
	  var args = new Object();
	  args.position = this.getPosition();
	  var event = new SCEvent(this.gameConfig.globals.MSG_PLAYER_MOVED, this, args);
      this.globalMediator.send(event);
   
   },
   
   mapTouched:function(touchArgs){
	   cc.log("SCPlayer mapTouched()");  
	   cc.log("\t touchArgs.touch.x, y = " + touchArgs.mapTouchLocation.x + ", " + touchArgs.mapTouchLocation.y);
   },
   
   updateLogic:function(){
   		this._super();
   		this.logicComponent.update();
   },
   
   updatePhysics:function(dt, map, physEntities){
   		this._super(dt);
   		this.physicsComponent.update(dt, this, map, physEntities);  
   },
   
   // put things like syncing position to physics and doing animation based on state here.
   updateRender:function(){
	   this._super();
	   this.move(this.physicsComponent.position);
	   if(this.state.updateAnimation == true){
		   this.updateAnimation();
		}
		//cc.log("SCPlayer updateRender() player.x, y = " + this.getPosition().x + ", " + this.getPosition().y);
   },
   
   updateAnimation:function(){
	 	this.state.updateAnimation = false;
	 	//cc.log("SCPlayer updateAnimation movementDirection = " + this.state.movementDirection);
	 	switch(this.state.movementDirection){
		 	
		 	case "right":
		 	this.setTexture(this.gameConfig.player.carRight);
		 	break;
		 	
		 	case "left":
		 	this.setTexture(this.gameConfig.player.carLeft);
		 	break;
		 	
		 	case "up":
		 	this.setTexture(this.gameConfig.player.carUp);
		 	break;
		 	
		 	case "down":
		 	this.setTexture(this.gameConfig.player.carDown);
		 	break;
		 	
		 	default:
		 	//cc.log("SCPlayer updateAnimation() no matching value in switch");
	 	}
   },
   // args holds info from input controller, including current state (key down)
   inputChanged:function(args){
   		// comes from SCInputHandler. args.currentState (key), args.lastState (last key) 
	   	this.logicComponent.changeDirection(this.state, args.currentState);
   }
   
    
});


