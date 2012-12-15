// The generic logic component
var SCLogicComponent = cc.Class.extend({

	ctor:function () {
    	cc.log("SCLogicComponent ctor()");
    	this.globalMediator = null;
    },
    
    setGlobalMediator:function(mediator){
	  	cc.log("SCLogicComponent setGlobalMediator()");
	  	
	  	if(mediator){
		  	this.globalmediator = mediator;
	  	}  
    },
        
    update:function (){
	    
	    
    }

});