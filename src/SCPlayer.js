//	Scott Cummings 2012
//
var MSG_PLAYER_MOVED = 2;
// 
var SCPlayer = SCEntity.extend({
   
   ctor:function (filename) {
   	this._super(filename);
   	cc.log("SCPlayer ctor()");
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
	  var event = new SCEvent(MSG_PLAYER_MOVED, this, args);
      this.globalMediator.send(event);
   
   },
   
   layerTouched:function(args){
	   cc.log("SCPlayer layerTouched()");  
	   cc.log("\t args.touchLocation.x = " + args.touchLocation.x);  
	   
   }
   
    
});


