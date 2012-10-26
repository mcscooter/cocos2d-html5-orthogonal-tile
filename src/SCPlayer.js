//	Scott Cummings 2012
//

// 
var SCPlayer = SCEntity.extend({
   
   ctor:function (filename) {
   	this._super(filename);
   	cc.log("SCPlayer ctor()");
   	this.physicsComponent = new SCPhysicsComponent();
   },
   
   move:function(){
	  cc.log("SCPlayer move()"); 
   },
   
   layerTouched:function(args){
	   cc.log("SCPlayer layerTouched()");  
	   cc.log("\t args.touchLocation.x = " + args.touchLocation.x);  
	   
   }
   
    
});


