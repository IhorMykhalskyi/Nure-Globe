(function () {
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [data.pageX, data.pageY],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[0] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function (event) {
                            $this.unbind(touchMoveEvent, moveHandler);
                            if (start && stop) {
                                if (stop.time - start.time < 1000 &&
                                        Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                        Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                    start.origin
                                            .trigger("swipeupdown")
                                            .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                }
                            }
                            start = stop = undefined;
                        });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();
var dots = {

    //1
    ////////////////////////////////////////////////////////////////
    //гл
    "115": [440, 294, 1],
    "116": [407, 294, 1],
    "118": [388, 294, 1],
    "119": [371, 294, 1],
    "133": [311.4, 213, 1],
    "139": [128, 245, 1],
    "X101,142": [128, 136, 1],
    "143": [89, 136, 1],
    "145": [128, 151, 1],
    "146": [128, 170, 1],
    "151": [107, 294, 1],
    "167": [331, 294, 1],
    "113и": [856, 261, 1],
    "X107,114,113": [462, 294, 1],
    "L102R,148": [128, 205, 1],
    "141а": [128, 158, 1],
    "141,147": [128, 183, 1],
    "140а": [128, 217, 1],
    "140,149": [128, 231, 1],
    "150,138": [128, 263, 1],
    "136,166": [193, 294, 1],
    "116а": [423, 294, 1],
    "ВХОД": [249, 323, 1],
    "L104U": [249, 260, 1],
    "130а,130,129": [311.4, 116, 1],
    "128б": [311.4, 126, 1],
    "128а,131": [311.4, 141, 1],
    "L105L,127,126": [311.4, 155, 1],
    "125а": [311.4, 170, 1],
    "131а,125б": [311.4, 182, 1],
    "132а": [311.4, 193, 1],
    "132б,124": [311.4, 204, 1],
    "134,123": [311.4, 224, 1],
    "135,122": [311.4, 248, 1],
    "135в": [311.4, 269, 1],
    "232а": [330, 294, 2],
    "L103L": [128, 276, 1],
    "X102": [128, 294, 1],
    "X103,165": [166, 294, 1],
    "X104": [249, 294, 1],
    "X105": [311, 294, 1],
    "X106,120,101,102": [356, 294, 1],
    "L101U,144": [29, 136, 1],
    "X108": [462, 316, 1],
    "X114": [882, 316, 1],
    "X113": [882, 261, 1],
    "X110": [788, 261, 1],
    "X111": [811, 261, 1],

    //и
    "X116,114и": [933, 261, 1],
    "114аи": [911, 261, 1],
    "115и": [966, 261, 1],
    "116и": [999, 261, 1],
    "121и": [1013, 261, 1],
    "117и": [1028, 261, 1],
    "120и": [1049, 261, 1],
    "119и": [1064, 261, 1],
    "L108R,111би": [933, 235, 1],
    "X115": [933, 155, 1],
    "101и": [916, 155, 1],
    "102и": [901, 155, 1],
    "107и": [882, 155, 1],
    "103и": [867, 155, 1],
    "X112,105и": [855, 155, 1],
    "108и": [840, 155, 1],
    "109и,104и": [812, 155, 1],
    "X109": [788, 155, 1],
    "L107R": [855, 142, 1],
    "111и": [788, 184, 1],
    "L106L": [811, 281, 1],

    //2
    ////////////////////////////////////////////////////////////////
    //гл
    "1": [128.5, 264, 2],
    "3": [128.5, 247, 2],
    "10": [128.5, 191, 2],
    "17": [121, 144.5, 2],
    "18": [110, 144.5, 2],
    "19": [97, 144.5, 2],
    "20": [83, 144.5, 2],
    "21": [70, 144.5, 2],
    "22": [56, 144.5, 2],
    "23": [43, 144.5, 2],
    "35": [26, 31, 2],
    "36": [12, 20, 2],
    "212": [357.5, 340, 2],
    "222": [527, 294, 2],
    "223": [505, 294, 2],
    "224": [483, 294, 2],
    "225": [462, 294, 2],
    "226": [440, 294, 2],
    "227": [418, 294, 2],
    "229": [396, 294, 2],
    "230": [374, 294, 2],
    "233": [311.5, 253, 2],
    "234": [311.5, 240, 2],
    "237": [311.5, 170, 2],
    "250": [311.5, 262, 2],
    "251": [184, 294, 2],
    "258": [46, 365, 2],
    "259": [46, 386, 2],
    "261": [68, 427, 2],
    "262": [82, 427, 2],
    "263": [96, 427, 2],
    "264": [110, 427, 2],
    "268": [166, 378, 2],
    "273": [166, 402, 2],
    "288": [200, 294, 2],
    "L207L,238": [311.5, 156, 2],
    "X205,252": [166, 294, 2],
    "L204L,255,256,257": [46, 344.5, 2],
    "X206,260": [46, 427, 2],
    "X202,24": [26, 144.5, 2],
    "253,254а,254,253а": [80, 294, 2],
    "242,243,241": [311.5, 117, 2],
    "244,240": [311.5, 129, 2],
    "245,239": [311.5, 141, 2],
    "246,236а": [311.5, 184, 2],
    "246а,236": [311.5, 198, 2],
    "247,235": [311.5, 213, 2],
    "249,235а": [311.5, 227, 2],
    "215а,217": [357.5, 313, 2],
    "214,215,213": [357.5, 328, 2],
    "210,211": [357.5, 355, 2],
    "208,209": [357.5, 368, 2],
    "206,207": [357.5, 383, 2],
    "X203,15,13": [128.5, 144.5, 2],
    "12,14,16": [128.5, 168, 2],
    "9,11,11а": [128.5, 176, 2],
    "L202R,6,8": [128.5, 206, 2],
    "5,7,7а": [128.5, 223, 2],
    "2,4,4а": [128.5, 255, 2],
    "L206U": [249, 260, 2],
    "280,287б": [166, 308, 2],
    "280а,287а": [166, 317, 2],
    "282,287": [166, 327, 2],
    "278,285": [166, 336, 2],
    "276,274,283а": [166, 348, 2],
    "272,283": [166, 360, 2],
    "270,277": [166, 370, 2],
    "L205L,277а": [166, 388, 2],
    "X207,267,269,274": [166, 427, 2],
    "268а": [166, 409, 2],
    "266,265": [142, 427, 2],
    "264а": [124, 427, 2],
    "261а": [53, 427, 2],
    "232а": [330, 294, 2],
    "252а": [152, 294, 2],
    "25,26": [26, 116, 2],
    "L201R,27": [26, 102, 2],
    "42,28": [26, 88, 2],
    "29,41": [26, 78, 2],
    "30,40": [26, 71, 2],
    "31,39": [26, 65, 2],
    "32,38": [26, 58, 2],
    "33,34": [26, 47, 2],
    "X201,37": [26, 20, 2],
    "L203L": [128.5, 278, 2],
    "X204": [128.5, 294, 2],
    "X208": [249, 294, 2],
    "X209": [311.5, 294, 2],
    "X210,232": [357.5, 294, 2],
    "221а": [548, 294, 2],
    "X211,L209U,220,221": [576, 294, 2],
    "L208L": [357, 398, 2],

    //з
    "L210D": [576, 350, 2],
    "L211D": [852, 350, 2],

    //и



    //3
    ////////////////////////////////////////////////////////////////
    //гл
    "L301R": [26, 103, 3],
    "L302R": [129, 206, 3],
    "X302": [46, 427, 3],
    "X303": [129, 145, 3],
    "L303L": [129, 279, 3],
    "L304L": [46, 346, 3],
    "X305": [166, 294, 3],
    "X304": [129, 294, 3],
    "L305L": [166, 391, 3],
    "L306U": [249, 265, 3],
    "X306": [166, 427, 3],
    "X307": [249, 294, 3],
    "L307L": [312, 155, 3],
    "X308": [312, 294, 3],
    "L308L": [358, 397, 3],
    "L309U": [575, 294, 3],
    "X301": [26, 21, 3],
    "X309": [358, 294, 3],

    //з
    "L309U": [576, 385, 3],
    "19з": [581, 385, 3],
    "20з,21з": [616, 385, 3],
    "22з": [631, 385, 3],
    "23з,24з": [647, 385, 3],
    "25з": [691, 385, 3],
    "26з": [662, 385, 3],
    "26аз": [724, 385, 3],
    "28з": [752, 385, 3],
    "27з,30з": [781, 385, 3],
    "29з": [804, 385, 3],
    "31з": [836, 385, 3],
    "L310U": [852, 385, 3],

    //и



    //4
    ////////////////////////////////////////////////////////////////
    //гл
    "412": [358, 315, 4],
    "419": [312, 273, 4],
    "420": [312, 253, 4],
    "426": [312, 226, 4],
    "427": [312, 241, 4],
    "428": [312, 262, 4],
    "429": [176, 295, 4],
    "437": [107, 295, 4],
    "440": [46, 334, 4],
    "441": [46, 365, 4],
    "448": [166, 410, 4],
    "453": [166, 349, 4],
    "L401R": [25, 87, 4],
    "X401": [127, 143, 4],
    "L403L,435,436": [127, 279, 4],
    "X402": [127, 295, 4],
    "L402U": [50, 143, 4],
    "X403": [166, 295, 4],
    "X404": [249, 295, 4],
    "X405": [312, 295, 4],
    "X406,414,415,416,417": [358, 295, 4],
    "438,439": [46, 323, 4],
    "L404L": [46, 345, 4],
    "442,443": [46, 426, 4],
    "454,455": [166, 315, 4],
    "452а,455а": [166, 327, 4],
    "452,455б": [166, 339, 4],
    "450а": [166, 362, 4],
    "450,451": [166, 374, 4],
    "L405L,445": [166, 389, 4],
    "445,445а,445б,445в,446,447": [166, 427, 4],
    "421,426б": [312, 213, 4],
    "422,426а": [312, 199, 4],
    "423,424,425": [312, 119, 4],
    "L407L": [312, 157, 4],
    "410а": [358, 328, 4],
    "410б,413": [358, 340, 4],
    "410,411": [358, 355, 4],
    "408,411а": [358, 369, 4],
    "406,409": [358, 383, 4],
    "L408L,407": [358, 395, 4],
    "401,402,403,404,405": [358, 412, 4],
    "L406U": [249, 263, 4]

    //з

    //и
}


var lines = [

    //L
    "L101U L402U",
    "L102R L202R L302R",
    "L103L L203L L303L L403L",
    "L104U L206U L306U L406U",
    "L105L L207L L307L L407L",
    "L201R L301R L401R",
    "L204L L304L L404L",
    "L205L L305L L405L",
    "L208L L308L L408L",
    "L210D L309U",
    "L211D L310U",

    //1
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //гл
    "L101U 144 143 142 X101",
    "X101 145 141а 146 141 147 148 L102R 140а 149 140 139 150 138 L103L X102",
    "151 X102 165 X103 136 166 X104 X105 167 X106 101 102 120 119 118 116 116а 115 114 113 X107",
    "130а 130 129 128б 128а 131 127 126 L105L 125а 125б 131а 132а 132б 133 134 123 135 122 135в X105",
    "L104U X104 ВХОД",
    "X107 X108",
    "X108 X114",
    "X114 X113",
    "X111 L106L",

    //и
    "X110 X111 113и X113 114аи 114и X116 115и 116и 121и 117и 120и 119и",
    "X109 111и X110",
    "X109 104и 109и 108и 105и X112 103и 107и 102и 101и X115",
    "X115 111би L108R X116",

    //2
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //гл
    "X208 L206U",
    "X202 24 23 22 21 20 19 18 17 15 13 X203",
    "X202 25 26 L201R 27 42 28 29 41 30 40 31 39 32 38 33 34 35 37 X201",
    "X201 36",
    "X203 13 12 14 16 9 11 11а 10 L202R 6 8 5 7 7а 3 2 4 4а 1 L203L X204",
    "253 254 254а 253а X204 252а 252 X205 251 288 X208 X209 232а 232 X210 230 229 227 226 225 224 223 222 221а 220 221 L209U X211",
    "242 243 241 240 244 245 239 238 L207L 237 246 236а 246а 236 247 235 249 235а 234 233 250 X209",
    "X210 215а 217 214 215 213 212 210 211 208 209 206 207 L208L",
    "X205 280 287б 280а 287а 282 287 278 285 276 274 283а 272 283 270 277 268 L205L 277а 273 268а 269 274 X207",
    "X206 261а 261 262 263 264 264а 265 266 267 X207",
    "X206 260 259 258 257 256 255 L204L",

    //з
    "X211 L210D",
    //"L211D X214",

    //и



    //3
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //гл
    "X301 L301R",
    "X303 L302R L303L X304",
    "L304L X302",
    "X302 X306",
    "X305 L305L X306",
    "X304 X305 X307 X308 X309 L309U",
    "L307L X308",
    "X309 L308L",

    //з
    "L309U 19з 20з 21з 22з 23з 24з 25з 26з 26аз 28з 27з 30з 29з 31з L310U",


    //4
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //гл
    "438 439 440 L404L 441 442",
    "L403L 435 436 X402",
    "437 X402 X403 429 X404 X405 X406",
    "X403 454 455 452а 455а 452 455б 453 450а 450 451 445 L405L 448 446 447 445 445а 445б 445в",
    "L406U X404",
    "423 424 425 L407L 422 426а 421 426б 426 427 420 428 419 X405",
    "X406 414 415 416 417 412 410а 410б 413 410 411 408 411а 406 409 L408L 407 405 401 402 403 404"
];

// find shortest track
//
function dijkstra(key_start, key_finish) {
    // reset points
    for (var key in points) {
        points[key].mark = Number.MAX_VALUE;
        points[key].const = false;
        points[key].from = null;
    }
    points[key_start].mark = 0;
    points[key_start].const = true;

    var p = points[key_start];
    while (p.key != key_finish)
    {
        p = dijkstra_step(p);
        if (!p) {
            console.log("граф не связен");
        }
        // ставим постоянную отметку
        p.const = true;        
    }
    // track
    p = points[key_finish]
    var track = [p];
    while (p.from) {
        p = p.from;
        track.push(p);
    }
    return tune(track);
}

// A step of Dijkstra's alg.
//
function dijkstra_step(point)
{
    for (var k in point.E) {
        var p = points[k];
        if (p.const)
            continue;
        d = point.E[k];
        if (point.mark + d < p.mark) {
            p.mark = point.mark + d;
            p.from = point;
        }
    }

    // marks nearest point as const
    var min = Number.MAX_VALUE;
    for (var k in points)
    {
        var p = points[k];
        if (p.const)
            continue;
        if (p.mark < min) {
            var nearest = p;
            min = p.mark;
        }
    }
    return nearest;
}

// Remove on streight line vertexes
//
function tune(track) 
{
    if (track.length < 4)
        return track;

    var res = [track[0]];
    for (var i = 1; i < track.length - 1; i++) {
        var a = track[i - 1], b = track[i], c = track[i + 1];
        var can_remove =
            a.x == b.x && b.x == c.x &&   a.y == b.y && b.y == c.y ||
            a.x == b.x && b.x == c.x &&   a.z == b.z && b.z == c.z ||
            a.z == b.z && b.z == c.z &&   a.y == b.y && b.y == c.y;
        if (!can_remove)
            res.push(b);
    }
    res.push(track[track.length-1]);
    return res;
}
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
var labels;  // sorted array of door labels

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

// -----------------------------------------------------------



var SCALE_PER_STEP = Math.pow(2, 1 / 30);
var OFFSET_PER_STEP = 10;
var shift_anime_timer = null;

function stop_shift_anime() {
    if (shift_anime_timer) {
        clearInterval(shift_anime_timer);
        shift_anime_timer = null;
    }
}

function shift_anime(dx, dy) {
    var STEP_COUNT = 50;
    var t = 0;
    if (!shift_anime_timer) {
        shift_anime_timer = setInterval(function () {
            //  
            shift_x += dx;
            shift_y += dy;
            //
            draw();
            t++;
            if (t >= STEP_COUNT) {
                clearInterval(shift_anime_timer);
                shift_anime_timer = null;
            }
        }, 20);
    }
}

function scale_anime(k) {
    var STEP_COUNT = 15;
    var t = 0;
    var timer = setInterval(function () {
        //
        scale *= k;
        shift_x = shift_x * k - canvas.width / 2 * (k - 1);
        shift_y = shift_y * k - canvas.height / 2 * (k - 1);
        //
        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
        }
    }, 20);
}

