// The player's logic. Update every frame to see what the player should do based on state of itself and other things like touch
var SCPlayerLogicComponent = SCLogicComponent.extend({

	ctor:function () {
	this._super();
    	cc.log("SCPlayerLogicComponent ctor()");
    	
    },
    
    changeDirection:function(state, direction){
	   	if(direction || direction == null){
		   	state.direction = direction;
		   	state.updateAnimaiton = true;
	   	} 
    },
    
    update:function (){
	    this._super();
    }

});