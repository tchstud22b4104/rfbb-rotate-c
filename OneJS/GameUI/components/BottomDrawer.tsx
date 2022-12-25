import { h } from "preact";
import { useEffect } from "preact/hooks";
import { useState } from "preact/hooks";
import {
  Component,
  GameObject,
  MeshRenderer,
  PrimitiveType,
} from "UnityEngine";
import { ScrollerVisibility, TextInputBaseField } from "UnityEngine/UIElements";
import { BlockDisplay } from "./BlockDisplay";

export const BottomDrawer = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  var RotateScript = GameObject.Find("Main Camera");

  const setCanScroll = (bool) => {
    RotateScript.GetComponents(Component)[3].uiFocused = !bool;
  };

  useEffect(() => {
    setCanScroll(!expanded);
  }, [expanded]);

  var blockSelector = require("blockSelector");
  const selectBlock = (index) => {
    setExpanded(false);
    blockSelector.setBlockIndex(index);
  };

  return (
    <div
      style={{ height: expanded ? "85%" : "12%" }}
      class="w-full absolute bottom-0 transition-[all] ease-out duration-[0.25]"
    >
      <div
        onClick={() => setExpanded(!expanded)}
        class="absolute -top-20 h-full w-full"
      >
        <div
          style={{ height: expanded ? "6%" : "42%", width: "50%" }}
          class="rounded-2xl bg-white mx-auto opacity-80"
        >
          <div class="text-gray-800 text-xl mt-[6%] ml-2">Search...</div>
        </div>
      </div>
      <div class="bg-white h-full rounded-t-2xl opacity-40"></div>
      <div class="absolute top-0 w-full h-full">
        <scrollview vertical-scroller-visibility={ScrollerVisibility.Hidden}>
          <div class="flex-row justify-center pt-1 flex-wrap h-full">
            {blockSelector.blocksList.map((num, index) => {
              if (expanded) {
                return (
                  <BlockDisplay
                    selectBlock={() => {
                      selectBlock(index);
                      setSelectedIndex(0);
                    }}
                    blockObject={blockSelector.blocksList[index]}
                    selected={index == selectedIndex}
                  />
                );
              } else {
                if (index < 4) {
                  return (
                    <BlockDisplay
                      selectBlock={() => {
                        selectBlock(index);
                        setSelectedIndex(index);
                      }}
                      blockObject={blockSelector.blocksList[index]}
                      selected={index == selectedIndex}
                    />
                  );
                }
              }
            })}
          </div>
        </scrollview>
      </div>
    </div>
  );
};