function step_anime(p1, p2) {
    var STEP_COUNT = 10;
    var dx = (p2.x - p1.x) / STEP_COUNT;
    var dy = (p2.y - p1.y) / STEP_COUNT;
    var t = 0;
    var timer = setInterval(function () {
        //
        man.x += dx;
        man.y += dy;
        //
        auto_shift();

        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
            set_current_point(p2);
            man.i = 0;
            draw();
        }
    }, 50);
    
}


function ladder_anime(p1, p2) {
    var ladderNo = p1.key[2], dx, dy;
    switch (ladderNo) {
        case "1": dx = 0; dy = 2; break;
        case "2": dx = 2; dy = 0; break;
        case "3": dx = -2; dy = 0; break;
    }
    var STEP_COUNT = 20;
    var t = 0;
    var timer = setInterval(function () {
        //
        if (t < STEP_COUNT / 2) {
            man.x += dx;
            man.y += dy;
        } else {
            man.x -= dx;
            man.y -= dy;
        }
        //
        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
            set_current_point(p2);
        }
    }, 20);
    
}



// inintial settings -----------



$(function () {

    // set canvas size accorging to screen size
    $("#canvas1").attr("width", screen.availWidth)
                 .attr("height", screen.availHeight);

    $("#top-panel").css("width", screen.availWidth - 72);
               

    canvas = $("#canvas1")[0];
    ctx = canvas.getContext("2d");

    // load background images
    imgs = {};
    for (var i = 1; i < 3; ++i) {
        imgs[i] = new Image();
        imgs[i].src = 'floors/' + i + '.svg';
    }

    // load man pictures
    man = { x: 0, y: 0, i: 0, imgs: {} };
    for (var i = 0; i < 2; ++i) {
        man.imgs[i] = new Image();
        man.imgs[i].src = 'pic/man' + (i + 1) + '.png';
    }

    // init data
    imgs[imgs_count].onload = function () {
        init_data(dots, lines);
        set_current_point(points["ВХОД"]);
        MAP_HEIGHT = imgs[1].height;
        MAP_WIDTH = imgs[1].width;

        // show dialog at start
        $("#bars").click();
    };

    //---------------- settings event handlers --------------------------

    //$(window).on("orientationchange", doc_ready);

    // scaling

    $("#scale_inc").on("click", function () {
        scale_anime(SCALE_PER_STEP)
    })

    $("#scale_dec").on("click", function () {
        scale_anime(1 / SCALE_PER_STEP)
    })

    // scrolling

    $(canvas).on('swipeup', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if ((-shift_y + canvas.height) / scale < MAP_HEIGHT) {
            shift_anime(0, -OFFSET_PER_STEP);
        }
    });

    $(canvas).on('swipedown', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (shift_y / scale < 0) {
            shift_anime(0, OFFSET_PER_STEP);
        }
    });

    $(canvas).on('swipeleft', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if ((-shift_x + canvas.width) / scale < MAP_WIDTH) {
            shift_anime(-OFFSET_PER_STEP, 0);
        }
    });

    $(canvas).on('swiperight', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (shift_x / scale < 0) {
            shift_anime(OFFSET_PER_STEP, 0);
        }
    });

    $(canvas).on('tap', function (event) {
        event.stopPropagation();
        event.preventDefault();

        stop_shift_anime();

        var dx = (event.clientX - shift_x - MAN_WIDTH / 2) / scale - man.x;
        var dy = (event.clientY - shift_y - MAN_HEIGHT / 2) / scale - man.y;
        if (dx * dx + dy * dy < 400) {
            step_forward();
        }
    });

    $(canvas).on('taphold', function (event) {
        event.stopPropagation();
        event.preventDefault();

        stop_shift_anime();
        //if ($("#scale_inc").css("visibility") == "visible")
        //    $("#scale_inc, #scale_dec, #bars, #info").css("visibility", "hidden");
        //else 
        //    $("#scale_inc, #scale_dec, #bars, #info").css("visibility", "visible");
        //scale_anime(SCALE_PER_STEP);
    });

    $('#top-panel').on('swipedown', function (event) {
        $("#scale_inc, #scale_dec, #bars, #info").css("visibility", "visible");
    });

    $('#top-panel').on('swipeup', function (event) {
        $("#scale_inc, #scale_dec, #bars, #info").css("visibility", "hidden");
    });




    $("#goButton").on("click", function (event) {
        stop_shift_anime();
        find_and_show_track();
    });

    $(function () {
        $("#from").on("input", autocomplete);
        $("#to").on("input", autocomplete);
    })

    
    function autocomplete(event) {
        $el = $(this);

        var text = this.value.slice(0, this.selectionStart);
        if (text === "") {
            $el.val("");
            return;
        }
        var label = labels.find(function (k) { return k.startsWith(text) });
        if (label) {
            $el.val(label);
            $el[0].selectionStart = $el[0].selectionEnd = text.length;
        } else {
            $el.val($el.val().slice(0, $el[0].selectionStart-1));
            $el.animate({ opacity: 0 }, 200, function () { $el.animate({ opacity: 1 }, 200); });
        }

    }


});


