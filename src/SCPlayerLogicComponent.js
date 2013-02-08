// The player's logic. Update every frame to see what the player should do based on state of itself and other things like touch
var SCPlayerLogicComponent = SCLogicComponent.extend({

	ctor:function () {
	this._super();
    	cc.log("SCPlayerLogicComponent ctor()");
    	
    },
    
    changeDirection:function(state, inputDirection){
	   	if(inputDirection || inputDirection == null){
		   	state.movementDirection = inputDirection;
		   	state.updateAnimation = true;
	   	} 
    },
    
    update:function (){
	    this._super();
    }

});