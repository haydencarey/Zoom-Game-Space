import { Color, Scene } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createScene() {
    const scene = new Scene();
  
    scene.background = new Color( 0xefd1b5 );
        scene.fog = new THREE.FogExp2( 0xefd1b5, 0.00025 );
    // scene.background = new Color('blue');
  
    return scene;
  }
  

export { createScene };