//
function init_data(dots, lines)
{
    // points
    points = {};
    for (var polykey in dots) {
        var keys = polykey.split(",");
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            points[key] = new Point(key, dots[polykey][0], dots[polykey][1], dots[polykey][2]);
        }
    }

    // edges
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].replace(/,/g, " ");

        var keys = line.split(' ');
        for (var j = 1; j < keys.length; j++) {
            var k1 = keys[j - 1], k2 = keys[j];
            if (points[k1] && points[k2]) {
                var dx = points[k1].x - points[k2].x;
                var dy = points[k1].y - points[k2].y;
                var dz = points[k1].z - points[k2].z;
                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                points[k1].E[k2] = points[k2].E[k1] = dist;
            }
            else {
                if (!points[k1])
                    console.log('Wrong key: ' + k1);
                if (!points[k2])
                    console.log('Wrong key: ' + k2);
            }
        }
    }

    // labels
    labels = [];
    for (var key in points)
        labels.push(key);
    labels.sort();
}

//
function find_and_show_track() {
    var fromKey = $("#from").val();
    var toKey = $("#to").val();

    //check input data 
    if (points[fromKey] && points[toKey])
    {
        track = dijkstra(fromKey, toKey);
        track = track.reverse();
        auto_scale();
        set_current_point(track[0]);
    } else {
        track = null;
        location.replace('#dialog');
    }
}

