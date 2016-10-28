
// Singletons -------------------------------------

var graph = new Graph(dots, lines);
var man = new Man(); // one who runs. Has two images.

var track = null;  // current track
var current_point;

// Graphical objects ---------------------------------

var ctx, canvas;
var imgs, imgs_count = 4;

var MAP_HEIGHT; // define from the first floor image
var MAP_WIDTH;  // define from the first floor image

var shift_x = 0, shift_y = 0, scale = 1; // transformation params

