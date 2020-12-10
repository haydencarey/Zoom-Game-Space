import { PerspectiveCamera } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createCamera() {
    /*
    const camera = new PerspectiveCamera(
        35, // fov = Field Of View
        1, // aspect ratio (dummy value)
        0.1, // near clipping plane
        100, // far clipping plane
    );

    // move the camera back so we can view the scene
    camera.position.set(-1.5, 1.5, 6.5);

    */


    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 7000, 3500, - 800 );
    // camera.rotation.x= 90 * Math.PI / 95
   
    
    camera.lookAt( - 100, 810, - 800 );

    return camera;
}

export { createCamera };