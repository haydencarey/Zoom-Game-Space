import * as THREE from 'https://unpkg.com/three@0.117.0/build/three.module.js';

			import { OrbitControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';

			let camera, scene, renderer, video;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.z = 0.01;

				scene = new THREE.Scene();

				video = document.getElementById( 'video' );

				const texture = new THREE.VideoTexture( video );

				const geometry = new THREE.PlaneBufferGeometry( 16, 9 );
				geometry.scale( 0.5, 0.5, 0.5 );
				const material = new THREE.MeshBasicMaterial( { map: texture } );

				const count = 128;
				const radius = 32;

				for ( let i = 1, l = count; i <= l; i ++ ) {

					const phi = Math.acos( - 1 + ( 2 * i ) / l );
					const theta = Math.sqrt( l * Math.PI ) * phi;

					const mesh = new THREE.Mesh( geometry, material );
					mesh.position.setFromSphericalCoords( radius, phi, theta );
					mesh.lookAt( camera.position );
					scene.add( mesh );

				}

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;
				controls.enablePan = false;

				window.addEventListener( 'resize', onWindowResize, false );

				//

				if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

					const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

					navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

						// apply the stream to the video element used in the texture

						video.srcObject = stream;
						video.play();

					} ).catch( function ( error ) {

						console.error( 'Unable to access the camera/webcam.', error );

					} );

				} else {

					console.error( 'MediaDevices interface not available.' );

				}

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				renderer.render( scene, camera );

			}