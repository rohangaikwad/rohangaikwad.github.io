$(document).on("click", ".addFrame", function () {
    $(this).closest(".lanes").append(
        "<div class=\"frame\"><div class=\"screen\"><input type=\"text\" placeholder=\"umm...\"></div></div>"
    );
});

$(document).on("click", ".lanes", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var x = ($(e.target).attr("class"));
    if (x === "lanes") {
        var totLanes = $("mainContent > .lanes").length;
        $("#mainContent").append(
            "<div class=\"lanes\" id=\"lane" + totLanes + "\">" +
            "<div class=\"addFrame\">Add Frame</div>" +
            "</div>"
        );
    } else {
        return;
    }
});
