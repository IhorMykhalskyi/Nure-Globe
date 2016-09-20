function Point(key, x, y, z) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.z = z;
    this.E = {}; 
}

// -----------------------------------------------------------

var points;  // dictionary of Points

function init_points(dots, lines)
{
    // points
    points = {};
    for (var polykey in dots) {
        var keys = polykey.split(",");
        for (var i = 0; i < keys.length; ++i)
        {
            var key = keys[i];
            points[key] = new Point(key, dots[polykey][0], dots[polykey][1], dots[polykey][2]);
        }
    }
    
    // edges
    for(var i = 0; i < lines.length; i++) 
    {
        var line = lines[i].replace(/,/g, " ");

        var keys = line.split(' ');
        for(var j = 1; j < keys.length; j++)
        {
            var k1 = keys[j - 1], k2 = keys[j];
            if (points[k1] && points[k2]) {
                var dx = points[k1].x - points[k2].x;
                var dy = points[k1].y - points[k2].y;
                var dz = points[k1].z - points[k2].z;
                //var dx = dots[k1][0] - dots[k2][0];
                //var dy = dots[k1][1] - dots[k2][1];
                //var dz = dots[k1][2] - dots[k2][2];
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
}




// find shortest path
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
    // path
    p = points[key_finish]
    var path = [p];
    while (p.from) {
        p = p.from;
        path.push(p);
    }
    return tune(path);
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
function tune(path) 
{
    if (path.length < 4)
        return path;

    var res = [path[0]];
    for (var i = 1; i < path.length - 1; i++) {
        var a = path[i - 1], b = path[i], c = path[i + 1];
        var can_remove =
            a.x == b.x && b.x == c.x &&   a.y == b.y && b.y == c.y ||
            a.x == b.x && b.x == c.x &&   a.z == b.z && b.z == c.z ||
            a.z == b.z && b.z == c.z &&   a.y == b.y && b.y == c.y;
        if (!can_remove)
            res.push(b);
    }
    res.push(path[path.length-1]);
    return res;
}