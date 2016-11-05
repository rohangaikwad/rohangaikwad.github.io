'use strict';

var keyCodes = {
    3: "break",
    8: "backspace / delete",
    9: "tab",
    12: 'clear',
    13: "enter",
    16: "shift",
    17: "ctrl ",
    18: "alt",
    19: "pause/break",
    20: "caps lock",
    27: "escape",
    32: "spacebar",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home ",
    37: "left arrow ",
    38: "up arrow ",
    39: "right arrow",
    40: "down arrow ",
    41: "select",
    42: "print",
    43: "execute",
    44: "Print Screen",
    45: "insert ",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    58: ":",
    59: "semicolon (firefox), equals",
    60: "<",
    61: "equals (firefox)",
    63: "ß",
    64: "@ (firefox)",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "Windows Key / Left ⌘ / Chromebook Search key",
    92: "right window key ",
    93: "Windows Menu / Right ⌘",
    96: "numpad 0 ",
    97: "numpad 1 ",
    98: "numpad 2 ",
    99: "numpad 3 ",
    100: "numpad 4 ",
    101: "numpad 5 ",
    102: "numpad 6 ",
    103: "numpad 7 ",
    104: "numpad 8 ",
    105: "numpad 9 ",
    106: "multiply ",
    107: "add",
    108: "numpad period (firefox)",
    109: "subtract ",
    110: "decimal point",
    111: "divide ",
    112: "f1 ",
    113: "f2 ",
    114: "f3 ",
    115: "f4 ",
    116: "f5 ",
    117: "f6 ",
    118: "f7 ",
    119: "f8 ",
    120: "f9 ",
    121: "f10",
    122: "f11",
    123: "f12",
    124: "f13",
    125: "f14",
    126: "f15",
    127: "f16",
    128: "f17",
    129: "f18",
    130: "f19",
    131: "f20",
    132: "f21",
    133: "f22",
    134: "f23",
    135: "f24",
    144: "num lock ",
    145: "scroll lock",
    160: "^",
    161: '!',
    163: "#",
    164: '$',
    165: 'ù',
    166: "page backward",
    167: "page forward",
    169: "closing paren (AZERTY)",
    170: '*',
    171: "~ + * key",
    173: "minus (firefox), mute/unmute",
    174: "decrease volume level",
    175: "increase volume level",
    176: "next",
    177: "previous",
    178: "stop",
    179: "play/pause",
    180: "e-mail",
    181: "mute/unmute (firefox)",
    182: "decrease volume level (firefox)",
    183: "increase volume level (firefox)",
    186: "semi-colon / ñ",
    187: "equal sign ",
    188: "comma",
    189: "dash ",
    190: "period ",
    191: "forward slash / ç",
    192: "grave accent / ñ",
    193: "?, / or °",
    194: "numpad period (chrome)",
    219: "open bracket ",
    220: "back slash ",
    221: "close bracket ",
    222: "single quote ",
    223: "`",
    224: "left or right ⌘ key (firefox)",
    225: "altgr",
    226: "< /git >",
    230: "GNOME Compose Key",
    233: "XF86Forward",
    234: "XF86Back",
    255: "toggle touchpad"
};

var body = document.querySelector('body');
var typed = [];

body.onkeydown = function (e) {
    var i = typed.indexOf(e.keyCode);
    if (i > -1) typed.splice(i, 1);

    typed.push(e.keyCode);

    if (!e.metaKey) {
        e.preventDefault();
    }

    var str = "";
    for(var x = (typed.length - 1); x >= 0; x--){
        str += typed[x] + ": " + keyCodes[typed[x]] + "<br>";
    };

    //document.querySelector('.keycode-display').innerHTML = str;
    document.querySelector('.keycode-display').innerHTML = e.keyCode;
    document.querySelector('.text-display').innerHTML = keyCodes[e.keyCode] || `huh? Let me know what browser and key this was. <a href='https://github.com/wesbos/keycodes/issues/new?title=Missing keycode ${e.keyCode}&body=Tell me what key it was or even better, submit a Pull request!'>Submit to Github</a>`;

    $(".keys").removeClass("active");
    $("#id_"+e.keyCode).addClass("active");
};


