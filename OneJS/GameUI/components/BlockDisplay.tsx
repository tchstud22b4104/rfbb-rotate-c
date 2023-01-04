import { h } from "preact";
import { useState } from "preact/hooks";
import { Texture } from "UnityEngine";
import { Image } from "UnityEngine/UIElements";

export const BlockDisplay = ({ selectBlock, blockObject, selected }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [showText, setShowText] = useState(false);

  const blockTexture = blockObject.getImage();

  return (
    <div
      class="rounded-2xl mx-[10px] mt-2 mb-2 transition-[all] ease-out duration-[0.25]"
      style={{
        opacity: selected ? 1 : 0.8,
        width: "20%",
        height: "110px",
        backgroundColor: "white",
      }}
      onClick={() => selectBlock()}
      onMouseDown={() => {
        setMouseDown(true);
        setShowText(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
        setShowText(false);
      }}
    >
      <div class="flex-col items-center justify-center w-full h-full">
        <div class="scale-[10]">
          <image image={blockTexture} />
        </div>
      </div>
    </div>
  );
};
