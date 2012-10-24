
// The message mediator
var SCMediator = cc.Class.extend({

	ctor:function () {
    	//cc.log("SCMediator ctor()");
    	this.listeners = new Array();
    	this.recieved = new Array();
    	this.nextObjectID = 0;
    },
    
    register:function (listener){
    	//cc.log("SCMediator register()");
    	if(listener.object.listenerObjectID){
	    	
    	}else{
	    	listener.object.listenerObjectID = this.nextObjectID;
	    	//cc.log("\t this.listener.object.listenerObjectID = " + listener.object.listenerObjectID);
	    	this.nextObjectID++;
    	}
	    this.listeners.push(listener);
    },
    
    unregister:function(object){
	    cc.log("SCMediator unregister()");
	    cc.log("\t before removal loop -> this.listeners.length = " + this.listeners.length);
	    // loop backwards in array so it doesn't change the length as we go
	    for(var i = this.listeners.length -1; i >= 0; i--){
	    	if(object.listenerObjectID == this.listeners[i].object.listenerObjectID){
		    	this.listeners.splice(i, 1);
	    	}
	    }
	    cc.log("\t after removal loop -> this.listeners.length = " + this.listeners.length); 
	    for(var j = this.listeners.length; j < this.listeners.length; j++){
	    	cc.log("\t this.listeners[j].object.listenerObjectID = " + this.listeners[j].object.listenerObjectID);
	    }
    },
    
    send:function (event){
    	//cc.log("SCMediator send() messageID = " + event.messageID);
	    this.recieved.push(event);  
    },
    
    update:function (){
    	//cc.log("SCMediator update()");
    	for(var i = 0; i < this.recieved.length; i++){
    	
    		//cc.log("\t this.recieved[i].messageID = " + this.recieved[i].messageID);
    		//cc.log("SCMediator.update() listeners.length = " + this.listeners.length);
    		
	    	for(var j = 0; j < this.listeners.length; j++){
	    		//cc.log("SCMediator.update() messageID matching loop");
	    		
	    		//cc.log("\t this.listeners[j].messageID = " + this.listeners[j].event.messageID);
		    	if(this.recieved[i].messageID == this.listeners[j].event.messageID){
		    	
			    	this.listeners[j].callback.call(undefined, this.recieved[i].args);
			    	//cc.log("\t this.listeners[j].object.listenerObjectID = " + this.listeners[j].object.listenerObjectID);
			    	
		    	}
		    }
		}
		while(this.recieved.length > 0){
			this.recieved.pop();
		}
		
	}
    
    

});