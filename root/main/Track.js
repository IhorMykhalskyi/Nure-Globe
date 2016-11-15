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
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        var start = this.way[0];
        ctx.moveTo(start.x, start.y);

        for (var i = 1; i < this.way.length; i++) {
            var p = this.way[i];
            ctx.save();
            if (p.z != this.way[currIdx].z) {
                ctx.globalAlpha = 0.5;
                ctx.setLineDash([4, 3]);
            }
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.restore();
            ctx.moveTo(p.x, p.y);
        }
    }

    // Remove on streight line vertexes
    //
    function tune(track)
    {
        if (track.length < 3)
            return track;

        var res = [track[0]];
        var last = track[0];
        for (var i = 1; i < track.length - 1; i++) {
            var b = track[i], c = track[i + 1];
            var can_remove =
                last.x == b.x && b.x == c.x && last.y == b.y && b.y == c.y ||
                last.x == b.x && b.x == c.x && last.z == b.z && b.z == c.z ||
                last.z == b.z && b.z == c.z && last.y == b.y && b.y == c.y;
            if (!can_remove) {
                res.push(b);
                last = b;
            }
        }
        res.push(track[track.length - 1]);
        return res;
    }


}