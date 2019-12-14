
addAllTouchEvents("#green");
addAllTouchEvents("#indigo");
addAllTouchEvents("#pink");
addAllTouchEvents("#yellow");
var mouseDown = false;

function addAllTouchEvents(element){

    $(element).on("mousedown",  dealWithTouch);
    $(element).on("mousemove",  dealWithTouch);
    $(element).on("mouseup",  dealWithTouch);
    $(element).on("touchstart", dealWithTouch);
    $(element).on("touchmove", dealWithTouch);
    $(element).on("touchend", dealWithTouch);
    $(element).on("touchcancel", dealWithTouch); 
}

function dealWithTouch(event) {
    event.preventDefault();
    
    if(event.type== "mousedown" || event.type=="touchstart"){
        mouseDown = true;
        console.log(event);
        
       $(event.target.parentElement).append( event.target );
        
    } if(event.type== "mouseup" || event.type=="touchend"){
        mouseDown = false;
        console.log(event);
    } else if( (event.type== "mousemove" && mouseDown) ) {
        
        var parentOffset = $(this).parent().offset(); 
        var newY = event.clientY - parentOffset.top
        var newX = event.clientX - parentOffset.left;
        
        $("#"+event.target.id).attr("cx", newX);
        $("#"+event.target.id).attr("cy", newY);
        
        checkIfPointIsInCorrectSquare(newX, newY, event.target.id);
        
    } else if ( event.type=="touchmove" && mouseDown ){

 	  event.preventDefault();
      var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
      var elm = $(this).offset();
      var x = touch.pageX - elm.left;
      var y = touch.pageY - elm.top;

      $("#"+event.target.id).attr("cx", touch.pageX);
      $("#"+event.target.id).attr("cy", touch.pageY);

      checkIfPointIsInCorrectSquare(touch.pageX, touch.pageY, event.target.id);

    }
    
}

function checkIfPointIsInCorrectSquare(userX, userY, circleID){
    
    var points = $("#"+circleID+"Box").attr("points");
    
    var coords = points.split(" ");
    
    var firstCoords = coords[0].split(",");

    var minX = parseInt(firstCoords[0]);
    var maxX = parseInt(firstCoords[0]);
    
    var minY = parseInt(firstCoords[1]);
    var maxY = parseInt(firstCoords[1]);

    
    //find the smallest and largest coords
    for (var i = 0; i < coords.length; i++){
        
        var coord = coords[i].split(",");
        var x = parseInt(coord[0]);
        var y = parseInt(coord[1]);
        
        if(x < minX) minX = x;
        if(x > maxX) maxX = x;
        
        if(y < minY) minY = y;
        if(y > maxY) maxY = y;

    }
    /*
    console.log("min x = " + minX);
    console.log("max x = " + maxX);
    console.log("x = " + userX);
    
    console.log("min y = " + minY);
    console.log("max y = " + maxY);
    console.log("y = " + userY);*/
    
    if (userX > minX && userX < maxX
           && userY > minY && userY < maxY){
         console.log("in the middle!");
        $("#"+circleID).attr("fill","#263238");
 
    }
    
}
