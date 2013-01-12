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
//only looking for collision with black
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

    // Look for black walls (which indicates a collision).
    if (red == 0 && green == 0 && blue == 0) {
      return true;
    }
  }
  // There was no collision.
  return false;
	}

}
