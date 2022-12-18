Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomDrawer = void 0;
var preact_1 = require("preact");
var BottomDrawer = function () {
    return ((0, preact_1.h)("div", { class: "w-full h-6 absolute bottom-0" },
        (0, preact_1.h)("div", { class: "bg-white h-full rounded-t-lg opacity-40" }),
        (0, preact_1.h)("div", { class: "absolute top-0 w-full h-full" },
            (0, preact_1.h)("div", { class: "flex items-center justify-center text-xs" }, "swipe up"))));
};
exports.BottomDrawer = BottomDrawer;
