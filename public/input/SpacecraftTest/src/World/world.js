import { createCamera } from './components/camera.js';
// import { createMeshGroup } from './components/meshGroup.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { loadBirds } from './components/birds/birds.js';
import { loadSpaceship } from './components/spaceship/spaceship.js';
import { VolumetricFire } from './components/spaceship/fire.js';
import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js';

import { Train } from './components/Train/Train.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createControls } from './systems/controls.js';
import { terrainMesh } from './components/spaceship/terrain.js';
// import { SkeletonUtils } from 'https://cdn.jsdelivr.net/npm/three@v0.103.0/examples/js/utils/SkeletonUtils.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let controls;
let renderer;
let scene;
let loop;
let train;
let train2;

class World {
  constructor(container) {

    // set path to texture images
    // either relative or absolute path
    VolumetricFire.texturePath = './assets/texture/';

    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer)
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    // train = new Train();



    //    for (let i=0; i<40; i+=4) {
    //        //clone train
    //      train2 = train.clone();
    //    train2.position.z = (i);
    //    train2.position.x = (i);
    //    train2.position.y = (i);

    //    scene.add(ambientLight, mainLight, train, train2);

    //    loop.updatables.push(controls, train2);
    // }



    loop.updatables.push(controls); //you can add train to here

    const terrainMeshValue = terrainMesh();

    scene.add(ambientLight, mainLight, terrainMeshValue); //you can add train to here

    // const meshGroup = createMeshGroup();


    // loop.updatables.push(controls, meshGroup);


    // scene.add(ambientLight, mainLight, meshGroup);
    // cube.position.y = 1;



    const resizer = new Resizer(container, camera, renderer);

    //   add the helpers to the scene
    scene.add(createAxesHelper(), createGridHelper());


  }

  async init() {
    const { spacecraft, spacecraft2, spacecraft2a, spacecraft3, spacecraft3a, shuttle } = await loadSpaceship();

    
    // Fire config
    var fireWidth = 350;
    var fireHeight = 350;
    var fireDepth = 350;
    var sliceSpacing = 0.5;

    var fire = new VolumetricFire(
      fireWidth,
      fireHeight,
      fireDepth,
      sliceSpacing,
      camera
    );

    // move the target to the center of the front bird
    loop.updatables.push(fire);
    

    

    // you can set position, rotation and scale
    // fire.mesh accepts THREE.mesh features
    fire.mesh.position.set(3500, 1200, - 800);
    fire.mesh.scale.y = (4);
    
    const fireMesh2 = fire.mesh.clone(fire.mesh);
    fireMesh2.position.set(3500, 1000, - 500);
    const fireMesh3 = fire.mesh.clone(fire.mesh);
    fireMesh3.position.set(4800, 1000, -1300);
    const fireMesh4 = fire.mesh.clone(fire.mesh);
    fireMesh4.position.set(4300, 1000, - 3100);
    const fireMesh5 = fire.mesh.clone(fire.mesh);
    fireMesh5.position.set(4000, 1000, - 2700);
    const fireMesh6 = fire.mesh.clone(fire.mesh);
    fireMesh6.position.set(2800, 1000, -2500);
    const fireMesh7 = fire.mesh.clone(fire.mesh);
    fireMesh7.position.set(2250, 1000, 500);
    const fireMesh8 = fire.mesh.clone(fire.mesh);
    fireMesh8.position.set(2350, 1000, - 100);
    const fireMesh9 = fire.mesh.clone(fire.mesh);
    fireMesh9.position.set(4000, 900, -1500);
    const fireMesh10 = fire.mesh.clone(fire.mesh);
    fireMesh10.position.set(3750, 1200, -1900);
    
    
    controls.target.copy(fireMesh2.position);
    scene.add(spacecraft, spacecraft2, spacecraft2a, spacecraft3, spacecraft3a, shuttle, fire.mesh, fireMesh2, fireMesh3, fireMesh4, fireMesh5, fireMesh6, fireMesh7, fireMesh8,fireMesh9,fireMesh10 );
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}


export { World };