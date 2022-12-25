Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDisplay = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var BlockDisplay = function (_a) {
    var selectBlock = _a.selectBlock, blockObject = _a.blockObject, selected = _a.selected;
    var _b = (0, hooks_1.useState)(false), mouseDown = _b[0], setMouseDown = _b[1];
    return ((0, preact_1.h)("div", { class: "rounded-2xl mx-[10px] mt-2 mb-2 transition-[all] ease-out duration-[0.25]", style: {
            opacity: mouseDown ? 0.7 : 1,
            width: "20%",
            height: "90px",
            backgroundColor: selected ? "#FF0000" : "#0000FF",
        }, onClick: function () { return selectBlock(); }, onMouseDown: function () {
            setMouseDown(true);
        }, onMouseUp: function () {
            setMouseDown(false);
        } },
        (0, preact_1.h)("image", { image: blockObject.getImage() })));
};
exports.BlockDisplay = BlockDisplay;
