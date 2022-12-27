import { h, render } from "preact";
import { BottomDrawer } from "./components/BottomDrawer";
import { Focusable } from "UnityEngine/UIElements";
import { ModeChange } from "./components/ModeChange";

const App = () => {
  return (
    <div class="w-full h-full">
      <ModeChange />
      <BottomDrawer />
    </div>
  );
};

render(<App />, document.body);
