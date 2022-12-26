Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomDrawer = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var hooks_2 = require("preact/hooks");
var UnityEngine_1 = require("UnityEngine");
var UIElements_1 = require("UnityEngine/UIElements");
var BlockDisplay_1 = require("./BlockDisplay");
var BottomDrawer = function () {
    var placeholderSearch = "Search...";
    var _a = (0, hooks_2.useState)(false), expanded = _a[0], setExpanded = _a[1];
    var _b = (0, hooks_2.useState)(0), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = (0, hooks_2.useState)(placeholderSearch), searchValue = _c[0], setSearchValue = _c[1];
    var RotateScript = UnityEngine_1.GameObject.Find("Main Camera");
    var ImageStore = UnityEngine_1.GameObject.Find("ImageStore").GetComponents(UnityEngine_1.Component)[1];
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
    (0, hooks_1.useEffect)(function () {
        document.addRuntimeUSS("TextField > TextInput {background-color: white; border-width: 0; opacity: 0.7; padding-right: 48;} ");
    }, []);
    return ((0, preact_1.h)("div", { style: { height: expanded ? "85%" : "12%" }, class: "w-full absolute bottom-0 transition-[all] ease-out duration-[0.25]" },
        (0, preact_1.h)("div", { onClick: function () { return setExpanded(!expanded); }, class: "absolute -top-20 h-full w-full " },
            (0, preact_1.h)("div", { style: { height: expanded ? "6%" : "42%", width: "50%" }, class: "rounded-2xl mx-auto relative" },
                (0, preact_1.h)("textfield", { style: {
                        height: "100%",
                        borderRadius: 24,
                        fontSize: 24,
                    }, onValueChanged: function (e) { return setSearchValue(e.newValue); }, value: searchValue, onFocusOut: function () {
                        if (searchValue == "") {
                            setSearchValue(placeholderSearch);
                        }
                    }, onFocusIn: function () {
                        if (searchValue == placeholderSearch) {
                            setSearchValue("");
                        }
                    } }),
                (0, preact_1.h)("image", { onClick: function (e) {
                        log(searchValue);
                        setExpanded(true);
                    }, class: "absolute bottom-3 right-5 h-8 w-8", image: ImageStore.getImageByIndex(0) }))),
        (0, preact_1.h)("div", { class: "bg-white h-full rounded-t-2xl opacity-40" }),
        (0, preact_1.h)("div", { class: "absolute top-0 w-full h-full" },
            (0, preact_1.h)("scrollview", { "vertical-scroller-visibility": UIElements_1.ScrollerVisibility.Hidden },
                (0, preact_1.h)("div", { class: "flex-row justify-center pt-1 flex-wrap h-full" }, blockSelector.blocksList.map(function (num, index) {
                    if (expanded) {
                        return ((0, preact_1.h)(BlockDisplay_1.BlockDisplay, { selectBlock: function () {
                                selectBlock(index);
                                setSelectedIndex(0);
                            }, blockObject: blockSelector.blocksList[index], selected: index == selectedIndex }));
                    }
                    else {
                        if (index < 4) {
                            return ((0, preact_1.h)(BlockDisplay_1.BlockDisplay, { selectBlock: function () {
                                    selectBlock(index);
                                    setSelectedIndex(index);
                                }, blockObject: blockSelector.blocksList[index], selected: index == selectedIndex }));
                        }
                    }
                }))))));
};
exports.BottomDrawer = BottomDrawer;
