var mainH = 0, mainW = 0, image = null, context, glyphs = [];

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


$(document).ready(function () {
    $('#imgInp').on("click", function () {
        //console.log("clicked");
        this.value = null;
    });

    $("#imgInp").change(function () {
        //console.log("changed");
        readURL(this);
    });
});


// read image and set bgImg background & width height of containers
function readURL(input) {

    //console.log(input.files.length);

    for (var i = 0; i < input.files.length; i++) {
        console.log(input.files[i].name);
        var ext = input.files[i].name.split(".");
        ext = ext[ext.length - 1];

        var reader = new FileReader();
        reader.readAsDataURL(input.files[i]);
        reader.onload = function (e) {
            console.log(ext);
            if (ext == "css") { loadCSS(e.target.result); }
            if (ext == "ttf") { loadFont(e.target.result); }
        }
    }
}

var s = [];
var unis = [];
cnt = 0;

function loadCSS(data) {
    if (data.indexOf("base64,") !== -1) {
        data = data.split("base64,")[1];
    }
    data = window.atob(data);
    $("#styl").html(data);
    console.log("css loaded");

    var ss = document.styleSheets[0];
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].ownerNode.id == "styl") {
            ss = document.styleSheets[i];
        }
    }

    for (i = 0; i < ss.cssRules.length; i++) {
        var r = ss.cssRules[i];
        if (r.cssText.indexOf("content") != -1 && r.selectorText.indexOf("before") != -1) {
            cnt++;
            var sel = r.selectorText.replace(/::before/g, "");
            sel = sel.replace(/, .fa/g, "");
            sel = sel.replace(".", "");

            // eliminate duplicate names + combine multiple classes
            sel = sel.split("-");
            sel = sel.filter(onlyUnique);
            if (sel.indexOf("o") > -1) {
                sel.splice(sel.indexOf("o"), 1);
                sel.push("o");
            }
            sel = sel.join("-");

            var unicode = r.style.content;
            unicode = unicode.charCodeAt(1).toString(16).toUpperCase();
            unicode = parseInt(unicode, 16);
            hex = unicode.toString(16);

            var glyph = {};
            glyph.sel = sel;
            glyph.unicode = unicode;
            glyph.hex = hex;
            glyph.htmlCode = "&#x" + hex + ";";

            if (unis.indexOf(unicode) >= 0) {
                console.log(unicode + " already exists");
            } else {
                unis.push(unicode);
                glyphs.push(glyph);
            }
        }
    }

    console.log(unis.length);
    updateScopeIcons();
}


function loadFont(data){
    console.log("load font");
    var cssString = "@font-face {"
    +"font-family: 'CustomFont';"
    +"src: url(data:"+data+");"
    +"font-weight: normal;"
    +"font-style: normal;"
    +"}";

    $("#fontStyl").html(cssString);
    var scope = angular.element($("#glyphsCont")).scope();
    scope.$apply(function () {
        scope.fontLoaded = true;
    })
}

var app = angular.module("cssGlyphsApp", ['ngSanitize']);
app.controller("glyphsController", function ($scope,$sanitize) {
    $scope.fontLoaded = false;
    $scope.glyphs = glyphs;

    $scope.ico = function(x){
        x = glyphs[x].htmlCode;
        return x;
    }
});



function updateScopeIcons() {
    var scope = angular.element($("#glyphsCont")).scope();
    scope.$apply(function () {
        scope.glyphs = glyphs;
    })
}