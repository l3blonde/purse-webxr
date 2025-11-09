# WebXR Purse VR - Frontend Assignment

## Assignment Details

Live Demo: https://purse-webxr.vercel.app
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

**1. Open the web link**
Test 3D model, live version here:  https://purse-webxr.vercel.app
Use your mouse to drag and rotate the bag around or use the keyboard controls to move the camera.
You can see the purse from all angles in full 3D.
You can rotate it around with your mouse or keyboard to see it from every angle.
The 3D model has all its textures and materials embedded so it looks proper.

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

Testing needs real hardware which is pretty standard in VR development.

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
