
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