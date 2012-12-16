//	Scott Cummings 2012
// 
var SCPlayer = SCEntity.extend({
   
   ctor:function (filename) {
   		this._super(filename);
   		cc.log("SCPlayer ctor()");
   		this.gameConfig = new SCGameConfig();
   		this.logicComponent = new SCPlayerLogicComponent();
   		this.physicsCompnent = new SCPhysicsComponent();
   		this.baseSpeed = this.gameConfig.player.baseSpeed;
   		this.baseAccelleration = this.gameConfig.player.baseAccelleration;
   		this.localMediator = new SCMediator();
   		this.state.direction = this.gameConfig.player.startingDirection;
   },
   
   setPosition:function(newPosOrxValue, yValue){
	   this._super(newPosOrxValue, yValue);
	   this.physicsComponent.setPosition(newPosOrxValue);
   },
   
   setGlobalMediator:function(mediator){
   		this._super(mediator);
   		cc.log("SCPlayer setGlobalMediator()");
   		this.logicComponent.setGlobalMediator(this.globalMediator)
   },
   
   // put any special canvas drawing you might need in here. Hitbox is drawn on Entity
   draw:function (){
   		this._super();
  
  		 
   },
   
   move:function(location){
	  //cc.log("SCPlayer move()"); 
	  //cc.log("SCPlayer move() this.centerOffset = " + this.centerOffset.x + " " + this.centerOffset.y);
	  //this.setPosition(cc.pSub(location, this.centerOffset)); // was for the touch offset, will need to look at later. replaceed with a straight setPosition
	  this.setPosition(this.physicsComponent.position);
	  // broadcast player moved message globally
	  var args = new Object();
	  args.position = this.getPosition();
	  var event = new SCEvent(this.gameConfig.globals.MSG_PLAYER_MOVED, this, args);
      this.globalMediator.send(event);
   
   },
   
   mapTouched:function(touchArgs){
	   cc.log("SCPlayer mapTouched()");  
	   cc.log("\t touchArgs.touch.x = " + touchArgs.mapTouchLocation.x);  
	  // this.move(touchArgs.mapTouchLocation);
	   
   },
   
   updateLogic:function(){
   		//cc.log("SCPlayer updateLogic()");
   		this._super();
   		this.logicComponent.update();
   },
   
   updatePhysics:function(dt){
   		//cc.log("SCPlayer updatePhyics()");
   		this._super(dt);
   		this.physicsComponent.update(dt, this.state);  
	 	//cc.log("SCPlayer updatePhyics() this.physicsComponent.position.x/y = " + this.physicsComponent.position.x + " " + this.physicsComponent.position.y );
   },
   
   // put things like syncing position to physics and doing animation based on state here.
   updateRender:function(){
   		//cc.log("SCPlayer updateRender()");
	   this._super();
	   this.move(this.physicsComponent.position);
   },
   
   inputChanged:function(args){
   		// comes from SCInputHandler. args.currentState (key), args.lastState (last key) 
	   	cc.log("SCPlayer inputChanged(), args.currentState = " + args.currentState);
	   	this.logicComponent.changeDirection(this.state, args.currentState);
	   	cc.log("SCPlayer inputChanged(), post logicComponent.changeDireciton() direction = " + this.state.direction);
	   
   }
   
    
});


