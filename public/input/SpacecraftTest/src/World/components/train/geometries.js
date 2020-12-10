import { BoxBufferGeometry, SphereBufferGeometry, CylinderBufferGeometry, } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createGeometries() {

    const bubble1 = new SphereBufferGeometry(.2, 15, 15);

    const cabin= new BoxBufferGeometry(2, 2.25, 1.5);

    const ground= new BoxBufferGeometry(2, 1.5, 1.5);

    const track= new BoxBufferGeometry(10, .1, .3);
    
    const rail= new BoxBufferGeometry(1.6, .1, .3);
    
    const roof= new BoxBufferGeometry(2, .25, 1.5);

    const pillar = new CylinderBufferGeometry(.2, .2, 1, 15);



    // const bubble2 = new SphereBufferGeometry(20, 32, 32);
    // const bubble3 = new SphereBufferGeometry(7, 32, 32);


    const nose = new CylinderBufferGeometry(.75, .75, 3, 12);

    // we can reuse a single cylinder geometry for all 4 wheels
  const wheel = new CylinderBufferGeometry(0.4, 0.4, 1.75, 16);


  // different values for the top and bottom radius creates a cone shape
  const chimney = new CylinderBufferGeometry(0.3, 0.1, 0.5);

  return {
    cabin,
    pillar,
    roof,
    ground,
    track,
    bubble1,
    rail,
    nose,
    wheel,
    chimney,
  };
}

export { createGeometries }