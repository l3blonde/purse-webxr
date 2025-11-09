"use client"

export default function ControlsInfo() {
    return (
        <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg text-sm max-w-xs z-10">
            <h3 className="font-bold mb-2">Desktop Controls:</h3>
            <ul className="space-y-1">
                <li>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">W/S</kbd> Move Forward/Back
                </li>
                <li>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">A/D</kbd> Move Left/Right
                </li>
                <li>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">Q/E</kbd> Move Up/Down
                </li>
                <li>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">R</kbd> Rotate
                </li>
                <li>
                    <kbd className="px-2 py-1 bg-gray-700 rounded">Drag</kbd> Rotate with Mouse/Touchpad
                </li>
            </ul>
            <p className="mt-3 text-xs text-green-400 font-semibold">Ready! Use keyboard or drag to control the purse.</p>
        </div>
    )
}
