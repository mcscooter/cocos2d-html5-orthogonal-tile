// The message mediator
var SCMediator = cc.Class.extend({

	ctor:function () {
    	this.listeners = new Array();
    	this.recieved = new Array();
    	this.objectsToUnregister = new Array();
    	this.objectListenersToUnregister = new Array();
    	// index for creating unique object ID's
    	this.nextObjectID = 0;
    },
    
    register:function (listener){
    	if(listener.object.listenerObjectID){
	    	
    	}else{
	    	listener.object.listenerObjectID = this.nextObjectID;
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
	    for( var k = 0; k < this.objectsToUnregister.length; k++ ){
	    	// loop backwards in listeners array so it doesn't change the length as we go
	    	for(var i = this.listeners.length -1; i >= 0; i--){
	    		if(this.objectsToUnregister[k].listenerObjectID == this.listeners[i].object.listenerObjectID){
		    		this.listeners.splice(i, 1);
		    		}
		    }
		}
    },
    
    // loop through all object listeners to unregister and removes only those listeners for those objects
    unregisterListenersForObjects:function(){
	    for( var k = 0; k < this.objectListenersToUnregister.length; k++ ){
	    	// loop backwards in listeners array so it doesn't change the length as we go
	    	for(var i = this.listeners.length -1; i >= 0; i--){
	    		if(this.objectListenersToUnregister[k].listenerObjectID == this.listeners[i].object.listenerObjectID && this.objectListenersToUnregister[k].listenerID == this.listeners[i].event.messageID){
		    		this.listeners.splice(i, 1);
		    		}
		    }
		}
    },
    
    send:function (event){
	    this.recieved.push(event);  
    },
    
    update:function (){
    	//	loop through all recieved events and dispatch to listeners
    	for(var i = 0; i < this.recieved.length; i++){
	    	for(var j = 0; j < this.listeners.length; j++){
		    	if(this.recieved[i].messageID == this.listeners[j].event.messageID){
			    	this.listeners[j].callback.call(undefined, this.recieved[i].args);
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