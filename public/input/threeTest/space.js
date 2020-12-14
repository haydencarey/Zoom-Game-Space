import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import Stats from 'https://unpkg.com/three@0.117.0/examples/jsm/libs/stats.module.js';

			import { FlyControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/FlyControls.js';
			import { EffectComposer } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/RenderPass.js';
			import { FilmPass } from 'https://unpkg.com/three@0.117.0/examples/jsm/postprocessing/FilmPass.js';

			const radius = 6571;
			const tilt = 0.41;
			const rotationSpeed = 0.02;

			const cloudsScale = 1.005;
			const moonScale = 0.23;

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

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7 );
				camera.position.z = radius * 15;
				camera.position.x = 
                // camera.position.x = radius * 15;
                camera.rotation.z= 180 * Math.PI / 90
                camera.rotation.x= 180 * Math.PI / 90
                // camera.lookAt(meshPlanet.position)
                // camera.rotation.x= 90 * Math.PI / 90
				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 );

				dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( - 1, 0, 1 ).normalize();
				scene.add( dirLight );

				const materialNormalMap = new THREE.MeshPhongMaterial( {

					specular: 0x333333,
					shininess: 15,
					map: textureLoader.load( "./assets/earth_atmos_2048.jpg" ),
					specularMap: textureLoader.load( "./assets/earth_specular_2048.jpg" ),
					normalMap: textureLoader.load( "./assets/earth_normal_2048.jpg" ),

					// y scale is negated to compensate for normal map handedness.
					normalScale: new THREE.Vector2( 0.85, - 0.85 )

				} );

				// planet

				geometry = new THREE.SphereBufferGeometry( radius, 100, 50 );

				meshPlanet = new THREE.Mesh( geometry, materialNormalMap );
				meshPlanet.rotation.y = 0;
				meshPlanet.rotation.z = tilt;
				scene.add( meshPlanet );

				// clouds

				const materialClouds = new THREE.MeshLambertMaterial( {

					map: textureLoader.load( "./assets/earth_clouds_1024.png" ),
					transparent: true

				} );

				meshClouds = new THREE.Mesh( geometry, materialClouds );
				meshClouds.scale.set( cloudsScale, cloudsScale, cloudsScale );
				meshClouds.rotation.z = tilt;
				scene.add( meshClouds );

				// moon

				const materialMoon = new THREE.MeshPhongMaterial( {

					map: textureLoader.load( "./assets/moon_1024.jpg" )

				} );

				meshMoon = new THREE.Mesh( geometry, materialMoon );
				meshMoon.position.set( radius * 5, 0, 0 );
				meshMoon.scale.set( moonScale, moonScale, moonScale );
				scene.add( meshMoon );
				

				// stars

				const r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];

				const vertices1 = [];
				const vertices2 = [];

				const vertex = new THREE.Vector3();

				for ( let i = 0; i < 250; i ++ ) {

					vertex.x = Math.random() * 2 - 1;
					vertex.y = Math.random() * 2 - 1;
					vertex.z = Math.random() * 2 - 1;
					vertex.multiplyScalar( r );

					vertices1.push( vertex.x, vertex.y, vertex.z );

				}

				for ( let i = 0; i < 1500; i ++ ) {

					vertex.x = Math.random() * 2 - 1;
					vertex.y = Math.random() * 2 - 1;
					vertex.z = Math.random() * 2 - 1;
					vertex.multiplyScalar( r );

					vertices2.push( vertex.x, vertex.y, vertex.z );

				}

				starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
				starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

				const starsMaterials = [
					new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
					new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
				];

				for ( let i = 10; i < 1000; i ++ ) {

					const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

					stars.rotation.x = Math.random() * 6;
					stars.rotation.y = Math.random() * 6;
					stars.rotation.z = Math.random() * 6;
					stars.scale.setScalar( i * 1 );

					stars.matrixAutoUpdate = false;
					stars.updateMatrix();

					scene.add( stars );

				}

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				document.body.appendChild( renderer.domElement );

				//

				controls = new FlyControls( camera, renderer.domElement );

				controls.movementSpeed = 1000;
				controls.domElement = renderer.domElement;
				controls.rollSpeed = Math.PI / 54;
				controls.autoForward = false;
				controls.dragToLook = false;

				//

				stats = new Stats();
				document.body.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize, false );

				// postprocessing

				const renderModel = new RenderPass( scene, camera );
				const effectFilm = new FilmPass( 0.35, 0.75, 2048, false );

				composer = new EffectComposer( renderer );

				composer.addPass( renderModel );
				composer.addPass( effectFilm );

			}

			function onWindowResize() {

				SCREEN_HEIGHT = window.innerHeight;
				SCREEN_WIDTH = window.innerWidth;

				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				composer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

			}

			function animate() {

				requestAnimationFrame( animate );

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

				dMoonVec.subVectors( camera.position, meshMoon.position );
				dMoon = dMoonVec.length();

				if ( dMoon < dPlanet ) {

					d = ( dMoon - radius * moonScale * 1.01 );

				} else {

					d = ( dPlanet - radius * 1.01 );

				}

				controls.movementSpeed = 0.13 * d;
				controls.update( delta );

				composer.render( delta );

            }
            

            