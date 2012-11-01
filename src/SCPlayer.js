//	Scott Cummings 2012
//

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
   
   move:function(){
	  cc.log("SCPlayer move()"); 
   },
   
   layerTouched:function(args){
	   cc.log("SCPlayer layerTouched()");  
	   cc.log("\t args.touchLocation.x = " + args.touchLocation.x);  
	   
   }
   
    
});


