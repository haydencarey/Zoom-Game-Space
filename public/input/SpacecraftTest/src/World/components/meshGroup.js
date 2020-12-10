import { BoxBufferGeometry, DodecahedronBufferGeometry, ConeBufferGeometry, SphereBufferGeometry, Group, MathUtils, Mesh, TextureLoader, MeshStandardMaterial } from 'https://unpkg.com/three@0.117.0/build/three.module.js';
let box;
let sphere;
function createMeshGroup() {
  // a group holds other objects
  // but cannot be seen itself
  const group = new Group();

  const geometry = new SphereBufferGeometry(0.25, 16, 16);
  // const geometry2 = new BoxBufferGeometry(0.25, 16, 16);
  // const geometry = new DodecahedronBufferGeometry();
    // const geometry = new ConeBufferGeometry(2, 5, 32);

  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  const protoSphere = new Mesh(geometry, material);
  // const protoBox = new Mesh(geometry2, material);

  // add the protoSphere to the group
  group.add(protoSphere);
  // group.add(protoBox);

  // create twenty clones of the protoSphere
  // and add each to the group
  for (let i = 0; i < 1; i += .01) {

  // const sphere = protoSphere.clone();
   sphere = protoSphere.clone();
      // position the spheres on around a circle
      sphere.position.x = Math.cos(2 * Math.PI * i);
      sphere.position.y = Math.sin(2 * Math.PI * i);
      sphere.position.z = -i * 5;
      sphere.scale.multiplyScalar(0.01 + i);

  //  box = protoBox.clone();



  // box.scale.multiplyScalar(0.01 + i);

  // box.position.x = Math.cos(2 * Math.PI * i);
  // box.position.y = Math.sin(2 * Math.PI * i);
  // box.position.z = -i * 5;


  
    
   

    group.add(sphere);
    
  }

  // every sphere inside the group will be scaled
  group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(30);

  // each frame, rotate the entire group of spheres
  group.tick = (delta) => {
    group.rotation.z += delta * radiansPerSecond;
  };

  return group;
}
  
  
  //   // create a texture loader.
  //   const textureLoader = new TextureLoader();
  
  //   // load a texture
  //   const texture = textureLoader.load(
  //     './assets/texture/uv-test-bw.png',
  //   );
  
  //   // create a "standard" material using
  //   // the texture we just loaded as a color map
  //   const material = new MeshStandardMaterial({
  //       color: 'yellow',
  //     map: texture,
  //   });
  
  //   return material;
  // }
  
  // function createCube() {
  //   const geometry = new BoxBufferGeometry(2, 2, 2);
  //   const material = createMaterial();
  //   const cube = new Mesh(geometry, material);
  
  //   cube.rotation.set(-0.5, -0.1, 0.8);
  
  //   const radiansPerSecond = MathUtils.degToRad(30);
  
  //   cube.tick = (delta) => {
  //     // increase the cube's rotation each frame
  //     cube.rotation.z += delta * radiansPerSecond;
  //     cube.rotation.x += delta * radiansPerSecond;
  //     cube.rotation.y += delta * radiansPerSecond;
  //   };
  
  //   return cube;
 
  
  export { createMeshGroup };