
// Singletons -------------------------------------

var graph = new Graph(dots, lines);
var man = new Man(); // one who runs. Has two images.
var anime = new Anime();

var track = null;  // current track 
var current_point;

// Graphical objects ---------------------------------

var ctx, canvas;
var imgs, imgs_count = 4;

var MAP_HEIGHT; // define from the first floor image
var MAP_WIDTH;  // define from the first floor image

var scale = 1; // transformation params

