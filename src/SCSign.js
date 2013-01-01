// customer HUD
var SCSign = SCEntity.extend({

	ctor:function (filename) {
		this._super(filename);
    	cc.log("SCSign ctor()");
    	this.gameConfig = new SCGameConfig();
    	this.price = 0;
    	this.priceText = cc.LabelTTF.create("0", "Arial", 16);
        this.priceText.setColor(new cc.Color3B(255,255,255));
        this.priceText.visible = true;
        this.priceText.setPosition(cc.p(0, 0));
        this.addChild(this.priceText, 99);
    },
    
    setPrice:function(price){
	    
	  this.price = price;  
    },
    
    getPrice:function(){
	    return this.price;
    },

    update:function(dt){
    	    	if(this.price > 0){
	    	    	this.priceText.setString("Price $" + (Math.ceil(this.price)));
    	    	}else{
    	    		this.priceText.setString("No House Selected");
    	    		}
    }

});