/*
 * Author: Rohan Gaikwad
 * Name: Dynoload
 * Version: 0.0.1b
 * Summary: Dynamically add loading animations to the web page
 */

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

var activeLoadingId = 0;

function startDynoLoader() {
    console.log("dyno start");
    var id = "dynoLoad-" + Date.now();
    activeLoadingId = id;

    var d = document.createDocumentFragment();
    var cont = document.createElement("div");
    cont.className += "dynoLoader-t ";
    cont.innerHTML = "<div class='dynoLoader-tc'><div class='dynoLoader-content'><div class='dyno-spin'><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div><br><span class='dyno-caption'>LOADING</span></div></div></div>";
    cont.id = id;
    //cont.onclick = function () {closeDynoLoader();};

    if (arguments.length > 0) {
        var args = arguments[0];
        if (args.hasOwnProperty("autoClose")) {
            console.log("closing");
            setTimeout(closeDynoLoader, args.autoClose || 4000);
        }
        if (args.hasOwnProperty("windowAttribs")) {
            for (var prop in args.windowAttribs) {
                cont[prop] = args.windowAttribs[prop];
            }
        }
        if (args.hasOwnProperty("caption")) {
            cont.getElementsByClassName("dyno-caption")[0].innerHTML = args.caption;
        }
        if (args.hasOwnProperty("captionAttribs")) {
            for (var prop in args.captionAttribs) {
                cont.getElementsByClassName("dyno-caption")[0][prop] = args.captionAttribs[prop];
            }
        }
        if (args.hasOwnProperty("closeOnClick")) {
            if (args.closeOnClick) {
                cont.onclick = function () {
                    closeDynoLoader();
                }
            }
        }
    }

    d.appendChild(cont);

    
    if (arguments.length > 0) {
        if (args.hasOwnProperty("targetID")) {
            var tId = args.targetID,
            elem = document.getElementById(tId);
            if (typeof (elem) != 'undefined' && elem != null) {
                cont.style.position = "absolute";
                cont.removeAttribute("id");
                var tmpCont = document.createElement("div");
                tmpCont.className += "dynoLoader-targetCont";
                tmpCont.id = id;
                if (args.hasOwnProperty("targetAttribs")) {
                    for (var prop in args.targetAttribs) {
                        tmpCont[prop] = args.targetAttribs[prop];
                    }
                }
                tmpCont.appendChild(d);
                document.getElementById(tId).appendChild(tmpCont);
            } else {
                document.body.appendChild(d);
                console.log(tId + " not found");
            }
        } else {
            document.body.appendChild(d);
        }
    } else {
        document.body.appendChild(d);
    }
    return id;
}

function closeDynoLoader() {

    if (activeLoadingId == 0) {
        console.log("No loading animation is currently open.");
    } else {
        var cntElem = document.getElementById(activeLoadingId);

        if (arguments.length > 0) {
            var args = arguments[0];
            if (args.hasOwnProperty("id")) {
                cntElem = document.getElementById(args.id);
                console.log("close specific id");
            }
        }

        if (typeof (cntElem) != 'undefined' && cntElem != null) {
            //if (hasClass(cntElem, 'dynoLoader-targetCont')) {cntElem = cntElem.getElementsByClassName("dynoLoader-t")[0];}
            //console.log(cntElem);
            cntElem.className += " unload";
            setTimeout(function () {
                cntElem.outerHTML = "";
                //delete cont;
            }, 500);
        } else {
            console.log("Loading animation not found.");
        }
    }
}

$(document).ready(function () {
    var options = {
        //"bgColor": "rgba(255,255,255,1)",
        "autoClose": 2000
    };
    //startDynoLoader(options);
});