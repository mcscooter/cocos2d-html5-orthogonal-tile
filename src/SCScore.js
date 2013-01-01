// score for each round
var SCScore= SCEntity.extend({

	ctor:function (filename) {
		this._super(filename);
    	cc.log("SCScore ctor()");
    	this.gameConfig = new SCGameConfig();
    	this.score = 000000;
    	this.scoreText = cc.LabelTTF.create("000000", "Arial", 16);
    	this.scoreText.setHorizontalAlignment(this.gameConfig.score.alignment);
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