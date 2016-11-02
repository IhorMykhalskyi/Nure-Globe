function Dashboard()
{
    var $ul = $('#ul-keys');
    var $ul_popup = $('#ul-keys-popup');
    var $go_btn = $("#go-button")
    var $target;


    $ul.css('height', $("#canvas-panel").height());

    // fill list of keys
    $ul.html("");
    for (var i in graph.labels) {
        var $li = $("<div class='li-key'>" + graph.labels[i] + "</div>");
        $li.on("click", function (ev) {
            $target.text($(this).text());
            $ul.popup("close");
        });
        $ul.append($li);
    }



    $("#from").on("click", function () {
        $target = $(this);
        track = null;
        $go_btn.removeClass('ui-icon-man_b').addClass('ui-icon-nureglobe');
    });

    $("#to").on("click", function () {
        $target = $(this);
        track = null;
        $go_btn.removeClass('ui-icon-man_b').addClass('ui-icon-nureglobe');
    });

    $go_btn.on("click", function () {
        if (!track) {
            var fromKey = $("#from").text();
            var toKey = $("#to").text();
            var way = graph.dijkstra(fromKey, toKey).reverse();
            track = new Track(fromKey, toKey, way);
            man.setToPoint(track.startPoint);
            centering(track.startPoint);
            $go_btn.removeClass('ui-icon-nureglobe').addClass('ui-icon-man_b');
            draw();
        } else {
            track.stepForward();
        }
    });

    $("#scale-inc").on("click", function () {
        scale *= 1.1;
        canvas.width = MAP_WIDTH * scale;
        canvas.height = MAP_HEIGHT * scale;
        draw();
    })

    $("#scale-dec").on("click", function () {
        scale /= 1.1;
        canvas.width = MAP_WIDTH * scale;
        canvas.height = MAP_HEIGHT * scale;
        draw();
    })




}