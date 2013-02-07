// The car NPC logic. Update every frame to see what the NPC should do based on state of itself and other things like te player
var SCCarLogicComponent = SCLogicComponent.extend({

	ctor:function () {
	this._super();
    	cc.log("SCCarLogicComponent ctor()");
    	
    },
    
    changeDirection:function(state, direction){
	   	if(direction || direction == null){
		   	state.direction = direction;
		   	state.updateAnimation = true;
	   	} 
    },
    
    update:function (){
	    this._super();
    }

});