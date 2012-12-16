//	Scott Cummings 2012
// 

// Tilemap that extends the functionality of the TMXTiledMap
var SCTileMap = cc.TMXTiledMap.extend({
   
   ctor:function () {	
   	this._super();
   	cc.log("SCTileMap.js ctor()");
   	// needed for JS-Bindings compatibility
    cc.associateWithNative( this, cc.TMXTiledMap );
     
   },
   
   getPointGID:function(point){
	 	var layer = this.layerNamed("foreground");
    	var tileSize = this.getTileSize();
    	var mapSize = this.getMapSize();
    	var tileX = Math.floor(point.x / tileSize.width);
    	var tileY = Math.floor(mapSize.height - point.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileX, tileY);
    	//cc.log("SCTileMap getTileGID tileX tileY = " + tileX + " " + tileY);
    	var tileGID = layer.tileGIDAt(tileCoord);
    	//cc.log("SCTileMap getTileGID () tileTouchedGID = " + tileGID);
    	return(tileGID);
  
   },
   
   getPointForegroundProperties:function(point){
	   	var layer = this.layerNamed("foreground");
    	var tileSize = this.getTileSize();
    	var mapSize = this.getMapSize();
    	var mapLocation = this.getPosition();
    	var tileX = Math.floor(point.x / tileSize.width);
    	var tileY = Math.floor(mapSize.height - point.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileX, tileY);
    	//cc.log("SCTileMap getPointProperties tileTouchedX tileTouchedY = " + tileX + " " + tileY);
    	var tileGID = layer.tileGIDAt(tileCoord);
    	//cc.log("SCTileMap getPointProperties () tileGID = " + tileGID);
    	var tilePointProperties = new Object();
    	tilePointProperties = this.propertiesForGID(tileGID);
    	
    	
    	if(tilePointProperties){
	    	//cc.log("SCTileMap getPointProperties() tilePointProperties.name = " + tilePointProperties.solid);
	    	//cc.log(JSON.stringify(tilePointProperties));
    	}
    	
    	return(tilePointProperties);

	   
   },
   
    getPointSignProperties:function(point){
	   	var layer = this.layerNamed("signs");
    	var tileSize = this.getTileSize();
    	var mapSize = this.getMapSize();
    	var mapLocation = this.getPosition();
    	var tileX = Math.floor(point.x / tileSize.width);
    	var tileY = Math.floor(mapSize.height - point.y / tileSize.height); // Because Tiled maps register in the top left corner rather than bottom left
    	var tileCoord = cc.p(tileX, tileY);
    	//cc.log("SCTileMap getPointProperties tileTouchedX tileTouchedY = " + tileX + " " + tileY);
    	var tileGID = layer.tileGIDAt(tileCoord);
    	//cc.log("SCTileMap getPointProperties () tileGID = " + tileGID);
    	var tilePointProperties = this.propertiesForGID(tileGID);
    	
    	
    	if(tilePointProperties){
	    	//cc.log("SCTileMap getPointProperties() tilePointProperties.name = " + tilePointProperties.name);
    	}
    	
    	return(tilePointProperties);

	   
   },
   
   testCallback:function(args){
	   cc.log("SCTileMap testCallback()");
   }
    
});


