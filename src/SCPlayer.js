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
   		this.direction = this.gameConfig.player.startingDirection;
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
	  cc.log("SCPlayer move()"); 
	  cc.log("SCPlayer move() this.centerOffset = " + this.centerOffset.x + " " + this.centerOffset.y);
	  this.setPosition(cc.pSub(location, this.centerOffset));
	  // broadcast player moved message globally
	  var args = new Object();
	  args.position = this.getPosition();
	  var event = new SCEvent(this.gameConfig.tags.MSG_PLAYER_MOVED, this, args);
      this.globalMediator.send(event);
   
   },
   
   mapTouched:function(touchArgs){
	   cc.log("SCPlayer mapTouched()");  
	   cc.log("\t touchArgs.touch.x = " + touchArgs.mapTouchLocation.x);  
	  // this.move(touchArgs.mapTouchLocation);
	   
   },
   
   updateLogic:function(){
   		//cc.log("SCPlayer updateLogic()");
	   this.logicComponent.update();
   },
   
   inputChanged:function(args){
	   cc.log("SCPlayer inputChanged(), args.currentState = " + args.currentState);
	   this.direction = this.logicComponent.changeDirection(args.currentState);
	   cc.log("SCPlayer inputChanged(), post logicComponent.changeDireciton() direction = " + this.direction);
	   
   }
   
    
});


