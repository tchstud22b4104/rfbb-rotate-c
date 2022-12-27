import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Component, GameObject } from "UnityEngine";

export const ModeChange = () => {
  const [buildingMode, setBuildingMove] = useState(true);

  var ImageStore = GameObject.Find("ImageStore").GetComponents(Component)[1];
  var BuildSystem = GameObject.Find("Build").GetComponents(Component)[1];

  useEffect(() => {
    BuildSystem.buildMode = buildingMode;
  }, [buildingMode]);

  return (
    <div
      style={{ backgroundColor: buildingMode ? "red" : "green" }}
      onClick={() => {
        setBuildingMove(!buildingMode);
      }}
      class="absolute left-0 bottom-[42%] opacity-90 h-72 w-16 rounded-r-2xl"
    >
      <div class="flex-col justify-center h-full">
        <image
          image={
            buildingMode
              ? ImageStore.getImageByName("destroy")
              : ImageStore.getImageByName("build")
          }
        />
      </div>
    </div>
  );
};
