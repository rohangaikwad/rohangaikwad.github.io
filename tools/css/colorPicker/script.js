var mainH = 0, mainW = 0, image = null, context;

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

$(document).ready(function () {
    $('#imgInp').on("click", function () {
        console.log("clicked");
        this.value = null;
    });

    $("#imgInp").change(function () {
        console.log("changed");
        readURL(this);
    });

    $("#mySvg").on("click", function (e) {
        var offset = $(this).offset();
        var x = e.pageX - offset.left;
        var y = e.pageY - offset.top;
        if (add) addElem(x/zoom, y/zoom);
    });
});


$(document).on("mousedown", "#myCanvas", function (e) {
    var offset = $(this).offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;

    var data2d = context.getImageData(x, y, 1, 1).data;
    var hexColor = rgbToHex(data2d[0],data2d[1],data2d[2]);
    $("#colorText").html(hexColor);
    $("#txtArea").val(hexColor);    
    $("#styl").html("#colorBG{background-color:"+hexColor+";}");
    $("#txtArea").select();
    document.execCommand('copy');
});

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}






// read image and set bgImg background & width height of containers
function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                mainW = this.width;
                mainH = this.height;

                $('#myCanvas').attr("width", mainW);
                $('#myCanvas').attr("height", mainH);

                $("#myImg").attr("src", image.src);

                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                var img = document.getElementById("myImg");
                ctx.drawImage(img,0,0);

                context = document.getElementById('myCanvas').getContext('2d');
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}