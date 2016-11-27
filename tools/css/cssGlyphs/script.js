var mainH = 0, mainW = 0, image = null, context, glyphs = [];

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};


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

    for(var i=0; i < input.files.length; i++){
        console.log(input.files[i].name);
        var ext = input.files[i].name.split(".");
        ext = ext[ext.length-1];

        var reader = new FileReader();
        reader.readAsDataURL(input.files[i]);
        reader.onload = function (e) {
            console.log(ext);
            if(ext == "css") { loadCSS (e.target.result); }
        }
    }
}

var s = [];

function loadCSS(data){    
    if(data.indexOf("base64,") !== -1){
        data = data.split("base64,")[1];
    }
    data = window.atob(data);
    $("#styl").html(data);
    console.log("css loaded");

    var ss = document.styleSheets[0];
    for(var i = 0; i < document.styleSheets.length; i++){
        if(document.styleSheets[i].ownerNode.id == "styl"){
            ss = document.styleSheets[i];
        }
    }

    for(i = 0;i < ss.cssRules.length; i++){
        var r = ss.cssRules[i];
        if(r.cssText.indexOf("content") != -1){
            //console.log(r);
            s.push(r.selectorText);
            var sel = r.selectorText.replace(/:/g, "");
            sel = sel.replace("before", "");
            sel = sel.replace(".", "");

            var unicode = r.style.content;
            unicode = unicode.charCodeAt(1).toString(16).toUpperCase();
            unicode = parseInt(unicode, 16);
            hex = unicode.toString(16);

            var glyph = {};
            glyph.sel = sel;
            glyph.unicode = unicode;
            glyph.hex = hex;
            glyph.htmlCode = "&#x"+hex;
            glyphs.push(glyph);
        }
    }

    updateScopeIcons();
    //console.log(glyphs);
    //console.log(ss);
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
                icon.htmlCode = "&#x"+code;
                //icon.d = svg[i].getAttribute('d').toString();
                icon.name = svg[i].getAttribute('glyph-name').toString();;
                icons.push(icon);
            }
        }

        updateScopeIcons();
        $(".notifications").html("- " + icons.length +" icons Loaded");

    }, 100);
}

var app = angular.module("cssGlyphsApp", []);
app.controller("glyphsController", function ($scope) {
    $scope.glyphs = glyphs;
});

function updateScopeIcons() {
    var scope = angular.element($("#glyphsCont")).scope();
    scope.$apply(function(){
        scope.glyphs = glyphs;
    })
}