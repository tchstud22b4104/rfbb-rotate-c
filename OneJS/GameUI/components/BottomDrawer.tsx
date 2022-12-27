import { h } from "preact";
import { useEffect } from "preact/hooks";
import { useState } from "preact/hooks";
import { Component, GameObject, Texture2D } from "UnityEngine";
import { PickingMode, ScrollerVisibility } from "UnityEngine/UIElements";
import { BlockDisplay } from "./BlockDisplay";

export const BottomDrawer = () => {
  const placeholderSearch = "Search...";

  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [searchValue, setSearchValue] = useState(placeholderSearch);

  var RotateScript = GameObject.Find("Main Camera");

  var ImageStore = GameObject.Find("ImageStore").GetComponents(Component)[1];

  const setCanScroll = (bool) => {
    RotateScript.GetComponents(Component)[3].uiFocused = !bool;
  };

  useEffect(() => {
    setCanScroll(!expanded);
  }, [expanded]);

  var blockSelector = require("blockSelector");
  const selectBlock = (block) => {
    setExpanded(false);
    let newIndex = blockSelector.setBlock(block);
    setSelectedIndex(newIndex);
    setSearchValue(placeholderSearch);
  };

  useEffect(() => {
    document.addRuntimeUSS(
      "TextField > TextInput {background-color: white; border-width: 0; opacity: 0.7; padding-right: 48;} "
    );
  }, []);

  return (
    <div
      style={{ height: expanded ? "85%" : "12%" }}
      class="w-full absolute bottom-0 transition-[all] ease-out duration-[0.25]"
    >
      <div
        onClick={() => setExpanded(!expanded)}
        class="absolute -top-20 h-full w-full "
      >
        <div
          style={{ height: expanded ? "6%" : "42%", width: "50%" }}
          class="rounded-2xl mx-auto relative"
        >
          <textfield
            style={{
              height: "100%",
              borderRadius: 24,
              fontSize: 24,
            }}
            onValueChanged={(e) => setSearchValue(e.newValue)}
            value={searchValue}
            onFocusOut={() => {
              if (searchValue == "") {
                setSearchValue(placeholderSearch);
              }
            }}
            onFocusIn={() => {
              if (searchValue == placeholderSearch) {
                setSearchValue("");
              }
            }}
            onClick={() => {
              setExpanded(true);
            }}
          />
          <image
            onClick={(e) => {
              log(searchValue);
              setExpanded(true);
            }}
            class="absolute bottom-3 right-5 h-8 w-8"
            image={ImageStore.getImageByIndex(0)}
          />
        </div>
      </div>
      <div class="bg-white h-full rounded-t-2xl opacity-40"></div>
      <div class="absolute top-0 w-full h-full">
        <scrollview vertical-scroller-visibility={ScrollerVisibility.Hidden}>
          <div class="flex-row justify-center pt-1 flex-wrap h-full">
            {blockSelector.blocksList
              .filter((block) =>
                block
                  .getGameObject()
                  .name.toLowerCase()
                  .includes(
                    searchValue == placeholderSearch
                      ? ""
                      : searchValue.toLowerCase()
                  )
              )
              .map((blockObject, index) => {
                if (expanded) {
                  return (
                    <BlockDisplay
                      selectBlock={() => {
                        selectBlock(blockObject);
                        // setSelectedIndex(0);
                      }}
                      blockObject={blockObject}
                      selected={blockSelector.currentBlock == blockObject}
                    />
                  );
                } else {
                  if (index < 4) {
                    return (
                      <BlockDisplay
                        selectBlock={() => {
                          selectBlock(blockObject);
                          // setSelectedIndex(index);
                        }}
                        blockObject={blockObject}
                        selected={blockSelector.currentBlock == blockObject}
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