var _codes = [
    { "id": "3", "name": "break"}, { "id": "8", "name": "backspace / delete"}, { "id": "9", "name": "tab"}, { "id": "12", "name": 'clear'}, { "id": "13", "name": "enter"}, { "id": "16", "name": "shift"}, { "id": "17", "name": "ctrl "}, { "id": "18", "name": "alt"}, { "id": "19", "name": "pause/break"}, { "id": "20", "name": "caps lock"}, { "id": "27", "name": "escape"}, { "id": "32", "name": "spacebar"}, { "id": "33", "name": "page up"}, { "id": "34", "name": "page down"}, { "id": "35", "name": "end"}, { "id": "36", "name": "home "}, { "id": "37", "name": "left arrow "}, { "id": "38", "name": "up arrow "}, { "id": "39", "name": "right arrow"}, { "id": "40", "name": "down arrow "}, { "id": "41", "name": "select"}, { "id": "42", "name": "print"}, { "id": "43", "name": "execute"}, { "id": "44", "name": "Print Screen"}, { "id": "45", "name": "insert "}, { "id": "46", "name": "delete"}, { "id": "48", "name": "0"}, { "id": "49", "name": "1"}, { "id": "50", "name": "2"}, { "id": "51", "name": "3"}, { "id": "52", "name": "4"}, { "id": "53", "name": "5"}, { "id": "54", "name": "6"}, { "id": "55", "name": "7"}, { "id": "56", "name": "8"}, { "id": "57", "name": "9"}, { "id": "58", "name": ":"}, { "id": "59", "name": "semicolon (firefox), equals"}, { "id": "60", "name": "<"}, { "id": "61", "name": "equals (firefox)"}, { "id": "63", "name": "ß"}, { "id": "64", "name": "@ (firefox)"}, { "id": "65", "name": "a"}, { "id": "66", "name": "b"}, { "id": "67", "name": "c"}, { "id": "68", "name": "d"}, { "id": "69", "name": "e"}, { "id": "70", "name": "f"}, { "id": "71", "name": "g"}, { "id": "72", "name": "h"}, { "id": "73", "name": "i"}, { "id": "74", "name": "j"}, { "id": "75", "name": "k"}, { "id": "76", "name": "l"}, { "id": "77", "name": "m"}, { "id": "78", "name": "n"}, { "id": "79", "name": "o"}, { "id": "80", "name": "p"}, { "id": "81", "name": "q"}, { "id": "82", "name": "r"}, { "id": "83", "name": "s"}, { "id": "84", "name": "t"}, { "id": "85", "name": "u"}, { "id": "86", "name": "v"}, { "id": "87", "name": "w"}, { "id": "88", "name": "x"}, { "id": "89", "name": "y"}, { "id": "90", "name": "z"}, { "id": "91", "name": "Windows Key / Left ⌘"}, { "id": "92", "name": "right window key "}, { "id": "93", "name": "Windows Menu / Right ⌘"}, { "id": "96", "name": "numpad 0 "}, { "id": "97", "name": "numpad 1 "}, { "id": "98", "name": "numpad 2 "}, { "id": "99", "name": "numpad 3 "}, { "id": "100", "name": "numpad 4 "}, { "id": "101", "name": "numpad 5 "}, { "id": "102", "name": "numpad 6 "}, { "id": "103", "name": "numpad 7 "}, { "id": "104", "name": "numpad 8 "}, { "id": "105", "name": "numpad 9 "}, { "id": "106", "name": "multiply "}, { "id": "107", "name": "add"}, { "id": "108", "name": "numpad period (firefox)"}, { "id": "109", "name": "subtract "}, { "id": "110", "name": "decimal point"}, { "id": "111", "name": "divide "}, { "id": "112", "name": "f1 "}, { "id": "113", "name": "f2 "}, { "id": "114", "name": "f3 "}, { "id": "115", "name": "f4 "}, { "id": "116", "name": "f5 "}, { "id": "117", "name": "f6 "}, { "id": "118", "name": "f7 "}, { "id": "119", "name": "f8 "}, { "id": "120", "name": "f9 "}, { "id": "121", "name": "f10"}, { "id": "122", "name": "f11"}, { "id": "123", "name": "f12"}, { "id": "124", "name": "f13"}, { "id": "125", "name": "f14"}, { "id": "126", "name": "f15"}, { "id": "127", "name": "f16"}, { "id": "128", "name": "f17"}, { "id": "129", "name": "f18"}, { "id": "130", "name": "f19"}, { "id": "131", "name": "f20"}, { "id": "132", "name": "f21"}, { "id": "133", "name": "f22"}, { "id": "134", "name": "f23"}, { "id": "135", "name": "f24"}, { "id": "144", "name": "num lock "}, { "id": "145", "name": "scroll lock"}, { "id": "160", "name": "^"}, { "id": "161", "name": '!'}, { "id": "163", "name": "#"}, { "id": "164", "name": '$'}, { "id": "165", "name": 'ù'}, { "id": "166", "name": "page backward"}, { "id": "167", "name": "page forward"}, { "id": "169", "name": "closing paren (AZERTY)"}, { "id": "170", "name": '*'}, { "id": "171", "name": "~ + * key"}, { "id": "173", "name": "minus (firefox), mute/unmute"}, { "id": "174", "name": "decrease volume level"}, { "id": "175", "name": "increase volume level"}, { "id": "176", "name": "next"}, { "id": "177", "name": "previous"}, { "id": "178", "name": "stop"}, { "id": "179", "name": "play/pause"}, { "id": "180", "name": "e-mail"}, { "id": "181", "name": "mute/unmute (firefox)"}, { "id": "182", "name": "decrease volume level (firefox)"}, { "id": "183", "name": "increase volume level (firefox)"}, { "id": "186", "name": "semi-colon / ñ"}, { "id": "187", "name": "equal sign "}, { "id": "188", "name": "comma"}, { "id": "189", "name": "dash "}, { "id": "190", "name": "period "}, { "id": "191", "name": "forward slash / ç"}, { "id": "192", "name": "grave accent / ñ"}, { "id": "193", "name": "?, / or °"}, { "id": "194", "name": "numpad period (chrome)"}, { "id": "219", "name": "open bracket "}, { "id": "220", "name": "back slash "}, { "id": "221", "name": "close bracket "}, { "id": "222", "name": "single quote "}, { "id": "223", "name": "`"}, { "id": "224", "name": "left or right ⌘ key (firefox)"}, { "id": "225", "name": "altgr"}, { "id": "226", "name": "< /git >"}, { "id": "230", "name": "GNOME Compose Key"}, { "id": "233", "name": "XF86Forward"}, { "id": "234", "name": "XF86Back"}, { "id": "255", "name": "toggle touchpad"}
];


$(document).ready(function(){
    (function(){
        for(var x = 0; x < _codes.length; x++){
            $("#keyContainer").append('<div class="keys" id="id_' + _codes[x].id + '">'+ _codes[x].name +'<div>');
            $("#mystyl").append('#id_' + _codes[x].id + ':before{content:"'+_codes[x].id+'"}');
        }
    }());
});