//
function step_forward() {
    if (track == undefined)
        return;
    var i1 = track.indexOf(current_point);
    var i2 = (i1 + 1) % track.length;
    set_current_point(track[i1]);

    if (track[i1].z == track[i2].z) 
    {
        step_anime(track[i1], track[i2]);     
    } else {
        ladder_anime(track[i1], track[i2])
    }
};

function step_back() {
    if (track == undefined)
        return;
    var i = (track.indexOf(current_point) - 1 + track.length) % track.length;
    set_current_point(track[i]);
}

function set_current_point(p) {
    current_point = p;
    man.x = p.x;
    man.y = p.y;
    draw();
}

// drawing -------------------------

function draw()
{
    // background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // transform
    ctx.save();
    ctx.translate(shift_x, shift_y);
    ctx.scale(scale, scale);


    var bg = current_point.z;
    ctx.drawImage(imgs[bg], 0, 0);

    // track
    if (track) {
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        var p = track[0];
        var x0 = p.x;
        var y0 = p.y;
        ctx.moveTo(x0, y0);
        for (var i = 1; i < track.length; i++) {
            var p = track[i];
            ctx.lineTo(p.x, p.y);
            x0 = p.x; y0 = p.y;
        }
        ctx.stroke();

        // man
        ctx.drawImage(man.imgs[man.i], man.x, man.y, MAN_WIDTH, MAN_HEIGHT);
        man.i = (man.i + 1) % 2;
    }
    ctx.restore();

    // floor
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.font = "72px arial";
    ctx.fillText(current_point.z + " этаж", 50, canvas.height - 50);

}

function auto_scale()
{
    var p = track[0];
    scale = 2;
    shift_x = -p.x * scale + screen.width / 2;
    shift_y = -p.y * scale + screen.height / 2;
}

function auto_shift()
{
    var MARGIN = 40;
    // X
    if (man.x < -shift_x / scale) {
        shift_x = (-man.x + MARGIN) * scale;
    }
    if (man.x > (-shift_x + canvas.width) / scale) {
        shift_x = canvas.width - (man.x + man.imgs[0].width + MARGIN) * scale;
    }
    // Y
    if (man.y < -shift_y / scale) {
        shift_y = (-man.y + MARGIN) * scale;
    }
    if (man.y > (-shift_y + canvas.height) / scale) {
        shift_y = canvas.height - (man.y + man.imgs[0].height + MARGIN) * scale;
    }

}