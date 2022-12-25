Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomDrawer = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var hooks_2 = require("preact/hooks");
var UnityEngine_1 = require("UnityEngine");
var UIElements_1 = require("UnityEngine/UIElements");
var BlockDisplay_1 = require("./BlockDisplay");
var BottomDrawer = function () {
    var _a = (0, hooks_2.useState)(false), expanded = _a[0], setExpanded = _a[1];
    var RotateScript = UnityEngine_1.GameObject.Find("Main Camera");
    var setCanScroll = function (bool) {
        RotateScript.GetComponents(UnityEngine_1.Component)[3].uiFocused = !bool;
    };
    (0, hooks_1.useEffect)(function () {
        setCanScroll(!expanded);
    }, [expanded]);
    var blockSelector = require("blockSelector");
    var selectBlock = function (index) {
        setExpanded(false);
        blockSelector.setBlockIndex(index);
    };
    return ((0, preact_1.h)("div", { style: { height: expanded ? "85%" : "12%" }, class: "w-full absolute bottom-0 transition-[all] ease-out duration-[0.25]" },
        (0, preact_1.h)("div", { onClick: function () { return setExpanded(!expanded); }, class: "absolute -top-20 h-full w-full" },
            (0, preact_1.h)("div", { style: { height: expanded ? "6%" : "42%", width: "50%" }, class: "rounded-2xl bg-white mx-auto opacity-80" },
                (0, preact_1.h)("div", { class: "text-gray-800 text-xl mt-[6%] ml-2" }, "Search..."))),
        (0, preact_1.h)("div", { class: "bg-white h-full rounded-t-2xl opacity-40" }),
        (0, preact_1.h)("div", { class: "absolute top-0 w-full h-full" },
            (0, preact_1.h)("scrollview", { "vertical-scroller-visibility": UIElements_1.ScrollerVisibility.Hidden },
                (0, preact_1.h)("div", { class: "flex-row justify-center pt-1 flex-wrap h-full" }, blockSelector.blocksList.map(function (num, index) {
                    if (expanded) {
                        return ((0, preact_1.h)(BlockDisplay_1.BlockDisplay, { selectBlock: function () { return selectBlock(index); }, blockObject: blockSelector.blocksList[index], index: index }));
                    }
                    else {
                        if (index < 4) {
                            return ((0, preact_1.h)(BlockDisplay_1.BlockDisplay, { selectBlock: function () { return selectBlock(index); }, blockObject: blockSelector.blocksList[index], index: index }));
                        }
                    }
                }))))));
};
exports.BottomDrawer = BottomDrawer;
