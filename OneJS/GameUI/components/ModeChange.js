Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeChange = void 0;
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var UnityEngine_1 = require("UnityEngine");
var ModeChange = function () {
    var _a = (0, hooks_1.useState)(true), buildingMode = _a[0], setBuildingMove = _a[1];
    var ImageStore = UnityEngine_1.GameObject.Find("ImageStore").GetComponents(UnityEngine_1.Component)[1];
    var BuildSystem = UnityEngine_1.GameObject.Find("Build").GetComponents(UnityEngine_1.Component)[1];
    (0, hooks_1.useEffect)(function () {
        BuildSystem.buildMode = buildingMode;
    }, [buildingMode]);
    return ((0, preact_1.h)("div", { style: { backgroundColor: buildingMode ? "red" : "green" }, onClick: function () {
            setBuildingMove(!buildingMode);
        }, class: "absolute left-0 bottom-[42%] opacity-90 h-72 w-16 rounded-r-2xl" },
        (0, preact_1.h)("div", { class: "flex-col justify-center h-full" },
            (0, preact_1.h)("image", { image: buildingMode
                    ? ImageStore.getImageByName("destroy")
                    : ImageStore.getImageByName("build") }))));
};
exports.ModeChange = ModeChange;
