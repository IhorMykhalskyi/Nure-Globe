function Dashboard()
{
    var $ul = $('#ul-keys');
    var $ul_popup = $('#ul-keys-popup');
    var $go = $("#go-button")
    var target;


    $("#from").on("click", function () {
        target = this;
        track = null;
        $go.removeClass('ui-icon-man_b').addClass('ui-icon-nureglobe');
    });

    $("#to").on("click", function () {
        target = this;
        track = null;
        $go.removeClass('ui-icon-man_b').addClass('ui-icon-nureglobe');
    });

    $go.on("click", function () {
        if (!track) {
            var fromKey = $("#from").text();
            var toKey = $("#to").text();
            var way = graph.dijkstra(fromKey, toKey).reverse();
            track = new Track(fromKey, toKey, way);
            set_current_point(track.startPoint);
            centering(track.startPoint);
            $go.removeClass('ui-icon-nureglobe').addClass('ui-icon-man_b');
        } else {
            track.stepForward();
        }
    });

    $ul.css('height', $("#canvas-panel").height());

    // fill list of keys
    $ul.html("");
    for (var i in graph.labels) {
        var $li = $("<div class='li-key'>" + graph.labels[i] + "</div>");
        $li.on("click", function (ev) {
            $(target).text($(this).text());
            $ul.popup("close");
        });
        $ul.append($li);
    }


}