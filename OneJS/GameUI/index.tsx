import { h, render } from "preact"
import { BottomDrawer } from "./components/BottomDrawer"
import { Focusable } from "UnityEngine/UIElements"

const App = () => {
    return (
        <BottomDrawer />
    )
}

render(<App />, document.body)