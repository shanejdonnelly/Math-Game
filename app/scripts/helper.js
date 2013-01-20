var Helper = {
  //returns rounded integer
  rand: function(min, max){
    var num = Math.random() * (max - min) + min;
    return Math.round(num);
  },

	check_collision: function(q, p) {
		var hit_x, hit_y, direct_hit;
		
		hit_x = ( q.x <= (p.player_x + p.player_width) &&  (q.x + q.width) >= p.player_x ) ? true : false;
		hit_y = ( q.y <= (p.player_y + p.player_height) && (q.y + q.height) >= p.player_y) ? true : false;

		direct_hit = (hit_x && hit_y) ? true : false;

		return direct_hit;
	},

//looking for collision with green(30, 100, 30), blue(20, 90, 220)
//black and brown(155, 84, 32)
	check_pixel_collision: function(context, x, y, width, height){ 
		var 
			imgData = context.getImageData(x-1, y-1, width+2, height+2),
			pixels = imgData.data, 
			pixels_length = pixels.length;

  // Check these pixels.
  for (var i = 0; i < pixels.length; i += 4) {
    var red = pixels[i];
    var green = pixels[i+1];
    var blue = pixels[i+2];
    var alpha = pixels[i+3];

    if ((red === 30 && green === 100 && blue === 30) || (red === 20 && green === 90 && blue === 220) || (red === 0 && green === 0 && blue === 0 )) {
      return 'wall';
    }
		else if(red === 155 && green === 84 && blue === 32){
			return 'house';
		}
  }
  // There was no collision.
  return false;
	},

	drawRectangle : function(context, color, x, y, width, height) {
  	context.fillStyle = color;
  	context.fillRect(x, y, width, height);
	},

	drawCircle : function(context, center_x, center_y, radius, fill_color, line_width, stroke_color ){
  	context.beginPath();
  	context.arc(center_x, center_y, radius, 0, 2 * Math.PI);
  	context.fillStyle = fill_color;
  	context.fill();
  	context.lineWidth = line_width;
  	context.strokeStyle = stroke_color;
  	context.stroke();
	},

	isIn: function(el, value){
		return (el.indexOf(value) !== -1) ? true : false;
	},
	
	notIn: function(el, value){
		return (el.indexOf(value) === -1) ? true : false;
	},

	

}
