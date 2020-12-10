import { GLTFLoader } from 'https://unpkg.com/three@0.117.0/examples/jsm/loaders/GLTFLoader.js'

import { setupModel } from './setupModel.js';

async function loadSpaceship() {
    const loader = new GLTFLoader();
  
    const [spacecraftData, spacecraft2Data, spacecraft3Data, shuttleData ] = await Promise.all([
      loader.loadAsync('./assets/models/spacecraft/spacecraft.gltf'),
      loader.loadAsync('./assets/models/spacecraft/spacecraft2.gltf'),
      loader.loadAsync('./assets/models/spacecraft/spacecraft3.gltf'),
      loader.loadAsync('./assets/models/spacecraft/shuttle.gltf'),
    ]);
  
    console.log('Squaaawk!');
  
    const spacecraft = setupModel(spacecraftData);
    // spacecraft.position.set(0, 0, 2.5);
    spacecraft.position.set(3500, 700, - 800);
    spacecraft.scale.set(350,350,350);
    spacecraft.rotation.y= 90 * Math.PI / 76
    spacecraft.rotation.x= 90 * Math.PI / 100
    // console.log(spacecraft);

    const spacecraft3 = setupModel(spacecraft3Data);
    // spacecraft.position.set(0, 0, 2.5);
    spacecraft3.position.set(4300, 650, - 3100);
    spacecraft3.scale.set(350,350,350);
    spacecraft3.rotation.y= 180 * Math.PI / 76
    spacecraft3.rotation.x= 180 * Math.PI / 100
    // console.log(spacecraft3);

    const spacecraft3a = spacecraft3.clone();
    spacecraft3a.position.set(2250, 600, 500);
    spacecraft3a.scale.set(350,350,350);
    spacecraft3a.rotation.y=   Math.PI / 90
    spacecraft3a.rotation.x=   Math.PI / 70


    const spacecraft2 = setupModel(spacecraft2Data);
    spacecraft2.position.set(4800, 700, -1300);
    spacecraft2.rotation.y= 90 * Math.PI / 90
    spacecraft2.rotation.x= 90 * Math.PI / -125
    spacecraft2.scale.set(5, 5, 5);
  

    const spacecraft2a = spacecraft2.clone();
    spacecraft2a.position.set(2800, 500, -2500);
    spacecraft2a.rotation.y= 270 * Math.PI / 90
    spacecraft2a.rotation.x= 360 * Math.PI / -125
    spacecraft2a.scale.set(5, 5, 5);
    // const flamingo = setupModel(flamingoData);
    // flamingo.position.set(7.5, 0, -10);
  
    // const stork = setupModel(storkData);
    // stork.position.set(0, -2.5, -10);

    const shuttle = setupModel(shuttleData);
    // spacecraft.position.set(0, 0, 2.5);
    shuttle.position.set(2250, 600, 500);
    shuttle.scale.set(100000,100000,100000);
    shuttle.rotation.y= 90 * Math.PI / 76
    shuttle.rotation.x= 90 * Math.PI / 100
    console.log(shuttle);
  
    return {
      spacecraft,
      spacecraft2,
      spacecraft3,
      spacecraft2a,
      spacecraft3a,
      shuttle
    };
  }
  
  

export { loadSpaceship };