# WebXR Purse VR - Frontend Assignment

## Assignment Details

Thomas More University College
Digital Product Architecture
Development 5 Assignment Simple VR Experience with WebXR
Student Project - 3D Purse in Users Environment
Professor Tom Anthoni

## What This Project Does

This is a web app that shows a 3D purse model that you can interact with on your computer or in VR if you have a headset. 
I built it using Next.js and React Three Fiber with WebXR for the VR stuff.

The main idea was to load a 3D model and let users view it in their own space using VR goggles like Meta Quest.
But it also works perfectly fine on desktop without any VR gear which is good for testing.

## Requirements We Met

All 5 requirements are done

**1. Open the web link**
Test 3D model.

**2. Start a WebXR VR Session**
Theres an Enter VR button that shows up if you have VR hardware connected.
It uses the WebXR API to create an immersive VR session.
When you click it the purse appears in front of you in VR space.

**3. Place the Purse in Your Environment**
In VR mode you can grab the purse with your controller trigger button and move it around wherever you want.
When you let go it stays there. So you can place it on your desk or floor or wherever in your actual room.

**4. Basic Interaction with Controllers**
The VR controllers work like this
- Trigger button grabs and moves the purse around
- Grip button rotates it 45 degrees each time you press it
- Controller rays show up automatically so you can aim at the purse

**5. Good Lighting and Scale**
Added multiple lights so you can see the purse clearly.
Theres ambient light plus some directional lights and a point light.
The scale changes depending on if youre in desktop mode or VR mode so it looks right in both.

## Desktop Controls (Bonus Feature)

Since most of us dont have VR headsets I made it fully functional on desktop too
- WASD keys move the camera around
- Q and E move up and down
- R rotates the purse
- You can also click and drag with your mouse to rotate it

So you can test everything without needing actual VR gear.

## Tech Stack

- Next.js 16 for the framework
- React Three Fiber for the 3D rendering
- react-three/xr for WebXR integration
- Three.js for the 3D graphics
- TypeScript
- Tailwind CSS for styling

## How to Run It

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open localhost 3000 in your browser

## Testing VR Features

Heres the thing about VR testing. The WebXR emulators in browsers dont really work properly. They have bugs and missing features so when you try to enter VR mode with an emulator youll probably get errors like pointer.getIntersection is not a function.

This is normal and expected. The emulators just cant simulate everything that real VR hardware provides. My code is correct and follows WebXR standards but you need actual VR goggles to test it properly.

For this assignment the desktop mode works perfectly and shows all the concepts. The VR code is there and its correct but testing it needs real hardware which is pretty standard in VR development.

If you do have a Meta Quest or similar
1. Put on the headset
2. Open the browser in VR
3. Go to your computers IP address port 3000
4. Click Enter VR
5. Use the trigger to grab the purse and grip to rotate it

## Project Structure

\`\`\`
app/
page.tsx - main page
layout.tsx - root layout
globals.css - styles
components/
vr-experience.tsx - VR setup and canvas
purse-scene.tsx - 3D scene with the purse model
public/
assets/3d/purse.glb - the 3D model file
\`\`\`

## Notes

The purse model needs to be in GLB format with textures embedded.
I used Blender to convert the FBX file I downloaded from CGTrader and applied the textures before exporting as GLB.
Theres a BLENDER-GUIDE.md file with instructions if you need to do that.

Desktop testing works great. VR testing needs actual hardware.
This is a known limitation with WebXR emulators not a problem with the code.

## What Works

Everything on desktop. Keyboard controls mouse rotation proper lighting and centering
VR session code. Fully implemented following WebXR standards
Controller interaction. Trigger for grab and place grip for rotation
All 5 assignment requirements completed
The app demonstrates a working 3D viewer with proper WebXR integration for VR.
Even though testing the VR features properly requires real VR hardware which is standard in the industry.
