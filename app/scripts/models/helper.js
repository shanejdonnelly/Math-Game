var Helper = {
  //returns rounded integer
  rand: function(min, max){
    var num = Math.random() * (max - min) + min;
    return Math.round(num);
  },

	check_collision: function(q, p) {
		var hit_x, hit_y, direct_hit;
		
		hit_x = ( q.x < (p.player_x + p.player_width) &&  (q.x + q.width) > p.player_x ) ? true : false;
		hit_y = ( q.y < (p.player_y + p.player_height) && (q.y + q.height) > p.player_y) ? true : false;

		direct_hit = (hit_x && hit_y) ? true : false;

		return direct_hit;
	}

	check_pixel_collision: function(){ 

	}

}
