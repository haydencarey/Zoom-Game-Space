import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import Stats from 'https://unpkg.com/three@0.117.0/examples/jsm/libs/stats.module.js';

import { FlyControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/FlyControls.js';
import { OrbitControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/RenderPass.js';
import { FilmPass } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/FilmPass.js';
import { Lensflare, LensflareElement } from 'https://unpkg.com/three@0.117.0/examples/jsm/objects/Lensflare.js';

const radius = 6571;
const tilt = 0.41;
const rotationSpeed = 0.02;
const cloudsScale = 1.005;
const moonScale = 0.23;


///get current time
//write function that return new camera posion when time passed
//we want to go from (x1, y1, z1) -> (x2, y2, z2) in 5 mins

// 5mins become 120 seconds 
// x = (x2-x1) / (time / 120)
//y = (y2 - y1) / (time /120)
// z= (z2-z1)/ (time/120)

// x += x1;
// y+= y1;
// z +z1 ;



const MARGIN = 0;
let SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
let SCREEN_WIDTH = window.innerWidth;

let camera, controls, scene, renderer, stats;
let geometry, meshPlanet, meshClouds, meshMoon;
let dirLight;

let composer;

const textureLoader = new THREE.TextureLoader();

let d, dPlanet, dMoon;
const dMoonVec = new THREE.Vector3();

const clock = new THREE.Clock();
let movementSpeed = 200;

// let posionStop = {x: 26106 , y:793.3826641245728 , z : }

//endposition when animation stop
let endPosition = { x: 80000, y: 793, z: -100000 }
//start postion
let startPosition = { x: 0, y: 19, z: 100240 };
//time the animation take
let timeToTravel =+ 40;


init();
animate();

// setTimeout(function(){
// 	}, 5000);

// setTimeout(function(){audio2.play()},3000);

function getNextCameraPostion(delta) {
	// console.log("delta=>", delta);

	let { x, y, z } = startPosition;
	let xdiff = endPosition.x - startPosition.x;
	let ydiff = endPosition.y - startPosition.y;
	let zdiff = endPosition.z - startPosition.z;

	const mult = Math.min(delta / timeToTravel, 1);


	const newX = x + mult * xdiff;
	const newY = y + mult * ydiff;
	const newZ = z + mult * zdiff;
	console.log(JSON.stringify({ x : newX, y: newY, z: newZ }));
	// return startPosition;
	return { x : newX, y: newY, z: newZ };
}

function init() {
	camera = new THREE.PerspectiveCamera(25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7);
	camera.position.z = radius * 15;
	camera.position.x =

		camera.rotation.z = 180 * Math.PI / 90
	camera.rotation.x = 180 * Math.PI / 90
	// camera.lookAt(meshPlanet.position)
	// camera.rotation.x= 90 * Math.PI / 90
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0x000000, 0.00000025);

	dirLight = new THREE.DirectionalLight(0xffffff,1);
	dirLight.position.set(- 1, 0, 1).normalize();
	scene.add(dirLight);

	// lensflares
	const textureLoader = new THREE.TextureLoader();

	const textureFlare0 = textureLoader.load( './assets/lensflare0.png' );
	const textureFlare3 = textureLoader.load( './assets/lensflare3.png' );

	addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
	addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
	addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

	function addLight( h, s, l, x, y, z ) {

		const light = new THREE.DirectionalLight( 0xffffff, .5, 2000 );
		light.color.setHSL( h, s, l );
		light.position.set( 350000, 793, -1000000 ); 
		// x: 80000, y: 793, z: -100000 
		scene.add( light );

		const lensflare = new Lensflare();
		lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
		lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
		light.add( lensflare );

	}

	const materialNormalMap = new THREE.MeshPhongMaterial({

		specular: 0x333333,
		shininess: 15,
		map: textureLoader.load("./assets/earth_atmos_2048.jpg"),
		specularMap: textureLoader.load("./assets/earth_specular_2048.jpg"),
		normalMap: textureLoader.load("./assets/earth_normal_2048.jpg"),

		// y scale is negated to compensate for normal map handedness.
		normalScale: new THREE.Vector2(0.85, - 0.85)

	});

	// planet

	geometry = new THREE.SphereBufferGeometry(radius, 100, 50);

	meshPlanet = new THREE.Mesh(geometry, materialNormalMap);
	meshPlanet.rotation.y = 0;
	meshPlanet.rotation.z = tilt;
	scene.add(meshPlanet);

	// clouds

	const materialClouds = new THREE.MeshLambertMaterial({

		map: textureLoader.load("./assets/earth_clouds_1024.png"),
		transparent: true

	});

	meshClouds = new THREE.Mesh(geometry, materialClouds);
	meshClouds.scale.set(cloudsScale, cloudsScale, cloudsScale);
	meshClouds.rotation.z = tilt;
	scene.add(meshClouds);

	// moon

	const materialMoon = new THREE.MeshPhongMaterial({

		map: textureLoader.load("./assets/moon_1024.jpg")

	});

	meshMoon = new THREE.Mesh(geometry, materialMoon);
	meshMoon.position.set(radius * 5, 0, 0);
	meshMoon.scale.set(moonScale, moonScale, moonScale);
	scene.add(meshMoon);


	// stars

	const r = radius, starsGeometry = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

	const vertices1 = [];
	const vertices2 = [];

	const vertex = new THREE.Vector3();

	for (let i = 0; i < 250; i++) {

		vertex.x = Math.random() * 2 - 1;
		vertex.y = Math.random() * 2 - 1;
		vertex.z = Math.random() * 2 - 1;
		vertex.multiplyScalar(r);

		vertices1.push(vertex.x, vertex.y, vertex.z);

	}

	for (let i = 0; i < 1500; i++) {

		vertex.x = Math.random() * 2 - 1;
		vertex.y = Math.random() * 2 - 1;
		vertex.z = Math.random() * 2 - 1;
		vertex.multiplyScalar(r);

		vertices2.push(vertex.x, vertex.y, vertex.z);

	}

	starsGeometry[0].setAttribute('position', new THREE.Float32BufferAttribute(vertices1, 3));
	starsGeometry[1].setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3));

	const starsMaterials = [
		new THREE.PointsMaterial({ color: 0x555555, size: 2, sizeAttenuation: false }),
		new THREE.PointsMaterial({ color: 0x555555, size: 1, sizeAttenuation: false }),
		new THREE.PointsMaterial({ color: 0x333333, size: 2, sizeAttenuation: false }),
		new THREE.PointsMaterial({ color: 0x3a3a3a, size: 1, sizeAttenuation: false }),
		new THREE.PointsMaterial({ color: 0x1a1a1a, size: 2, sizeAttenuation: false }),
		new THREE.PointsMaterial({ color: 0x1a1a1a, size: 1, sizeAttenuation: false })
	];

	for (let i = 10; i < 1000; i++) {

		const stars = new THREE.Points(starsGeometry[i % 2], starsMaterials[i % 6]);

		stars.rotation.x = Math.random() * 6;
		stars.rotation.y = Math.random() * 6;
		stars.rotation.z = Math.random() * 6;
		stars.scale.setScalar(i * 1);

		stars.matrixAutoUpdate = false;
		stars.updateMatrix();

		scene.add(stars);

	}

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	//

	controls = new FlyControls(camera, renderer.domElement);

	controls.domElement = renderer.domElement;
	controls.rollSpeed = Math.PI / 10;
	controls.autoForward = true;
	controls.dragToLook = true;
	controls.movementSpeed = 0;

	//

	// controls = new OrbitControls(camera, renderer.domElement)

	stats = new Stats();
	document.body.appendChild(stats.dom);

	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', (e) => {
		console.log(e.which);
		if (movementSpeed && e.which == 32) {
			console.log('im here');

			movementSpeed = 0;
		} else if (!movementSpeed && e.which == 32) {
			movementSpeed = 100;
		}
	})

	// postprocessing

	const renderModel = new RenderPass(scene, camera);
	const effectFilm = new FilmPass(0.35, 0.75, 2048, false);

	composer = new EffectComposer(renderer);

	composer.addPass(renderModel);
	composer.addPass(effectFilm);

	console.log(camera.position);

}

function onWindowResize() {

	SCREEN_HEIGHT = window.innerHeight;
	SCREEN_WIDTH = window.innerWidth;

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	composer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

}

function animate() {

	requestAnimationFrame(animate);

	render();
	stats.update();

}

function render() {

	// rotate the planet and clouds

	const delta = clock.getDelta();

	meshPlanet.rotation.y += rotationSpeed * delta;
	meshClouds.rotation.y += 1.25 * rotationSpeed * delta;

	// slow down as we approach the surface

	dPlanet = camera.position.length();

	dMoonVec.subVectors(camera.position, meshMoon.position);
	dMoon = dMoonVec.length();

	if (dMoon < dPlanet) {

		d = (dMoon - radius * moonScale * 1.01);

	} else {

		d = (dPlanet - radius * 1.01);

	}


	// if(movementSpeed)
	// 	controls.movementSpeed = 0.13 * d;
	// else controls.movementSpeed = 0;
	// console.log(camera.position);
	controls.update(delta);

	let pos = getNextCameraPostion(clock.getElapsedTime());

	camera.position.x = pos.x;
	camera.position.y = pos.y;
	camera.position.z = pos.z;
	
	//log the camera position
	// console.log(camera.position);

	composer.render(delta);

}


