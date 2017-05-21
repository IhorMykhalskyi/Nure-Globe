// Point on the graph
// x, y, z - coords
// E - dictionary of belonging edges ({key:distance} pairs)


function Point(key, x, y, z) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.z = z;
    this.E = {};
}

// Model 
// dots, lines - load level data
// 
function Graph(dots, lines)
{
    // dictionary of Points
    this.points = {};

    // init points
    for (var polykey in dots) {
        var keys = polykey.split(",");
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            this.points[key] = new Point(key, dots[polykey][0], dots[polykey][1], dots[polykey][2]);
        }
    }

    // collect edges
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].replace(/,/g, " ");

        var keys = line.split(' ');
        for (var j = 1; j < keys.length; j++) {
            var k1 = keys[j - 1], k2 = keys[j];
            if (this.points[k1] && this.points[k2]) {
                var dx = this.points[k1].x - this.points[k2].x;
                var dy = this.points[k1].y - this.points[k2].y;
                var dz = this.points[k1].z - this.points[k2].z;
                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                this.points[k1].E[k2] = this.points[k2].E[k1] = dist;
            }
            else {
                if (!this.points[k1])
                    console.log('Wrong key: ' + k1);
                if (!this.points[k2])
                    console.log('Wrong key: ' + k2);
            }
        }
    }

    // sorted array of door labels
    this.labels = [];
    // init labels
    for (var key in this.points) {
        if (key[0] != 'X' && key[0] != 'L')
            this.labels.push(key);
    }
    this.labels.sort();


    this.findNearestPoint = function (x, y, z) {
        var minDist = Number.MAX_VALUE;
        var nearest = null;
        for (var key in this.points) {
            var p = this.points[key];
            var dx = p.x - x, dy = p.y - y;
            if (p.z !== z) continue;
            var dist = dx * dx + dy * dy;
            if (dist < minDist) {
                minDist = dist;
                nearest = p;
            }
        }
        return nearest;
    }

    // Main part of Dijkstra's alg. ------------------------------------------------------------

    this.dijkstra = function(keyStart, keyFinish) {
        var points = this.points;
        // reset points
        for (var key in points) {
            points[key].mark = Number.MAX_VALUE;
            points[key].const = false;
            points[key].from = null;
        }
        points[keyStart].mark = 0;
        points[keyStart].const = true;

        var p = points[keyStart];
        while (p.key != keyFinish) {
            if (!dijkstraStep(p, points)) {
                console.log("граф не связен: " + p.key);
            }
            p = dijkstraStep(p, points);
            // ставим постоянную отметку
            p.const = true;
        }
        // way
        p = points[keyFinish]
        var way = [p];
        while (p.from) {
            p = p.from;
            way.push(p);
        }
        return way;
    }

    // A step of Dijkstra's alg. -----------------
    //
    function dijkstraStep(point, points)
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
        for (var k in points) {
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


}

