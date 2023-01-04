Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDisplay = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var BlockDisplay = function (_a) {
    var selectBlock = _a.selectBlock, blockObject = _a.blockObject, selected = _a.selected;
    var _b = (0, hooks_1.useState)(false), mouseDown = _b[0], setMouseDown = _b[1];
    var _c = (0, hooks_1.useState)(false), showText = _c[0], setShowText = _c[1];
    var blockTexture = blockObject.getImage();
    return ((0, preact_1.h)("div", { class: "rounded-2xl mx-[10px] mt-2 mb-2 transition-[all] ease-out duration-[0.25]", style: {
            opacity: selected ? 1 : 0.8,
            width: "20%",
            height: "110px",
            backgroundColor: "white",
        }, onClick: function () { return selectBlock(); }, onMouseDown: function () {
            setMouseDown(true);
            setShowText(true);
        }, onMouseUp: function () {
            setMouseDown(false);
            setShowText(false);
        } },
        (0, preact_1.h)("div", { class: "flex-col items-center justify-center w-full h-full" },
            (0, preact_1.h)("div", { class: "scale-[10]" },
                (0, preact_1.h)("image", { image: blockTexture })))));
};
exports.BlockDisplay = BlockDisplay;
