//	Scott Cummings 2012
//

// 
var SCPlayer = SCEntity.extend({
   
   ctor:function (filename) {
   	this._super(filename);
   	cc.log("SCPlayer ctor()");
   },
   
   move:function(){
	  cc.log("SCPlayer move()"); 
   },
   
   layerTouched:function(args){
	   cc.log("SCPlayer layerTouched()");  
	   cc.log("\t args.point.x = " + args.testNumber);  
	   
   }
   
    
});


