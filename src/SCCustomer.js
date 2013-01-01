// customer HUD
var SCCustomer= SCEntity.extend({

	ctor:function (filename) {
		this._super(filename);
    	cc.log("SCCustomer ctor()");
    	this.gameConfig = new SCGameConfig();
    	this.loan = 0;
    	//this.setPosition(this.gameConfig.score.position);
    	this.loanText = cc.LabelTTF.create("0", "Arial", 16);
        this.loanText.setColor(new cc.Color3B(255,255,255));
        this.loanText.visible = true;
        this.loanText.setPosition(cc.p(0, 0));
        this.addChild(this.loanText, 99);
    },
    
    setLoan:function(loan){
	  this.loan = loan;  
    },

    update:function(dt){
	    if(this.loan > 0){
		    this.loanText.setString("LOAN $" + (Math.ceil(this.loan)));
    	}else{
    	    	this.loanText.setString("No Customer");
    	    }
    }

});