var Helper = {
  //returns rounded integer
  rand: function(min, max){
    var num = Math.random() * (max - min) + min;
    return Math.round(num);
  },

	check_collision: function(a, b) {
		var hit_x, hit_y, direct_hit;
		
		hit_x = ( a.x < (b.x + b.width) &&  (a.x + a.width) > b.x ) ? true : false;
		hit_y = ( a.y < (b.y + b.height) && (a.y + a.height) > b.y) ? true : false;

		direct_hit = (hit_x && hit_y) ? true : false;

		return direct_hit;
	}
}
