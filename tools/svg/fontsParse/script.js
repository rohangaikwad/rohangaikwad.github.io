var mainH = 0, mainW = 0, image = null, context, icons = [];

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
});




// read image and set bgImg background & width height of containers
function readURL(input) {

    console.log(input.files.length);

    for(var i=0; i < input.files.length; i++){
        console.log(input.files[i].name);
        var ext = input.files[i].name.split(".");
        ext = ext[ext.length-1];

        var reader = new FileReader();
        reader.readAsDataURL(input.files[i]);
        reader.onload = function (e) {
            console.log(ext);
            if(ext == "ttf") { loadFont (e.target.result); }
            if(ext == "svg") { loadIcons(e.target.result); }
        }
    }
}

function loadFont(data){
    console.log("load font");
    var cssString = "@font-face {"
    +"font-family: 'CustomFont';"
    +"src: url(data:"+data+");"
    +"font-weight: normal;"
    +"font-style: normal;"
    +"}";

    $("#styl").html(cssString);
}

function loadIcons(data){    
    console.log("load icons");
    var svgString = data;
    
    if(svgString.indexOf("base64,") !== -1){
        svgString = svgString.split("base64,")[1];
    }
    svgString = window.atob(svgString);

    $("#mySVG").html(svgString);

    setTimeout(function() {
        var svg = $('svg').find('glyph');
        var unicodePrefix = '\\'; // Add unicode escaping for CSS, JS escaped
        var iconOutput = '';
        icons = [];
        var i = 0;

        for (i=0; i < svg.length; i++) {
            if( svg[i].hasAttribute('unicode') ){
                var unicode = svg[i].getAttribute('unicode').toString();
                var code = unicode.charCodeAt().toString(16);
                var icon = {};
                icon.unicode = unicode;
                icon.code = code;
                //icon.d = svg[i].getAttribute('d').toString();
                icon.name = svg[i].getAttribute('glyph-name').toString();;
                icons.push(icon);
            }
        }

        updateScopeIcons();

    }, 100);
}

var app = angular.module("icoFontApp", []);
app.controller("iconsController", function ($scope) {
    $scope.icons = icons;
});

function updateScopeIcons() {
    var scope = angular.element($("#iconsCont")).scope();
    scope.$apply(function(){
        scope.icons = icons;
    })
}