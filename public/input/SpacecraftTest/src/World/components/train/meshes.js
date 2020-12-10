import { Mesh } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

import { createGeometries } from './geometries.js';
import { createMaterials } from './materials.js';



function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();

  const cabin = new Mesh(geometries.cabin, materials.body);
  cabin.position.set(1.5, 1.4, 0);

  const ground = new Mesh(geometries.ground, materials.body);
  ground.position.set(1.5, 1.1, 0);

  const roof = new Mesh(geometries.roof, materials.detail);
  roof.position.set(1.5, 2.8, 0);

  const track = new Mesh(geometries.track, materials.wood);
  track.position.set(0, .1, .7);

const track2 = track.clone();
track.position.set(0, .1, -.7);

const rail = new Mesh(geometries.rail, materials.metal);
// x=-4.85;
rail.position.set(-4.85, 0, 0);
rail.rotation.y = Math.PI / 2;

const rail2 = rail.clone();
rail2.position.set(-4, 0, 0);

const rail3 = rail.clone();
rail3.position.set(-3.25, 0, 0);
const rail4 = rail.clone();
rail4.position.set(-2.5, 0, 0);
const rail5 = rail.clone();
rail5.position.set(-1.75, 0, 0);
const rail6 = rail.clone();
rail6.position.set(-1, 0, 0);
const rail7 = rail.clone();
rail7.position.set(-.25, 0, 0);
const rail8 = rail.clone();
rail8.position.set(.5, 0, 0);
const rail9 = rail.clone();
rail9.position.set(2.5, 0, 0);
const rail10 = rail.clone();
rail10.position.set(3.5, 0, 0);
const rail11 = rail.clone();
rail11.position.set(4.5, 0, 0);

const chimney = new Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 1.9, 0);

const bubble1 = new Mesh(geometries.bubble1, materials.bubble);
  bubble1.position.set(-2, 2.4, 0);

  const bubble2 = bubble1.clone();
  bubble2.position.set(-2, 2.9, 0);
  bubble2.scale.set(.5, .5,.5);

  const bubble3 = bubble1.clone();
  bubble3.position.set(-2, 2.7, 0);
  bubble3.scale.set(.75, .75,.75);


  const nose = new Mesh(geometries.nose, materials.body);
  nose.position.set(-1, 1, 0);
  nose.rotation.z = Math.PI / 2;

  const pillar = new Mesh(geometries.pillar, materials.body);
  pillar.position.set(.7, 2.3, .5);

  const pillarLeft = pillar.clone();
  pillarLeft.position.z = -.5;

  const pillarBackLeft = pillar.clone();
  pillarBackLeft.position.z = -.5;
  pillarBackLeft.position.x = 2.3;
  
  const pillarBackRight = pillar.clone();
  
  pillarBackRight.position.x = 2.3;

  const smallWheelRear = new Mesh(geometries.wheel, materials.detail);
  smallWheelRear.position.y = 0.5;
  smallWheelRear.rotation.x = Math.PI / 2;

  const smallWheelCenter = smallWheelRear.clone();
  smallWheelCenter.position.x = -1;

  const smallWheelFront = smallWheelRear.clone();
  smallWheelFront.position.x = -2;

  const bigWheel = smallWheelRear.clone();
  bigWheel.position.set(1.5, 0.9, 0);
  bigWheel.scale.set(2, 1.25, 2);

  return {
    nose,
    ground,
    roof,
    track,
    pillar,
    rail,
    rail2,
    rail3,
    rail4,
    rail5,
    rail6,
    rail7,
    rail8,
    rail9,
    rail10,
    rail11,
    pillarLeft,
    pillarBackLeft,
    pillarBackRight,
    track2,
    bubble1,
    bubble2,
    bubble3,
    // cabin,
    chimney,
    smallWheelRear,
    smallWheelCenter,
    smallWheelFront,
    bigWheel,
  };
}

export { createMeshes }