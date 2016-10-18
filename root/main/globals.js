// Point of the track.
// x, y, z - coords
// E - dictionary of belonging edges (key:distance pairs)

function Point(key, x, y, z) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.z = z;
    this.E = {}; 
}

// -----------------------------------------------------------

var points;  // dictionary of Points

var MAP_HEIGHT;
var MAP_WIDTH;

var MAN_HEIGHT = 10;
var MAN_WIDTH = 4;

var ctx, canvas;
var imgs = {}, imgs_count = 2;

var current_point;

var track;  // current track

var shift_x = 0, shift_y = 0, scale = 1; // transformation params

var man = { x: 0, y: 0, i: 0, imgs: {} }; // one who runs. Has two images.

var max_floor = 4;
// -----------------------------------------------------------


