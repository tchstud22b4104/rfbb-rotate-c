import { h } from "preact"
import { useState } from "preact/hooks"
import { Component, GameObject } from "UnityEngine";

export const BottomDrawer = () => {
    const [expanded, setExpanded] = useState(false);

    let data = [1,2,3,4,5,6,7,8,9,4,5,6,7,8,9,30,1,2,3,4,5,6,7,8,9,4,5,6,7,8,9,30];

    var RotateScript = GameObject.Find("Main Camera");
    
    const setCanScroll = (bool) => {
        RotateScript.GetComponents(Component)[3].canRotate = bool;
    }

    return (

        <div style={{height: expanded ? 200 : 36}}  class="w-full absolute bottom-0">
        <div onClick={() => setExpanded(!expanded)} class="absolute -top-5 w-full"><div style={{height: 14, width: 74}} class="rounded-lg bg-white mx-auto"><textfield></textfield></div></div>
        <div class="bg-white h-full rounded-t-lg opacity-40"></div>
        <div class="absolute top-0 w-full h-full">
          
          <scrollview>
            <div class="flex-row justify-center pt-1 flex-wrap">
                {data.map((num, index) => {
                    if (expanded){
                        return <div class="w-7 h-7 rounded-lg bg-gray-500 mx-1 mb-2" onClick={() => setExpanded(false)}></div>
                    } else {
                        if (index < 4){
                            return <div class="w-7 h-7 rounded-lg bg-gray-500 mx-1" onClick={() => setExpanded(false)}></div>
                        }
                    }
                })}
            </div>
            </scrollview>
        </div>
        </div>
      
    )
}