// // import * as THREE from './vendor/three/build/three.module.js';

// //accessing classes from the core under the THREE namespace
// // THREE.PerspectiveCamera
// // THREE.MeshStandardMaterial
// // THREE.Texture
// // ... and hundreds more

// import {
//     BoxBufferGeometry,
//     Color,
//     Mesh,
//     MeshBasicMaterial,
//     PerspectiveCamera,
//     Scene,
//     WebGLRenderer,
// } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

// // Get a reference to the container element that will hold our scene
// const container = document.getElementById('scene-container');

// // create a Scene
// const scene = new Scene();

// // Set the background color
// scene.background = new Color('skyblue');

// // Create a camera
// const fov = 35; // AKA Field of View
// const aspect = container.clientWidth / container.clientHeight;
// const near = 0.1; // the near clipping plane
// const far = 100; // the far clipping plane

// const camera = new PerspectiveCamera(fov, aspect, near, far);

// // every object is initially created at ( 0, 0, 0 )
// // move the camera back so we can view the scene
// // camera.position.x = 0;
// // camera.position.y = 0;
// // camera.position.z = 10;
// camera.position.set(0, 0, 10);

// // create a geometry
// const geometry = new BoxBufferGeometry(2, 2, 2);

// // create a default (white) Basic material
// const material = new MeshBasicMaterial();

// // create a Mesh containing the geometry and material
// const cube = new Mesh(geometry, material);

// // add the mesh to the scene
// scene.add(cube);

// // create the renderer
// const renderer = new WebGLRenderer();

// // next, set the renderer to the same size as our container element
// renderer.setSize(container.clientWidth, container.clientHeight);

// // finally, set the pixel ratio so that our scene will look good on HiDPI displays
// renderer.setPixelRatio(window.devicePixelRatio);

// // add the automatically created <canvas> element to the page
// container.append(renderer.domElement);

// // render, or 'create a still image', of the scene
// renderer.render(scene, camera);