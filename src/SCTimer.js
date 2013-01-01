// Timer for each round
var SCTimer = SCEntity.extend({

	ctor:function (filename) {
		this._super(filename);
    	this.gameConfig = new SCGameConfig();
    	this.timeLeft = this.gameConfig.timer.timeLimit;
    	this.timerText = cc.LabelTTF.create("0", "Arial", 16);
        this.timerText.setColor(new cc.Color3B(255,255,255));
        this.timerText.visible = true;
        this.timerText.setPosition(cc.p(0, 0));
        this.addChild(this.timerText, 99, this.gameConfig.globals.TAG_TIMER_TEXT);
    },

    
    update:function(dt){
    	this.timeLeft -= dt;
    	
    	this.timerText.setString("Time Left: " + (Math.ceil(this.timeLeft)));
    	
    	if(this.timeLeft <= 0){
	    	// need to get this working, need to make the end of a round and the change scene an event
	    	//var args = new Object();
	    	//var event = new SCEvent(this.gameConfig.globals.MSG_TIME_OVER, this, args);
	    	//this.globalMediator.send(event);
	    	var director = cc.Director.getInstance();
	    	director.replaceScene(new SCEndScene);
    	}
    	

    }

});