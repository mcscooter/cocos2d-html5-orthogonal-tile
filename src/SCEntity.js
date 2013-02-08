//	Scott Cummings 2012
// 

// This is called when making a new SCEntity
var SCEntity = cc.Sprite.extend({
   
   ctor:function (filename) {	
   		this._super(filename);
   		this.physicsComponent = new SCPhysicsComponent();
   		this.state = new Object();
   		this.globalMediator = null;
   		this.drawHitbox = false;
   		this.centerOffset = null;
   		this.ID = null;
   		// needed for JS-Bindings compatibility?
   		cc.associateWithNative( this, cc.Sprite );
   },
   
   draw:function (){
   		this._super();
   		if(this.physicsComponent.hitbox && this.drawHitbox){
	   		cc.renderContext.fillStyle = "rgba(255,255,255,255)";
	   		cc.renderContext.strokeStyle = "rgba(255,255,255,255)";
	   		cc.renderContext.lineWidth = "1";
	   		// this is an array of five vertices to draw for a rectangular hitbox. Will need to make a switch statement if we have other shapes like circles or triangles
	   		// 
	   		//BL,BR,TR,TL,BL where BL = bottom left, etc
	   		//
	   		// Unfortunately you cannot access the parameters of a cc.rect directly, so you have to use the minimum and maximum x and y values
	   		var vertices = [cc.p(cc.Rect.CCRectGetMinX(this.physicsComponent.hitbox), cc.Rect.CCRectGetMinY(this.physicsComponent.hitbox)), cc.p(cc.Rect.CCRectGetMaxX(this.physicsComponent.hitbox), cc.Rect.CCRectGetMinY(this.physicsComponent.hitbox)), cc.p(cc.Rect.CCRectGetMaxX(this.physicsComponent.hitbox), cc.Rect.CCRectGetMaxY(this.physicsComponent.hitbox)), cc.p(cc.Rect.CCRectGetMinX(this.physicsComponent.hitbox), cc.Rect.CCRectGetMaxY(this.physicsComponent.hitbox)),cc.p(cc.Rect.CCRectGetMinX(this.physicsComponent.hitbox), cc.Rect.CCRectGetMinY(this.physicsComponent.hitbox)) ];
	   		cc.drawingUtil.drawPoly(vertices, 5, false);
   		} 
   },
   
   setGlobalMediator:function(mediator){
	   if(mediator){
		   this.globalMediator = mediator;
	   }else{
		   cc.log("SCEntity setGlobalMediator(), mediator is null");
	   }
	   
   },
   
   setID:function(ID){
	 if(ID){
		 this.ID = ID;
	 }else{
		 cc.log("SCEntity setID, ID is null.");
	 }  
	   
   },
   
   getID:function(){
	 return this.ID;  
   },
   
   updateLogic:function(){
	   
   },
   
   updatePhysics:function(dt){
	   
   },
   
   updateRender:function(){
	   
   },
   
   update:function () {
	    
   }
    
});


