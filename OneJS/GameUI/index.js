Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var BottomDrawer_1 = require("./components/BottomDrawer");
var ModeChange_1 = require("./components/ModeChange");
var App = function () {
    return ((0, preact_1.h)("div", { class: "w-full h-full" },
        (0, preact_1.h)(ModeChange_1.ModeChange, null),
        (0, preact_1.h)(BottomDrawer_1.BottomDrawer, null)));
};
(0, preact_1.render)((0, preact_1.h)(App, null), document.body);
