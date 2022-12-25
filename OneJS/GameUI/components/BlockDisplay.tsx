import { h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import {
  Camera,
  GameObject,
  Quaternion,
  Screen,
  Transform,
  Vector2,
  Vector3,
} from "UnityEngine";
import {
  ScrollerVisibility,
  TextInputBaseField,
  VisualElement,
} from "UnityEngine/UIElements";

export const BlockDisplay = ({ selectBlock, blockObject, selected }) => {
  const [mouseDown, setMouseDown] = useState(false);

  //   useEffect(() => {
  //     let x = (Screen.width / 4) * (index % 4) + Screen.width / 8;
  //     GameObject.Instantiate(
  //       blockObject,
  //       Camera.main.ScreenToWorldPoint(new Vector3(x, Screen.height - 200, -20)),
  //       Quaternion.identity
  //     );
  //   }, []);

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
