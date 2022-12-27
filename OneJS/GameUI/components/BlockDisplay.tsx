import { h } from "preact";
import { useState } from "preact/hooks";

export const BlockDisplay = ({ selectBlock, blockObject, selected }) => {
  const [mouseDown, setMouseDown] = useState(false);

  return (
    <div
      class="rounded-2xl mx-[10px] mt-2 mb-2 transition-[all] ease-out duration-[0.25]"
      style={{
        opacity: mouseDown ? 0.7 : 1,
        width: "20%",
        height: "90px",
        backgroundColor: selected ? "#FF0000" : "#0000FF",
      }}
      onClick={() => selectBlock()}
      onMouseDown={() => {
        setMouseDown(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
    >
      <image image={blockObject.getImage()} />
    </div>
  );
};
