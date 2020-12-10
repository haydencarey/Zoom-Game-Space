import { Group, MathUtils } from 'https://unpkg.com/three@0.119.0/build/three.module.js';
import { createGeometries } from './geometries.js';
import { createMaterials } from './materials.js';
import { createMeshes } from './meshes.js';


const wheelSpeed = MathUtils.degToRad(24);

class Train extends Group {
  constructor() {
    super();

    this.meshes = createMeshes();
    this.add(
        this.meshes.nose,
        this.meshes.bubble1,
        this.meshes.bubble2,
        this.meshes.bubble3,
        // this.meshes.cabin,
        this.meshes.ground,
        this.meshes.roof,
        this.meshes.track,
        this.meshes.rail,
        this.meshes.rail2,
        this.meshes.rail3,
        this.meshes.rail4,
        this.meshes.rail5,
        this.meshes.rail6,
        this.meshes.rail7,
        this.meshes.rail8,
        this.meshes.rail9,
        this.meshes.rail10,
        this.meshes.rail11,
        this.meshes.track2,
        
        this.meshes.chimney,
        this.meshes.pillar,
        this.meshes.pillarLeft,
        this.meshes.pillarBackLeft,
        this.meshes.pillarBackRight,
        this.meshes.smallWheelRear,
        this.meshes.smallWheelCenter,
        this.meshes.smallWheelFront,
        this.meshes.bigWheel,
      );
  }

  tick(delta) {
    this.meshes.bigWheel.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelRear.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelCenter.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelFront.rotation.y += wheelSpeed * delta;
  
  }
}

export { Train }