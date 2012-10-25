
// The message mediator
var SCMediator = cc.Class.extend({

	ctor:function () {
    	//cc.log("SCMediator ctor()");
    	this.listeners = new Array();
    	this.recieved = new Array();
    	this.objectsToUnregister = new Array();
    	this.objectListenersToUnregister = new Array();
    	// index for creating unique object ID's
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
    
    // adds an object the queue to be unregistered
    unregisterObject:function (object){
	    this.objectsToUnregister.push(object);
    },
    
    // adds an object and listener ID to the queue to be unregistered
    unregisterListenerForObject:function(listenerID, object){
	    if(object.listenerObjectID){
	    	var unregisterListenerObject = new Object();
	    	unregisterListenerObject.listenerID = listenerID;
	    	unregisterListenerObject.listenerObjectID = object.listenerObjectID
	    	this.objectListenersToUnregister.push(unregisterListenerObject);
		    
	    }else{
	    	cc.log("SCMediator unregisterListenerForObject() ERROR, no object.listenerObjectID");
	    }
	    
    },
    
    // loops through all objects to unregister and removes all listeners for those objects
    unregisterObjects:function(){
	   	//cc.log("SCMediator unregister()");
	    //cc.log("\t before removal loop -> this.listeners.length = " + this.listeners.length);
	
	    for( var k = 0; k < this.objectsToUnregister.length; k++ ){
	    	// loop backwards in listeners array so it doesn't change the length as we go
	    	for(var i = this.listeners.length -1; i >= 0; i--){
	    		if(this.objectsToUnregister[k].listenerObjectID == this.listeners[i].object.listenerObjectID){
		    		this.listeners.splice(i, 1);
		    		}
		    }
		}
		//cc.log("\t after removal loop -> this.listeners.length = " + this.listeners.length); 
		/*for(var j = this.listeners.length; j < this.listeners.length; j++){
			cc.log("\t this.listeners[j].object.listenerObjectID = " + this.listeners[j].object.listenerObjectID);
		}*/
		
    },
    
    // loop through all object listeners to unregister and removes only those listeners for those objects
    unregisterListenersForObjects:function(){
	   	//cc.log("SCMediator unregisterListenersForObjects()");
	    //cc.log("\t before removal loop -> this.listeners.length = " + this.listeners.length);
	    for( var k = 0; k < this.objectListenersToUnregister.length; k++ ){
	    	// loop backwards in listeners array so it doesn't change the length as we go
	    	for(var i = this.listeners.length -1; i >= 0; i--){
	    		if(this.objectListenersToUnregister[k].listenerObjectID == this.listeners[i].object.listenerObjectID && this.objectListenersToUnregister[k].listenerID == this.listeners[i].event.messageID){
		    		this.listeners.splice(i, 1);
		    		}
		    }
		}
	    //cc.log("\t after removal loop -> this.listeners.length = " + this.listeners.length); 
    },
    
    send:function (event){
    	//cc.log("SCMediator send() messageID = " + event.messageID);
	    this.recieved.push(event);  
    },
    
    update:function (){
    	//cc.log("SCMediator update()");
    	
    	//	loop through all recieved events and dispatch to listeners
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
		// 	Remove all recieved events
		while(this.recieved.length > 0){
			this.recieved.pop();
		}
		
		
		// unregister all listeners and/or objects that are in the removal queue
		// we do this at the end of the mediator update loop so that all messages that are supposed to get to objects do before they are unregistered
		this.unregisterObjects();
		this.unregisterListenersForObjects();
		
	}
    
    

});