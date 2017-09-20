// ## UTILS #############################
(function( astrology ) {
	
	astrology.utils = {};
	
	/**
	 * Calculate position of the point on the circle.
	 * 
	 * @param {int} cx - center x 
	 * @param {int} cy - center y
	 * @param {int} radius
	 * @param {double} angle - degree			
	 * 
	 * @return {Object} - {x:10, y:20}
	 */	
	astrology.utils.getPointPosition = function( cx, cy, radius, angle ){		
		var angleInRadius = (astrology.SHIFT_IN_DEGREES - angle) * Math.PI / 180;
		var xPos = cx + radius * Math.cos( angleInRadius );
		var yPos = cy + radius * Math.sin( angleInRadius );					
		return {x:xPos, y:yPos};
	};
	
	astrology.utils.degreeToRadians = function( degree ){
		return degrees * Math.PI / 180;
	};

	astrology.utils.radiansToDegree = function( radians ){
		return radians * 180 / Math.PI;
	};
	
	/**
	 * Checks a source data
	 * @private
	 * 
	 * @param {Object} data
	 * @return {Object} status
	 */
	astrology.utils.validate = function( data ){
		var status = {hasError:false, messages:[]};
		
		if( data == null ){			
			status.messages.push( "Data is not set." );
			status.hasError = true;
			return status;
		}
		
		if(data.planets == null){					
			status.messages.push( "There is not property 'planets'." );
			status.hasError = true;
		}
		
		for (var property in data.planets) {
    		if (data.planets.hasOwnProperty(property)) {        		
        		if(!Array.isArray( data.planets[property] )){
        			status.messages.push( "The planets property '"+ property +"' has to be Array." );
					status.hasError = true;	
        		}
    		}
		}
					
		if(data.cusps != null && !Array.isArray(data.cusps)){
			status.messages.push( "Property 'cusps' has to be Array." );
			status.hasError = true;
		}
		
		if(data.cusps != null && data.cusps.length != 12){			
			status.messages.push( "Count of 'cusps' values has to be 12." );
			status.hasError = true;
		}
									
		return status;		
	};
	
	/**
	 * Get empty DOMElement with ID
	 * 
	 * @param{String} elementID
	 * @param{DOMElement} parent
	 * @return {DOMElement}
	 */
	astrology.utils.getEmptyWrapper = function( parent, elementID ){
		
		var wrapper = document.getElementById( elementID );		
		if(wrapper){
			astrology.utils.removeChilds( wrapper );
		}else{					
			wrapper = document.createElementNS( document.getElementById(astrology.ID_CHART).namespaceURI, "g");
			wrapper.setAttribute('id', elementID);
			parent.appendChild( wrapper );			
		} 
		
		return wrapper;
	};
	
	/**
	* Remove childs
	* 
	* @param{DOMElement} parent
	*/
	astrology.utils.removeChilds = function(parent){
		if( parent == null ){
			return;
		}
		
		var last;
    	while (last = parent.lastChild){
    		parent.removeChild(last);
    	}
	};
	
	/**
	 * Check circle collision between two objects 
	 * 
 	 * @param {Object} circle1, {x:123, y:123, r:50}
 	 * @param {Object} circle2, {x:456, y:456, r:60}
 	 * @return {boolean} 	 
	 */
	astrology.utils.isCollision = function(circle1, circle2){
		
		//Calculate the vector between the circles’ center points
  		var vx = circle1.x - circle2.x;
  		var vy = circle1.y - circle2.y;
  		
  		var magnitude = Math.sqrt(vx * vx + vy * vy);
  		
  		var totalRadii = circle1.r + circle2.r;
		
		return magnitude <= totalRadii; 
	};
	
	/**
	 * Places a new point in the located list 
	 * 
 	 * @param {Array<Object>} locatedPoints, [{name:"Mars", x:123, y:123, r:50, ephemeris:45.96}, {name:"Sun", x:1234, y:1234, r:50, ephemeris:100.96}]
 	 * @param {Object} point, {name:"Venus", x:78, y:56, r:50, ephemeris:15.96} 
 	 * @param {Object} universe - current universe
 	 * @return {Array<Object>} locatedPoints 	 
	 */
	astrology.utils.assemble = function( locatedPoints, point, universe){
		
		locatedPoints.forEach(function( locatedPoint ){
			if(astrology.utils.isCollision(locatedPoint, point)){
				console.log( "Resolve collision: " + locatedPoint.name + " X " + point.name);
				
				// TODO correction
				// locatedPoint - new position
				// point - new position
				// remove locatedPoint from locatedPoints
				// call astrology.utils.assemble(locatedPoints, locatedPoint, universe); 	
					
				// return and new test for collision (probably with while(true))
			}					
		}, this);
					
		locatedPoints.push(point);						
		return locatedPoints;
	};
	
						        	 
}( window.astrology = window.astrology || {}));