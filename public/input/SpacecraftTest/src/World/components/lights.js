import { AmbientLight, DirectionalLight, HemisphereLight, SpotLight } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createLights() {
// const AmbientLight = new AmbientLight('white', 2);

const ambientLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    5, // intensity
  );


    // Create a directional light
    const mainLight = new DirectionalLight('white', 4);



    // move the light right, up, and towards us
    mainLight.position.set(10, 10, 10);

    return { ambientLight, mainLight };
}

export { createLights };