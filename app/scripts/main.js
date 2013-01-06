$(function(){

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
 


		var game = new Game(document.getElementById('board'));

if (Modernizr.localstorage) {
  // window.localStorage is available!
//user
//level
//math type


var name = localStorage.getItem('name');
if(name == null){console.log('create new user')}
else{ console.log(name); }
} else {
  // no native support for HTML5 storage :(
  // maybe try dojox.storage or a third-party solution
}

});
