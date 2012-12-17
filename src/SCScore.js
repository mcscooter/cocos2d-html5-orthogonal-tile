// score for each round
var SCScore= SCEntity.extend({

	ctor:function (filename) {
		this._super(filename);
    	cc.log("SCScore ctor()");
    	this.gameConfig = new SCGameConfig();
    	this.score = 0;
    	//this.setPosition(this.gameConfig.score.position);
    	this.scoreText = cc.LabelTTF.create("0", "Arial", 16);
        this.scoreText.setColor(new cc.Color3B(255,255,255));
        this.scoreText.visible = true;
        this.scoreText.setPosition(cc.p(0, 0));
        this.addChild(this.scoreText, 99);
       	
    	
    },

    
    update:function(dt){
    	this.timeLeft -= dt;
    	
    	this.scoreText.setString("$$$ " + (Math.ceil(this.score)));
    	
    	
    	

    }

});