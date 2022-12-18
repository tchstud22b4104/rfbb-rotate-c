import { h } from "preact"

export const BottomDrawer = () => {
    return (
        <div class="w-full h-6 absolute bottom-0">
        <div class="bg-white h-full rounded-t-lg opacity-40"></div>
        <div class="absolute top-0 w-full h-full">
            <div class="flex items-center justify-center text-xs">swipe up</div>
        </div>
        </div>
    )
}