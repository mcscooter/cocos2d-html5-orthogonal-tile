// Timer for each round
var SCTimer = SCEntity.extend({

	ctor:function (filename) {
		this._super(filename);
    	cc.log("SCTimer ctor()");
    	this.gameConfig = new SCGameConfig();
    	this.timeLeft = this.gameConfig.timer.timeLimit;
    	//this.setPosition(this.gameConfig.timer.position);
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
	    	
	    	cc.log("SCTimer update() TIME IS UP");
	    	//var args = new Object();
	    	//var event = new SCEvent(this.gameConfig.globals.MSG_TIME_OVER, this, args);
	    	//this.globalMediator.send(event);
	    	var director = cc.Director.getInstance();
	    	director.replaceScene(new SCEndScene);
    	}
    	

    }

});