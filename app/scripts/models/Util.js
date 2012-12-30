var Util = {
    //returns rounded integer
    rand: function(min, max){
      var num = Math.random() * (max - min) + min;
      return Math.round(num);
    }
}
