
// The message mediator
var SCMediator = cc.Class.extend({

	ctor:function () {
    	cc.log("SCMediator ctor()");
    	this.listeners = new Array();
    	this.recieved = new Array();
    },
    
    register:function (listener){
	    this.listeners.push(listener);
    },
    
    send:function (event){
    	cc.log("SCMediator send() messageID = " + event.messageID);
	    this.recieved.push(event);  
    },
    
    update:function (){
    	//cc.log("SCMediator update()");
    	for(var i = 0; i < this.recieved.length; i++){
    	
    		cc.log("\t this.recieved[i].messageID = " + this.recieved[i].messageID);
    		cc.log("SCMediator.update() listeners.length = " + this.listeners.length);
    		
	    	for(var j = 0; j < this.listeners.length; j++){
	    		cc.log("SCMediator.update() messageID matching loop");
	    		
	    		cc.log("\t this.listeners[j].messageID = " + this.listeners[j].event.messageID);
		    	if(this.recieved[i].messageID == this.listeners[j].event.messageID){
		    	
			    	this.listeners[j].callback.call(undefined, this.recieved[i].args);
			    	
		    	}
		    }
		}
		while(this.recieved.length > 0){
			this.recieved.pop();
		}
		
	}
    
    

});