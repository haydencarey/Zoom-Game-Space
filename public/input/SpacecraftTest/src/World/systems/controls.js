import { OrbitControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';


function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    controls.keys = true;
  
  
    // damping and auto rotation require
    // the controls to be updated each frame
  
    // this.controls.autoRotate = true;
    controls.enableDamping = true;


    // controls.target.y = 1;
    
    controls.tick = () => controls.update();
  
    return controls;
  }
  
  export { createControls };
  