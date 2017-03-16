/*
 * Author: Rohan Gaikwad
 * Name: El Popup
 * Version: 0.0.1b
 * Summary: Create Popups, Modals & Dialogs
 */

var activeElPopupId = 0;
function loadElPopup() {

    function createElem(elem) { return document.createElement(elem); }
    function apnd(a, b) { a.appendChild(b); }
    function hasProp(a, b) { return a.hasOwnProperty(b); }
    function addClass(a, b) { a.className += b+" "; }

    var prefix = "el-popup-";
    var id = prefix + Date.now();
    activeElPopupId = id;
    this.elPopup = {};
    this.elPopup.id = id;



    var d = document.createDocumentFragment();
    var popCont = createElem("div");
    addClass(popCont, prefix + "container");
    popCont.id = activeElPopupId;
    if (arguments.length > 0) {
        var args = arguments[0];
        if (hasProp(args,"closeOnClick")) {
            if (args.closeOnClick) {
                popCont.onclick = function () {
                    addClass(popCont,"unload");
                    setTimeout(function () {
                        popCont.outerHTML = "";
                        delete popCont;
                    }, 300);
                }
            }
        }
        if (hasProp(args,"popType")) {
            addClass(popCont,args.popType);
        }
    }

    var popTbl = createElem("div");
    addClass(popTbl, prefix + "tbl");

    var popCell = createElem("div");
    addClass(popCell, prefix + "tbl-cell");

    var popWin = createElem("div");
    addClass(popWin, prefix + "window");

    var popTool = createElem("div");
    addClass(popTool, prefix + "toolbar");

    var popTtl = createElem("div");
    addClass(popTtl, prefix + "title");

    var popClose = createElem("div");
    addClass(popClose, prefix + "close");
    popClose.innerHTML = "&times;";
    popClose.onclick = function(){        
        addClass(popCont,"unload");
        setTimeout(function () {
            popCont.outerHTML = "";
            delete popCont;
        }, 300);
    }

    var popContent = createElem("div");
    addClass(popContent, prefix + "content");
    if (arguments.length > 0) {
        var args = arguments[0];

        if (hasProp(args,"popupWindowAttribs")) {
            for (var prop in args.popupWindowAttribs) {
                popWin[prop] = args.popupWindowAttribs[prop];
            }
        }

        if (hasProp(args,"contentWindowAttribs")) {
            for (var prop in args.contentWindowAttribs) {
                popContent[prop] = args.contentWindowAttribs[prop];
            }
        }

        if (hasProp(args,"iframeURL")) {
            var ifrm = createElem("iframe");
            ifrm.src = args.iframeURL;

            if (args.iframeURL.indexOf("youtube") > -1) {
                ifrm.setAttribute("allowfullscreen", "allowfullscreen");
                ifrm.setAttribute("frameborder", "0");
                ifrm.setAttribute("webkitallowfullscreen", "webkitallowfullscreen");
            }

            if (hasProp(args,"iframeAttribs")) {
                for (var prop in args.iframeAttribs) {
                    ifrm.setAttribute(prop, args.iframeAttribs[prop]);
                }
            }

            ifrm.style += "; max-width:100%; max-height:100%; overflow:auto;";

            popContent.innerHTML = "";
            apnd(popContent,ifrm);
        }

        if (hasProp(args,"title")) {
            popTtl.innerHTML = args.title;
        }

        if (hasProp(args,"titleLeft")) {
            addClass(popTool, "left");
        }

        if (hasProp(args,"hideToolbar")) {
            if (args.hideToolbar) addClass(popTool, "none");
        }
    }

    var popActions = createElem("div");
    addClass(popActions, prefix + "actions");
    
    var popActionsClose = createElem("button");
    popActionsClose.innerHTML += "OK";
    popActionsClose.onclick = function () {
        addClass(popCont, "unload");
        setTimeout(function () {
            popCont.outerHTML = "";
            delete popCont;
        }, 300);
    }


    
    apnd(popTool,popTtl);
    apnd(popTool,popClose);
    apnd(popWin,popTool);
    apnd(popWin,popContent);
    apnd(popActions,popActionsClose);
    apnd(popWin,popActions);
    apnd(popCell,popWin);
    apnd(popTbl,popCell);
    apnd(popCont,popTbl);

    apnd(d,popCont);
    apnd(document.body,d);

    //if (arguments.length > 0) {
    //    var args = arguments[0];
    //    if (args.hasOwnProperty("enumerate")) {
    //        var MyDiv = document.getElementById(activeElPopupId);
    //        var arr = MyDiv.getElementsByTagName('script');
    //        for (var n = 0; n < arr.length; n++) {
    //            eval(arr[n].innerHTML);
    //        }
    //        console.log("enumed");
    //    }
    //}

    if (hasProp(args,"data")) {
        if (window.jQuery) {
            $(popContent).html(args.data);
        } else {
            popContent.innerHTML = args.data;
            console.log('%c WARNING: jQuery wasn\'t detected. Javascript code inside the popup won\'t function as intended or not at all.', 'color: red;');
        }
    }

    if (hasProp(args,"onInit")) {
        args.onInit();
    }

    //this.elPopup.success = function (x) {
    //    console.log("success");
    //    if (typeof x === "function") {
    //        x();
    //    }
    //    return this.elPopup;
    //}

    this.elPopup.onInit = function (x) { x(); }

    this.elPopup.onClose = function (x) {
        popClose.onclick = function () {
            x();
            popCont.className += " unload";
            setTimeout(function () {
                popCont.outerHTML = "";
                delete popCont;
            }, 300);
        }
        return this;
    }

    this.elPopup.primaryAction = function (x) {
        popActionsClose.onclick = function () {
            x();
        }
        return this;
    }

    elPopupResize();
    return this.elPopup;
}

/*
<div class="popup-container">
    <div class="popup-tbl">
        <div class="popup-tbl-cell">
            <div class="popup-window">
                <div class="popup-toolbar">
                    <div class="popup-title"></div>
                    <div class="popup-close">&times;</div>
                </div>
                <div class="popup-content"></div>
            </div>
        </div>
    </div>
</div>
*/

window.onresize = function (event) {
    elPopupResize();
};

function elPopupResize() {
    var cnt = document.querySelectorAll(".el-popup-content").length;
    for (var i = 0; i < cnt; i++) {
        var popContent = document.querySelectorAll(".el-popup-content")[i];
        var frmCnt = popContent.querySelectorAll("iframe").length;
        if (frmCnt > 0) {
            var frm = popContent.querySelectorAll("iframe")[0];
            // get el-popup-content height
            var conHeight = popContent.offsetHeight || popContent.clientHeight || 100, conHeight2 = 0;

            if (frm.hasAttribute("data-height")) {
                // get inititial iframe height
                var origHeight = parseInt(frm.getAttribute("data-height"));
                // get window height
                var winHeight = window.innerHeight || window.clientHeight;

                if ( winHeight > (origHeight+180) ) {
                    conHeight = origHeight;
                } else if (winHeight - conHeight > 180) {
                    conHeight = winHeight - 180;
                }
                conHeight = (conHeight > origHeight) ? origHeight : conHeight;
            }
            // set frame height
            frm.setAttribute("height", conHeight);
            // check el-popup-content height
            conHeight2 = popContent.offsetHeight || popContent.clientHeight || 100;
            // if content height is lower than frameHeight.. set the frame height to as same as the content height
            if (conHeight2 < conHeight) frm.setAttribute("height", conHeight2);
            // console.log("height set to: " + conHeight);
        }
    }
}