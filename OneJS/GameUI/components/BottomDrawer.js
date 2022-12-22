Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomDrawer = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var hooks_2 = require("preact/hooks");
var UnityEngine_1 = require("UnityEngine");
var UIElements_1 = require("UnityEngine/UIElements");
var BottomDrawer = function () {
    var _a = (0, hooks_2.useState)(false), expanded = _a[0], setExpanded = _a[1];
    var data = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        4, 5, 6, 7, 8, 9, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 30, 1, 2,
        3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 30,
    ];
    var RotateScript = UnityEngine_1.GameObject.Find("Main Camera");
    var setCanScroll = function (bool) {
        RotateScript.GetComponents(UnityEngine_1.Component)[3].canRotate = bool;
    };
    (0, hooks_1.useEffect)(function () {
        setCanScroll(!expanded);
    }, [expanded]);
    return ((0, preact_1.h)("div", { style: { height: expanded ? 200 : 36 }, class: "w-full absolute bottom-0 transition-[all] ease-out duration-[0.25]" },
        (0, preact_1.h)("div", { onClick: function () { return setExpanded(!expanded); }, class: "absolute -top-5 w-full" },
            (0, preact_1.h)("div", { style: { height: 14, width: 74 }, class: "rounded-lg bg-white mx-auto opacity-80" },
                (0, preact_1.h)("div", { class: "text-gray-400 font-thin mt-[2px] ml-1", style: { fontSize: 8 } }, "Search..."))),
        (0, preact_1.h)("div", { class: "bg-white h-full rounded-t-lg opacity-40" }),
        (0, preact_1.h)("div", { class: "absolute top-0 w-full h-full" },
            (0, preact_1.h)("scrollview", { "vertical-scroller-visibility": UIElements_1.ScrollerVisibility.Hidden },
                (0, preact_1.h)("div", { class: "flex-row justify-center pt-1 flex-wrap" }, data.map(function (num, index) {
                    if (expanded) {
                        return ((0, preact_1.h)("div", { class: "w-7 h-7 rounded-lg bg-gray-500 mx-1 mb-2", onClick: function () { return setExpanded(false); } }));
                    }
                    else {
                        if (index < 4) {
                            return ((0, preact_1.h)("div", { class: "w-7 h-7 rounded-lg bg-gray-500 mx-1", onClick: function () { return setExpanded(false); } }));
                        }
                    }
                }))))));
};
exports.BottomDrawer = BottomDrawer;
