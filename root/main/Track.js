function Track(fromKey, toKey, way)
{

    var currIdx = 0;

    this.way = tune(way);

    this.startPoint = this.way[0];

    this.getCurrentPoint = function () {
        return this.way[currIdx]
    };

    this.stepForward = function () {
        var p1 = this.way[currIdx];
        currIdx = (currIdx + 1) % this.way.length;
        var p2 = this.way[currIdx];

        if (p1.z != p2.z) {
            anime.ladder(p1, p2);
        } else {
            anime.step(p1, p2);
        }
    };

    this.draw = function (ctx) {
        ctx.beginPath();
        var p = this.way[0];
        ctx.moveTo(p.x, p.y);
        for (var i = 1; i < track.way.length; i++) {
            p = this.way[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }

    // Remove on streight line vertexes
    //
    function tune(way)
    {
        if (way.length < 4)
            return way;

        var res = [way[0]];
        for (var i = 1; i < way.length - 1; i++) {
            var a = way[i - 1], b = way[i], c = way[i + 1];
            var can_remove =
                a.x == b.x && b.x == c.x && a.y == b.y && b.y == c.y ||
                a.x == b.x && b.x == c.x && a.z == b.z && b.z == c.z ||
                a.z == b.z && b.z == c.z && a.y == b.y && b.y == c.y;
            if (!can_remove)
                res.push(b);
        }
        res.push(way[way.length - 1]);
        return res;
    }


}