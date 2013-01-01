
// The basic message object that is passed between the message controller, components and entities
var SCEvent = cc.Class.extend({

	ctor:function (messageID, messageObj, args) {
    	this.messageID = messageID;
    	this.messageObj = messageObj;
    	this.args = args;
    }

});