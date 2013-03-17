var MT = MT || {};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

//register globals
CANVAS = document.getElementById('board');
CTX = CANVAS.getContext('2d');

$(function($){

  'use strict';

  new MT.AppView(); 

});
