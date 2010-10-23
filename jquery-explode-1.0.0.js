/**
	explode moves divs matching a particular selector out from the centre of the screen 
    when triggered, using HTML 5 CSS transitions.
	
	Typical usage:

        $(document).ready(function(){
            $(".move").click( function() { explode() } );
        });

	Full options:
	
		$('.move').click({  // Selector determines what can be clicked on to trigger the move
			selector : ".move", // Selector determining what should be moved
            distanceRatio : 10, // The multiplier applied to the distance from the center of the document
                                // (blocks further from the center move more quickly)
			transition : "10s" // Time taken for the entire transition (depending on the distanceRatio, not all
                                  of this time will necessarily be on-screen time)
		});
	
	This plugin requires JQuery 1.4+ (it was developed under JQuery 1.4.2).

	Copyright (C) 2010, Inigo Surguy, 67 Bricks Ltd.
	Released under the terms of the Lesser GNU Public License.
	(see LICENSE.txt or http://www.gnu.org/licenses/lgpl-3.0.txt)
*/

(function($){ 
  $.explode = function(options) { 
    var defaults = {  
        transition : "5s",
        distanceRatio : 3,
        selector : ".move"
    };
    var options = $.extend(defaults, options);

    var moveIt = function() {
        var screenCentre = findScreenCentre();
        $(options.selector).each( function(i,b) { 
            var centre = findCentre($(b));
            var moveLeft = (centre.x - screenCentre.x) * options.distanceRatio;
            var moveUp = (centre.y - screenCentre.y) * options.distanceRatio;

            if (Math.abs(moveLeft)+$(b).outerWidth() < centre.x) moveLeft = sign(moveLeft) * (centre.x + $(b).outerWidth());
            if (Math.abs(moveUp)+$(b).outerHeight() < centre.y) moveUp = sign(moveUp) * (centre.y + $(b).outerHeight());

            var translation =  "translate("+moveLeft+"px, "+moveUp+"px)";
            
            $(b).css({
                "transition" : options.transition,
                "-webkit-transition" : options.transition,
                "-moz-transition" : options.transition,
                "transform" : translation,
                "-webkit-transform" :  translation,
                "-moz-transform" :  translation
            });
        });
    };

    var sign = function(x) { return (x==0) ? 0 : (x > 0) ? 1 : -1; };
    var findScreenCentre = function() { return { x : $(window).width()/2, y : $(window).height()/2 }; };
    var findCentre = function(block) {
        var left = block.offset().left;
        var top = block.offset().top;
        var width = block.outerWidth();
        var height = block.outerHeight();
        return { x : left+(width/2), y : top+(height/2) };
    };

    moveIt();
  };  
})(jQuery); 
